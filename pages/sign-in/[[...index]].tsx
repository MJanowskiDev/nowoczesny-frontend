import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div className="w-full flex justify-center h- align-middle my-10">
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </div>
);

export default SignInPage;
