import React, { useEffect } from "react";
import Navigation from "./Navigation";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";
import AITool from "./AITool";
import { motion, useScroll, useSpring } from "framer-motion";

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="pt-20">
        {/* About Section */}
        <section id="about">
          <AboutSection />
        </section>
        {/* Projects Section */}
        <section id="projects">
          <ProjectsSection />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>

        {/* AI Tool Section */}
        <section id="ai-tool" className="py-10">
          <AITool />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Ashley Mugwambi. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
