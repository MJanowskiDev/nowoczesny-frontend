import NextAuth, { Session, TokenSet, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authorizedApolloClient } from "../../../graphql/apolloClient";
import {
  GetAccountByEmailDocument,
  GetAccountByEmailQuery,
  GetAccountByEmailQueryVariables,
} from "../../../graphql/generated/gql-types";

import * as bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const userByEmail = await authorizedApolloClient.query<
          GetAccountByEmailQuery,
          GetAccountByEmailQueryVariables
        >({
          query: GetAccountByEmailDocument,
          variables: { email: credentials.username },
        });

        if (!userByEmail.data.account?.password) {
          return null;
        }

        const passwordsAreEqual = bcrypt.compare(
          credentials.password,
          userByEmail.data.account.password
        );

        if (!passwordsAreEqual) {
          return null;
        }

        return {
          id: userByEmail.data.account.id,
          email: userByEmail.data.account.email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: TokenSet }) {
      session.user.id = token.sub as string;
      return session;
    },
  },
};
export default NextAuth(authOptions);
