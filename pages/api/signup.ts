import { NextApiHandler } from "next";
import * as bcrypt from "bcrypt";
import { authorizedApolloClient } from "../../graphql/apolloClient";
import {
  UserRegisterDocument,
  UserRegisterMutation,
  UserRegisterMutationVariables,
} from "../../graphql/generated/gql-types";

const SignupHandler: NextApiHandler = async (req, res) => {
  const { email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 12);

  const registerResult = await authorizedApolloClient.mutate<
    UserRegisterMutation,
    UserRegisterMutationVariables
  >({
    mutation: UserRegisterDocument,
    variables: { email, password: passwordHash },
  });

  res.json({ userId: registerResult.data?.createAccount?.id });
};

export default SignupHandler;
