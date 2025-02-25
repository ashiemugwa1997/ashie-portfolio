import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ExternalLink, Github } from "lucide-react";
import { Image } from "./ui/image";

interface ProjectModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  project?: {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    details?: string;
  };
}

const ProjectModal = ({
  isOpen = true,
  onClose = () => {},
  project = {
    title: "Sample Project",
    description:
      "A sample project showcasing various technologies and features",
    image: "/ashley.jpg",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/project",
    details:
      "This is a detailed description of the project including its features, challenges, and solutions.",
  },
}: ProjectModalProps) => {
  const [isLoading, setIsLoading] = React.useState<string>("");

  // Generate low quality placeholder for modal images
  const generateLowQualityUrl = (url: string) => {
    if (!url) return "";
    
    try {
      const urlObj = new URL(url);
      // For Unsplash images, we can use their built-in transformation parameters
      if (urlObj.hostname.includes('unsplash.com')) {
        return `${url}&w=50&blur=10`;
      }
      return url; // Return original if we can't optimize
    } catch (e) {
      return url; // Return original on any error
    }
  };

  const handleButtonClick = async (type: string, url: string) => {
    setIsLoading(type);
    await new Promise((resolve) => setTimeout(resolve, 500));
    window.open(url, "_blank");
    setIsLoading("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              {project.title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="mt-4">
          <Image
            src={project.image}
            alt={project.title}
            className="w-full h-[300px] object-cover rounded-lg"
            fallback="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1074&auto=format&fit=crop"
            fallbackClassName="w-full h-[300px] bg-gray-100 rounded-lg"
            lowQualityPlaceholder={generateLowQualityUrl(project.image)}
            loading="eager" // Load this image immediately as it's the main content of an opened modal
            decoding="async"
          />
        </div>

        <DialogDescription className="mt-4 text-lg text-gray-700">
          {project.description}
        </DialogDescription>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <Badge key={index} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Project Details</h3>
          <p className="text-gray-700">{project.details}</p>
        </div>

        <div className="mt-6 flex gap-4">
          {project.liveUrl && (
            <Button
              className="flex items-center gap-2"
              onClick={() => handleButtonClick("live", project.liveUrl!)}
              disabled={isLoading === "live"}
            >
              <ExternalLink className="h-4 w-4" />
              {isLoading === "live" ? "Opening..." : "View Live"}
            </Button>
          )}
          {project.githubUrl && (
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => handleButtonClick("github", project.githubUrl!)}
              disabled={isLoading === "github"}
            >
              <Github className="h-4 w-4" />
              {isLoading === "github" ? "Opening..." : "View Code"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
