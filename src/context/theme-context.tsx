import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

type Theme = "night" | "light";
// type Theme = string;

type ThemeContext = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

export const ThemeContext = createContext<ThemeContext | null>(null);

export default function ThemeContextProvider({
  children,
}: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    Cookies.get("mode") ? "night" : "light"
  );
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("Error !");
  }

  return context;
}
