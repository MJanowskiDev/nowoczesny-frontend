import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <div className="w-full flex justify-center h- align-middle my-10">
    <SignUp
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
      redirectUrl="/"
    />
  </div>
);

export default SignUpPage;
