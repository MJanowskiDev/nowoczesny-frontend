import { ReactNode, useState } from "react";
interface ThemeProps {
  children: ReactNode;
}

import { DarkModeContext, Themes } from "./ThemeContext";

export const Theme = ({ children }: ThemeProps) => {
  const [theme, setTheme] = useState<Themes>("light");

  return (
    <DarkModeContext.Provider value={{ mode: theme, setMode: setTheme }}>
      <div className={`${theme}`}>{children}</div>
    </DarkModeContext.Provider>
  );
};
