import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { Colors } from "@/constants/Colors";

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  theme: typeof Colors.light; // type du thème actuel
};

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
  theme: Colors.light,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(Appearance.getColorScheme() === "dark");

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setDarkMode(colorScheme === "dark");
    });
    return () => listener.remove();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const theme = darkMode ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);