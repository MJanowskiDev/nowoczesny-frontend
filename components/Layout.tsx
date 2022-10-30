import { ReactNode, useState } from "react";
import { StyledHeader } from "./StyledHeader";
import { Footer } from "./Footer";
import { Theme } from "./Theme";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Theme>
      <div className="min-h-screen bg-slate-50/50 dark:text-white dark:bg-gray-900">
        <StyledHeader />
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pt-2">
          {children}
        </div>
        <Footer />
      </div>
    </Theme>
  );
};
