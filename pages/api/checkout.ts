import assert from "assert";
import { NextApiHandler } from "next";
import { Stripe } from "stripe";
import { apolloClient } from "../../graphql/apolloClient";
import {
  CreatePaidOrderDocument,
  CreatePaidOrderMutation,
  CreatePaidOrderMutationVariables,
  OrderStatus,
  GetCartItemsQuery,
  GetCartItemsQueryVariables,
  GetCartItemsDocument,
} from "../../graphql/generated/gql-types";

import { getAuth } from "@clerk/nextjs/server";

const checkoutHandler: NextApiHandler = async (req, res) => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const successUrl = process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL;
  const cancelUrl = process.env.NEXT_PUBLIC_STRIPE_CANCEL_URL;

  const { userId } = getAuth(req);

  if (!userId) {
    res.status(401).json({});
  }

  if (!cancelUrl) {
    res.status(500).json({ messge: "Missing stripe cancel url!" });
    return;
  }

  if (!successUrl) {
    res.status(500).json({ messge: "Missing stripe success url!" });
    return;
  }

  if (!stripeKey) {
    res.status(500).json({ messge: "Missing stripe secret key!" });
    return;
  }

  const body = req.body as {
    userUUID: string;
  };

  const userCart = await apolloClient.query<
    GetCartItemsQuery,
    GetCartItemsQueryVariables
  >({
    query: GetCartItemsDocument,
    variables: { id: body.userUUID },
  });

  const productList = userCart.data?.cartItems;
  assert(productList, "Product list cannot be empty");

  const line_items = productList.map((cartItem) => {
    if (!cartItem) {
      res.status(500).json({ messge: "Error fetching cart content" });
      return {};
    }
    return {
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: 15,
      },
      price_data: {
        currency: "PLN",
        unit_amount: cartItem.product?.price,
        product_data: {
          name: cartItem.product?.name,
          images: cartItem.product?.images
            ? cartItem.product?.images.map((i) => i.url)
            : [],
          metadata: {
            id: cartItem.product?.slug,
          },
        },
      },
      quantity: cartItem.count,
    };
  }) as Stripe.Checkout.SessionCreateParams.LineItem[];

  const stripe = new Stripe(stripeKey, { apiVersion: "2022-11-15" });

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "pl",
    payment_method_types: ["p24", "card"],
    success_url: successUrl,
    cancel_url: cancelUrl,
    line_items: line_items,
  });

  try {
    await apolloClient.mutate<
      CreatePaidOrderMutation,
      CreatePaidOrderMutationVariables
    >({
      mutation: CreatePaidOrderDocument,
      variables: {
        stripeCheckoutId: stripeCheckoutSession.id,
        total: stripeCheckoutSession.amount_total || 0,
        userUUID: body.userUUID,
        orderStatus: OrderStatus.InProgress,
        create: productList.map((cartItem) => {
          return {
            quantity: cartItem.count!,
            total: cartItem.product?.price!,
            name: cartItem.product?.name!,
            slug: cartItem.product?.slug!,
            productId: cartItem.product?.id!,
            description: cartItem.product?.description,
            imageUrl: cartItem.product?.images[0].url,
            product: { connect: { slug: cartItem.product?.slug } },
          };
        }),
      },
    });
  } catch (error) {
    console.error(JSON.stringify(error), "ERROR!!");
    res.status(500).json({ messge: "Error while creating order", error });
  }

  res.status(201).json({ session: stripeCheckoutSession });
};

export default checkoutHandler;
