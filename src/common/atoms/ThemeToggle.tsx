import { SunIcon, MoonIcon } from "lucide-react";
import React from "react";

import { useThemeStore } from "../../store/themeStore";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-primary hover:bg-secondary/20 transition-colors"
      aria-label="Alternar Tema"
    >
      {theme === "light" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
    </button>
  );
};

export default ThemeToggle;
