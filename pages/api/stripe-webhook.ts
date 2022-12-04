import assert from "assert";
import { NextApiHandler } from "next";
import { StripeWebhookEvents } from "../../utils/stripeEvents";
import Stripe from "stripe";
import { buffer } from "micro";
import { apolloClient } from "../../graphql/apolloClient";
import {
  CompleteOrderDocument,
  CompleteOrderMutation,
  CompleteOrderMutationVariables,
  OrderStatus,
  PublishOrderAfterCompleteDocument,
  PublishOrderAfterCompleteMutation,
  PublishOrderAfterCompleteMutationVariables,
  PublishOrderAndCartItemsDocument,
} from "../../graphql/generated/gql-types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripeWebhook: NextApiHandler = async (req, res) => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  assert(stripeKey, "MIssing stripe secret key ");

  const sig = req.headers["stripe-signature"];
  assert(sig, "Missing stripe-signature in response header");

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  assert(endpointSecret, "Missing stripe webhook api key!");

  const stripe = new Stripe(stripeKey, {
    apiVersion: "2022-11-15",
  });

  const rawBody = (await buffer(req)).toString();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      endpointSecret
    ) as StripeWebhookEvents;
  } catch (err) {
    const e = err as Error;
    res.status(400).send(`Webhook Error: ${e.message}`);
  }
  assert(event, "Missing stripe event");

  switch (event.type) {
    case "checkout.session.completed":
      console.log("CURRENCY:", event.data.object.currency);
      try {
        const res = await apolloClient.mutate<
          CompleteOrderMutation,
          CompleteOrderMutationVariables
        >({
          mutation: CompleteOrderDocument,
          variables: {
            stripeCheckoutId: event.data.object.id,
            orderStatus: OrderStatus.Paid,
            email: event.data.object.customer_details?.email!,
          },
        });

        const orderId = res.data?.updateOrder?.id;
        assert(orderId, "cannot publish order without id");
        await apolloClient.mutate<
          PublishOrderAfterCompleteMutation,
          PublishOrderAfterCompleteMutationVariables
        >({
          mutation: PublishOrderAfterCompleteDocument,
          variables: { id: orderId },
        });
      } catch (error) {
        console.log(JSON.stringify(error));
        res.status(400).send(`Webhook Error: ${error}`);
      }
  }

  res.status(204).end();
};

export default stripeWebhook;
