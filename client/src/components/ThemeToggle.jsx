import React from "react";
import { useTheme } from "../lib/ThemeContext";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative inline-flex h-8 w-14 items-center border border-border bg-muted hover:bg-muted/70 transition-colors"
    >
      <motion.div
        animate={{ x: isDark ? 28 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute flex h-6 w-6 items-center justify-center bg-primary text-primary-foreground"
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5" />
        ) : (
          <Sun className="h-3.5 w-3.5" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
