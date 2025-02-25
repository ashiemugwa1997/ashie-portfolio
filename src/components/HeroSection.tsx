import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Image } from "./ui/image";
import { useTheme } from "./ThemeProvider";

interface HeroSectionProps {
  name?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  onContactClick?: () => void;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({
  name = "Ashley Mugwambi",
  title = "Lead Django Developer",
  description = "Highly motivated and results-oriented developer with expertise in backend development using Django, Laravel, and Spring Boot. Passionate about leading teams and building scalable solutions.",
  imageUrl = "/ashley.jpg",
  onContactClick = () => console.log("Contact clicked"),
  socialLinks = {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mailto:ashleyzarter@gmail.com",
  },
}) => {
  const [socialLoading, setSocialLoading] = React.useState<string>("");
  const { theme } = useTheme();

  const handleSocialClick = async (type: string, url: string) => {
    setSocialLoading(type);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      window.open(url, "_blank");
    } catch (error) {
      console.error(`Error opening ${type} link:`, error);
    } finally {
      setSocialLoading("");
    }
  };

  return (
    <section className={`min-h-screen w-full flex flex-col justify-center items-center px-4 relative transition-colors duration-300
      ${theme === "dark" ? "bg-gray-900" : "bg-background"}`}>
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className={`text-4xl md:text-6xl font-bold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Hi, I'm {name}
          </h1>
          <h2 className={`text-2xl md:text-3xl ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}>
            {title}
          </h2>
          <p className={`text-lg max-w-lg ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            {description}
          </p>

          <div className="flex gap-4">
            <Button
              onClick={onContactClick}
              size="lg"
              className={`flex items-center gap-2 ${
                theme === "dark" 
                  ? "bg-blue-600 hover:bg-blue-700" 
                  : ""
              }`}
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </Button>

            <div className="flex gap-4">
              {socialLinks?.github && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    handleSocialClick("github", socialLinks.github)
                  }
                  disabled={socialLoading === "github"}
                  className={theme === "dark" 
                    ? "text-gray-300 hover:text-white hover:bg-gray-800" 
                    : ""}
                >
                  <Github
                    className={`w-5 h-5 ${socialLoading === "github" ? "animate-spin" : ""}`}
                  />
                </Button>
              )}
              {socialLinks?.linkedin && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    handleSocialClick("linkedin", socialLinks.linkedin)
                  }
                  disabled={socialLoading === "linkedin"}
                  className={theme === "dark" 
                    ? "text-gray-300 hover:text-white hover:bg-gray-800" 
                    : ""}
                >
                  <Linkedin
                    className={`w-5 h-5 ${socialLoading === "linkedin" ? "animate-spin" : ""}`}
                  />
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-64 h-64 md:w-96 md:h-96 mx-auto relative">
            <Image
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover rounded-full shadow-2xl border-4"
              style={{
                borderColor: theme === "dark" ? "#3b82f6" : "#60a5fa"
              }}
              fallback="https://api.dicebear.com/7.x/avataaars/svg?seed=Ashley"
              fallbackClassName={`w-full h-full rounded-full shadow-2xl border-4 ${
                theme === "dark" 
                  ? "bg-gray-800 border-blue-700" 
                  : "bg-blue-100 border-blue-400"
              }`}
            />
            <div className={`absolute inset-0 rounded-full ${
              theme === "dark" 
                ? "bg-gradient-to-b from-transparent to-blue-950/30" 
                : "bg-gradient-to-b from-transparent to-gray-900/10"
            }`} />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="absolute bottom-8"
      >
        <Button
          variant="ghost"
          size="icon"
          className={`animate-bounce ${
            theme === "dark" 
              ? "text-gray-300 hover:text-white hover:bg-gray-800" 
              : ""
          }`}
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            });
          }}
        >
          <ArrowDown className="w-6 h-6" />
        </Button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
