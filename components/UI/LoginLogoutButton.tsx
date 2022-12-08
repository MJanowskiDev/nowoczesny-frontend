import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const LoginLogoutButton = () => {
  const session = useSession();

  return (
    <div>
      {session.status === "authenticated" ? (
        <button onClick={() => signOut()}>Logout</button>
      ) : (
        <div className="flex gap-4">
          <button onClick={() => signIn()}>Login</button>
          <Link href={"/signup"}>Signup</Link>
        </div>
      )}
    </div>
  );
};
