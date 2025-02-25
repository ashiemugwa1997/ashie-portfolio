import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

interface ThemeToggleProps {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = "",
  size = "icon"
}) => {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size={size}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`relative overflow-hidden ${
        theme === "dark" 
          ? "text-yellow-200 hover:text-yellow-100 hover:bg-gray-800" 
          : "text-blue-600 hover:text-blue-800 hover:bg-blue-100"
      } ${className}`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative w-5 h-5">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ 
            rotate: theme === "light" ? 0 : 180,
            opacity: theme === "light" ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-4 h-4" />
        </motion.div>
        
        <motion.div
          initial={{ rotate: 180 }}
          animate={{ 
            rotate: theme === "light" ? 180 : 360,
            opacity: theme === "light" ? 0 : 1
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="w-5 h-5" />
        </motion.div>
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;