import React from "react";
import * as Toggle from "@radix-ui/react-toggle";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../custom/ThemeProvider";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Toggle.Root
      pressed={theme === "dark"}
      onPressedChange={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <span className="cursor-pointer">
        {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
      </span>
    </Toggle.Root>
  );
};

export default DarkModeToggle;
