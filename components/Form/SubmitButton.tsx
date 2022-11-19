import { ReactNode } from "react";

interface SubmitButtonProps {
  children: ReactNode;
}
export const SubmitButton = ({ children }: SubmitButtonProps) => {
  return (
    <button
      className="block w-full rounded-lg bg-teal-600  text-md p-2.5"
      type="submit"
    >
      {children}
    </button>
  );
};
