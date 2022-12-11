import { getAuth } from "@clerk/nextjs/server";
import { NextApiHandler } from "next";
import { authorizedApolloClient } from "../../graphql/apolloClient";

import {
  GetOrderDetailsDocument,
  GetOrderDetailsQuery,
  GetOrderDetailsQueryVariables,
} from "../../graphql/generated/gql-types";

const orderDetailsHandler: NextApiHandler = async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) {
    res.status(401).json({ message: "no user Id", userId });
  }

  const { orderId } = req.body;
  if (!orderId) {
    res.status(500).json({ message: "No order id provided" });
  }

  const resp = await authorizedApolloClient.query<
    GetOrderDetailsQuery,
    GetOrderDetailsQueryVariables
  >({ query: GetOrderDetailsDocument, variables: { id: orderId } });

  if (resp.data.order?.userUUID === userId) {
    res.status(200).json({ order: resp.data.order });
  } else {
    res.status(401).json({ message: "Unauthoreized" });
  }
};

export default orderDetailsHandler;
