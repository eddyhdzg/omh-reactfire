import React, { useState, createContext } from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

const ThemeProvider: React.FC = ({ children }) => {
  const fetchTheme = localStorage.getItem("theme");
  const initialTheme = fetchTheme === "dark" ? "dark" : "light";

  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);
  const muitheme = createMuiTheme({
    palette: {
      type: theme,
    },
  });

  const toggleTheme = () => {
    if (theme === "light") {
      window.localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      window.localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={muitheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
