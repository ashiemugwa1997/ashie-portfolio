import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Image } from "./ui/image";

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
  return (
    <section className="min-h-screen w-full bg-background flex flex-col justify-center items-center px-4 relative">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            Hi, I'm {name}
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-700">{title}</h2>
          <p className="text-lg text-gray-600 max-w-lg">{description}</p>

          <div className="flex gap-4">
            <Button
              onClick={onContactClick}
              size="lg"
              className="flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </Button>

            <div className="flex gap-4">
              {socialLinks.github && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(socialLinks.github, "_blank")}
                >
                  <Github className="w-5 h-5" />
                </Button>
              )}
              {socialLinks.linkedin && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(socialLinks.linkedin, "_blank")}
                >
                  <Linkedin className="w-5 h-5" />
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
              className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-blue-400"
              fallback="https://api.dicebear.com/7.x/avataaars/svg?seed=Ashley"
              fallbackClassName="w-full h-full rounded-full bg-blue-100 shadow-2xl border-4 border-blue-400"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-gray-900/10" />
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
          className="animate-bounce"
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
