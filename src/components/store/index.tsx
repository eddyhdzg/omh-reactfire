import React, { useContext } from "react";

import { ThemeProvider, ThemeContext } from "./ThemeContext";

const useStore = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return { theme, toggleTheme };
};

const AppProvider: React.FC = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

export { AppProvider, useStore };
