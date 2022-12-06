import { NextApiHandler } from "next";
import * as bcrypt from "bcrypt";
import { authorizedApolloClient } from "../../graphql/apolloClient";
import {
  UserRegisterDocument,
  UserRegisterMutation,
  UserRegisterMutationVariables,
} from "../../graphql/generated/gql-types";

import { useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";

const SignupHandler: NextApiHandler = async (req, res) => {
  const { email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 12);

  // const session = useSession();
  const router = useRouter();

  // if (session.status === "authenticated") {
  //   router.push("/");
  // }

  const registerResult = await authorizedApolloClient.mutate<
    UserRegisterMutation,
    UserRegisterMutationVariables
  >({
    mutation: UserRegisterDocument,
    variables: { email, password: passwordHash },
  });

  router.push("/");
  res.json({ userId: registerResult.data?.createAccount?.id });
};

export default SignupHandler;
