import { createContext, useContext, useEffect, useMemo, useState } from "react";
const ThemeContext = createContext(null);
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("ikr-theme") || "light");
  useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark"); localStorage.setItem("ikr-theme", theme); }, [theme]);
  const value = useMemo(() => ({ theme, toggleTheme: () => setTheme((t) => t === "dark" ? "light" : "dark") }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => useContext(ThemeContext);
