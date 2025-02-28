import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  details: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectsSectionProps {
  projects?: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects = [
    {
      id: 5,
      title: "UZ Research Week Android App",
      description:
        "Developed the University of Zimbabwe 2021 Research Week Android application with an integrated voting platform using Django Rest Framework.",
      imageUrl:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop",
      technologies: ["Django", "Android", "REST API"],
      details:
        "Led the development of a comprehensive voting and research showcase platform for the University of Zimbabwe's 2021 Research Week. The application featured real-time voting capabilities, research paper submissions, and interactive presentation schedules.",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
    },
    {
      id: 2,
      title: "ZETDC Loadshedding System",
      description:
        "Designed and developed a comprehensive loadshedding system with both web (Django) and mobile (React Native) applications, integrated with real-time API data.",
      imageUrl:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop",
      technologies: ["Django", "React Native", "REST API"],
      details:
        "Created an integrated solution for managing and communicating power outage schedules. The system includes a web dashboard for administrators and a mobile app for public users, featuring real-time updates and location-based notifications.",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
    },
    {
      id: 3,
      title: "Zvipfuwo Online Livestock Market",
      description:
        "Led the development of an award-nominated online livestock marketplace at the University of Zimbabwe research week 2021.",
      imageUrl:
        "https://images.unsplash.com/photo-1533069027836-fa937181a8ce?w=500&h=300&fit=crop",
      technologies: ["Django", "React", "PostgreSQL"],
      details:
        "Developed a digital marketplace connecting livestock farmers with buyers, featuring real-time pricing, quality verification, and secure transaction processing. The platform was nominated for innovation awards at UZ Research Week 2021.",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
    },
    {
      id: 4,
      title: "ZESA Drone School Management",
      description:
        "Developed a comprehensive drone training school management system for ZESA Holdings, facilitating student registration, course management, and certification tracking.",
      imageUrl:
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&h=300&fit=crop",
      technologies: ["Django", "PostgreSQL", "React", "Docker"],
      details:
        "Built a sophisticated drone training management platform for ZESA Holdings that streamlines the entire training process. Features include student enrollment management, course scheduling, progress tracking, certification management, and detailed reporting. The system integrates with existing ZESA infrastructure and complies with local aviation regulations.",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
    },
    {
      id: 1,
      title: "Premium Automation & Risk Analysis Platform",
      description:
        "Built an intelligent premium automation system that factors in inflation trends and market risks using AI-driven predictive analytics with Django backend.",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
      technologies: ["Django", "AI/ML", "Python", "TensorFlow", "PostgreSQL"],
      details:
        "Developed a sophisticated financial modeling platform that automates premium calculations for insurance products while dynamically adjusting for inflation trends and market volatility. The system incorporates machine learning algorithms to analyze historical data and predict future economic scenarios, allowing for robust risk assessment and pricing optimization. Key features include custom risk profiles, inflation-indexed premium adjustments, scenario modeling, and interactive dashboards for visualizing market trends and their potential impacts on premium structures. The platform achieved a 23% improvement in pricing accuracy and reduced manual adjustment time by 87%.",
      liveUrl: "https://example.com/premium-automation",
      githubUrl: "https://github.com/example/premium-risk-platform",
    },
  ],
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [isFilterLoading, setIsFilterLoading] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log("Projects loaded.");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const technologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies)),
  );

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.technologies.includes(filter));

  const handleFilterChange = async (newFilter: string) => {
    setIsFilterLoading(newFilter);
    setIsLoading(true);

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    setFilter(newFilter);
    setIsFilterLoading("");

    // Simulate content loading
    setTimeout(() => {
      setIsLoading(false);
      console.log(`Filter changed to ${newFilter}.`);
    }, 300);
  };

  // Calculate background color based on theme
  const sectionBgColor = theme === "dark" 
    ? "bg-gray-900" 
    : "bg-blue-50";

  return (
    <section className={`py-16 px-4 ${sectionBgColor} transition-colors duration-300`}>
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-3xl font-bold text-center mb-8 ${
            theme === "dark" ? "text-white" : ""
          }`}
        >
          My Projects
        </motion.h2>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => handleFilterChange("all")}
            disabled={isFilterLoading === "all"}
            className={theme === "dark" && filter !== "all" ? "border-gray-600 text-gray-300" : ""}
          >
            {isFilterLoading === "all" ? "Loading..." : "All"}
          </Button>
          {technologies.map((tech) => (
            <Button
              key={tech}
              variant={filter === tech ? "default" : "outline"}
              onClick={() => handleFilterChange(tech)}
              disabled={isFilterLoading === tech}
              className={theme === "dark" && filter !== tech ? "border-gray-600 text-gray-300" : ""}
            >
              {isFilterLoading === tech ? "Loading..." : tech}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center min-h-[400px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              // Show skeleton cards while loading
              <>
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <motion.div
                      key={`skeleton-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <ProjectCardSkeleton isDarkMode={theme === "dark"} />
                    </motion.div>
                  ))}
              </>
            ) : (
              <>
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      layout: { duration: 0.3 },
                    }}
                  >
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      imageUrl={project.imageUrl}
                      technologies={project.technologies}
                      onClick={() => {
                        setSelectedProject(project);
                        console.log(`Project selected: ${project.title}`);
                      }}
                      priority={index < 2} // Prioritize first two projects
                    />
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal
            isOpen={!!selectedProject}
            onClose={() => {
              setSelectedProject(null);
              console.log("Project modal closed.");
            }}
            project={{
              title: selectedProject.title,
              description: selectedProject.description,
              image: selectedProject.imageUrl,
              technologies: selectedProject.technologies,
              details: selectedProject.details,
              liveUrl: selectedProject.liveUrl,
              githubUrl: selectedProject.githubUrl,
            }}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
