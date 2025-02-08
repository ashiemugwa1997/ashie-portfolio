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

interface ProjectCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  technologies?: string[];
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title = "Project Title",
  description = "A brief description of the project and its key features. This showcases the main highlights and achievements.",
  imageUrl = "/ashley.jpg",
  technologies = ["React", "TypeScript", "Tailwind"],
  onClick = () => console.log("Project card clicked"),
}) => {
  return (
    <Card className="w-[350px] h-[400px] bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          fallback="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1074&auto=format&fit=crop"
          fallbackClassName="w-full h-full bg-gray-100"
        />
      </div>

      <CardHeader>
        <CardTitle className="text-xl font-semibold truncate">
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-100">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="absolute bottom-0 w-full bg-white border-t">
        <Button
          onClick={onClick}
          variant="ghost"
          className="w-full flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
