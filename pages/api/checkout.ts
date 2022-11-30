import { NextApiHandler } from "next";
import { Stripe } from "stripe";
import { apolloClient } from "../../graphql/apolloClient";
import {
  GetProductBySlugQuery,
  GetProductBySlugDocument,
  GetProductBySlugQueryVariables,
} from "../../graphql/generated/gql-types";

const checkoutHandler: NextApiHandler = async (req, res) => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const successUrl = process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL;
  const cancelUrl = process.env.NEXT_PUBLIC_STRIPE_CANCEL_URL;

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
    slug: string;
    count: number;
  }[];

  const productList = await Promise.all(
    body.map(async (cartItem) => {
      const product = await apolloClient.query<
        GetProductBySlugQuery,
        GetProductBySlugQueryVariables
      >({
        query: GetProductBySlugDocument,
        variables: { slug: cartItem.slug },
      });
      if (product.data.product) {
        return {
          cartItem: { ...product.data.product },
          count: cartItem.count,
        };
      }
    })
  );

  const stripe = new Stripe(stripeKey, { apiVersion: "2022-11-15" });

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "pl",
    payment_method_types: ["p24", "card"],
    success_url: successUrl,
    cancel_url: cancelUrl,
    line_items: productList.map((product) => {
      if (!product?.cartItem) {
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
          unit_amount: product.cartItem.price,
          product_data: {
            name: product.cartItem.name,
            images: product.cartItem.images
              ? product.cartItem.images.map((i) => i.url)
              : [],
            metadata: {
              id: product.cartItem.slug,
            },
          },
        },
        quantity: product.count,
      };
    }),
  });

  res.status(201).json({ session: stripeCheckoutSession });
};

export default checkoutHandler;
