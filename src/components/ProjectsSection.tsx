import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import { Button } from "./ui/button";

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
      id: 1,
      title: "UZ Research Week Android App",
      description:
        "Developed the University of Zimbabwe 2021 Research Week Android application with an integrated voting platform using Django Rest Framework.",
      imageUrl: "/ashley.jpg",
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
      imageUrl: "/ashley.jpg",
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
      imageUrl: "/ashley.jpg",
      technologies: ["Django", "React", "PostgreSQL"],
      details:
        "Developed a digital marketplace connecting livestock farmers with buyers, featuring real-time pricing, quality verification, and secure transaction processing. The platform was nominated for innovation awards at UZ Research Week 2021.",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
    },
  ],
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [isFilterLoading, setIsFilterLoading] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
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
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <section className="py-16 px-4 bg-blue-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-8">My Projects</h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => handleFilterChange("all")}
            disabled={isFilterLoading === "all"}
          >
            {isFilterLoading === "all" ? "Loading..." : "All"}
          </Button>
          {technologies.map((tech) => (
            <Button
              key={tech}
              variant={filter === tech ? "default" : "outline"}
              onClick={() => handleFilterChange(tech)}
              disabled={isFilterLoading === tech}
            >
              {isFilterLoading === tech ? "Loading..." : tech}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {isLoading
            ? // Show skeleton cards while loading
              Array(3)
                .fill(0)
                .map((_, index) => <ProjectCardSkeleton key={index} />)
            : filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  technologies={project.technologies}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
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
