import { ReactNode } from "react";

interface SubmitButtonProps {
  children: ReactNode;
}
export const SubmitButton = ({ children }: SubmitButtonProps) => {
  return (
    <button
      className="block w-full rounded-lg bg-black p-2.5 text-sm text-white"
      type="submit"
    >
      {children}
    </button>
  );
};
