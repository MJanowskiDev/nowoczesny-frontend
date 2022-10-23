import { ReactNode } from "react";
import { StyledHeader } from "./StyledHeader";
import { Footer } from "./Footer";
interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="dark">
      <div className="h-screen bg-white dark:text-white dark:bg-gray-900">
        <StyledHeader />
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pt-2">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};
