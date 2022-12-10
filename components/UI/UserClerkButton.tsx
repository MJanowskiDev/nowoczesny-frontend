import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const UserClerkButton = () => {
  return (
    <div>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <div className="flex gap-2">
          <Link href="/sign-in">Sign in</Link>
          <Link href="/sign-up">Sign up</Link>
        </div>
      </SignedOut>
    </div>
  );
};

export default UserClerkButton;
