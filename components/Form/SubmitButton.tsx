import { ReactNode } from "react";

interface SubmitButtonProps {
  children: ReactNode;
  className?: string;
}
export const SubmitButton = ({ children, className }: SubmitButtonProps) => {
  return (
    <button
      className={`${
        className
          ? className
          : "block w-full rounded-lg bg-teal-600  text-md p-2.5"
      }`}
      type="submit"
    >
      {children}
    </button>
  );
};
