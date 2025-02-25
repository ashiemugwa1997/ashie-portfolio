import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

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
    // ...existing code...
  ],
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [isFilterLoading, setIsFilterLoading] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);

  // Calculate all unique technologies once on component mount
  const technologies = React.useMemo(() => 
    Array.from(new Set(projects.flatMap((project) => project.technologies))),
    [projects]
  );

  // Filter projects based on selected technology
  const filteredProjects = React.useMemo(() => 
    filter === "all"
      ? projects
      : projects.filter((project) => project.technologies.includes(filter)),
    [filter, projects]
  );

  // Handle initial loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Prioritize visible projects in batches for better rendering performance
      if (filteredProjects.length > 0) {
        const first = filteredProjects.slice(0, 2); // First visible batch
        setVisibleProjects(first);
        
        // Add remaining projects with a slight delay for better UI responsiveness
        if (filteredProjects.length > 2) {
          setTimeout(() => {
            setVisibleProjects(filteredProjects);
          }, 200);
        }
      }
      
      console.log("Projects loaded.");
    }, 1000); // Reduced loading time for better experience

    return () => clearTimeout(timer);
  }, [filteredProjects]);

  const handleFilterChange = async (newFilter: string) => {
    setIsFilterLoading(newFilter);
    setIsLoading(true);
    setVisibleProjects([]);

    // Simulate loading delay - reduced for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    setFilter(newFilter);
    setIsFilterLoading("");

    // Simulate content loading with progressive rendering
    setTimeout(() => {
      setIsLoading(false);
      
      // Load first batch immediately
      const firstBatch = 
        newFilter === "all"
          ? projects.slice(0, 2)
          : projects.filter((project) => project.technologies.includes(newFilter)).slice(0, 2);
      
      setVisibleProjects(firstBatch);
      
      // Load remaining projects after a small delay
      setTimeout(() => {
        setVisibleProjects(
          newFilter === "all"
            ? projects
            : projects.filter((project) => project.technologies.includes(newFilter))
        );
      }, 100);
      
      console.log(`Filter changed to ${newFilter}.`);
    }, 200);
  };

  return (
    <section className="py-16 px-4 bg-blue-50">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8"
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
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center min-h-[400px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              // Show skeleton cards while loading
              <>
                {Array(Math.min(3, filteredProjects.length || 3))
                  .fill(0)
                  .map((_, index) => (
                    <motion.div
                      key={`skeleton-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <ProjectCardSkeleton />
                    </motion.div>
                  ))}
              </>
            ) : (
              <>
                {visibleProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.3,
                      delay: Math.min(index * 0.1, 0.3), // Cap delay for better performance
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
                      priority={index < 2} // Prioritize loading for first two projects
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

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";
import { Image } from "./ui/image";
import { useTheme } from "./ThemeProvider";

interface ProjectCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  technologies?: string[];
  onClick?: () => void;
  priority?: boolean; // Add priority flag for important images
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title = "Project Title",
  description = "Project Description",
  imageUrl = "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
  technologies = ["React", "TypeScript"],
  onClick = () => {},
  priority = false, // Default to non-priority
}) => {
  const { theme } = useTheme();
  
  // Create a low-quality placeholder URL from the original
  const generateLowQualityUrl = (url: string) => {
    if (!url) return "";
    
    try {
      const urlObj = new URL(url);
      // For Unsplash images, we can use their built-in transformation parameters
      if (urlObj.hostname.includes('unsplash.com')) {
        return `${url}&w=20&blur=10`;
      }
      return url; // Return original if we can't optimize
    } catch (e) {
      return url; // Return original on any error
    }
  };
  
  const lowQualityUrl = generateLowQualityUrl(imageUrl);

  return (
    <Card 
      className={`w-[350px] h-[400px] overflow-hidden hover:shadow-lg transition-shadow duration-300 
        ${theme === 'dark' 
          ? 'bg-gray-800 border-gray-700 text-gray-100'
          : 'bg-white text-gray-900'
        }`}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          fallback="https://via.placeholder.com/300x200.png?text=Image+Not+Available"
          fallbackClassName={`w-full h-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
          lowQualityPlaceholder={lowQualityUrl}
          loading={priority ? "eager" : "lazy"} // Use eager loading for priority images
          decoding={priority ? "sync" : "async"} // Use sync decoding for priority images
          fetchPriority={priority ? "high" : "auto"} // Set fetch priority for browsers that support it
        />
      </div>

      <CardHeader>
        <CardTitle className={`text-xl font-semibold truncate ${theme === 'dark' ? 'text-white' : ''}`}>
          {title}
        </CardTitle>
        <CardDescription className={`line-clamp-2 ${theme === 'dark' ? 'text-gray-300' : ''}`}>
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {technologies?.map((tech, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className={theme === 'dark' 
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600" 
                : "bg-gray-100 hover:bg-gray-200"}
            >
              {tech}
            </Badge>
          )) || null}
        </div>
      </CardContent>

      <CardFooter 
        className={`absolute bottom-0 w-full border-t 
          ${theme === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'}`}
      >
        <Button
          onClick={onClick}
          variant="ghost"
          className={`w-full flex items-center justify-center gap-2
            ${theme === 'dark' 
              ? 'hover:bg-gray-700 text-blue-300 hover:text-blue-200'
              : 'hover:bg-gray-100 text-blue-600'}`}
        >
          <Eye className="w-4 h-4" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
