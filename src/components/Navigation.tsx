import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import ThemeToggle from "./ThemeToggle";

interface NavigationProps {
  sections?: Array<{
    id: string;
    label: string;
  }>;
}

const Navigation = ({
  sections = [
    { id: "hero", label: "Home" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ],
}: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const NavLinks = () => (
    <>
      {sections.map((section) => (
        <Button
          key={section.id}
          variant="ghost"
          className={`hover:bg-opacity-20 ${
            theme === "dark" 
              ? "text-blue-300 hover:text-blue-100 hover:bg-blue-900" 
              : "text-blue-600 hover:text-blue-800 hover:bg-blue-100"
          }`}
          onClick={() => scrollToSection(section.id)}
        >
          {section.label}
        </Button>
      ))}
    </>
  );

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 
        ${isScrolled ? "shadow-md" : ""}
        ${theme === "dark" 
          ? "bg-gray-900 text-white shadow-gray-800" 
          : "bg-white text-gray-900"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Name */}
          <div className="flex-shrink-0">
            <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Ashley Mugwambi
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle className="mr-6" />
            <NavLinks />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={theme === "dark" ? "text-white hover:bg-gray-800" : ""}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                className={`w-[300px] sm:w-[400px] ${
                  theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white"
                }`}
              >
                <div className="flex flex-col space-y-4 mt-8">
                  <ThemeToggle className="self-end" />
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
