import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Code2,
  Database,
  Layout,
  Server,
  Smartphone,
  Terminal,
  Globe,
  Cloud,
} from "lucide-react";

interface SkillsSectionProps {
  skills?: {
    category: string;
    items: string[];
    icon: keyof typeof iconMap;
  }[];
}

const iconMap = {
  Code2,
  Database,
  Layout,
  Server,
  Smartphone,
  Terminal,
  Globe,
  Cloud,
};

import { Skeleton } from "./ui/skeleton";

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills = [
    {
      category: "Programming Languages",
      icon: "Code2",
      items: [
        "Java",
        "SQL",
        "C++",
        "PHP",
        "JavaScript",
        "TypeScript",
        "Python",
      ],
    },
    {
      category: "Frameworks",
      icon: "Layout",
      items: [
        "Django",
        "Laravel",
        "Flutter",
        "React",
        "Angular",
        "Vue.js",
        "Ionic",
      ],
    },
    {
      category: "Database & Cloud",
      icon: "Database",
      items: ["MySQL", "PostgreSQL", "AWS"],
    },
    {
      category: "DevOps & Tools",
      icon: "Terminal",
      items: ["Git", "Docker", "AWS", "CI/CD", "Linux"],
    },
  ],
}) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <section className="py-16 px-4 md:px-8 bg-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Technical Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? // Skeleton loading state
              Array(4)
                .fill(0)
                .map((_, index) => (
                  <Card key={index} className="bg-white">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Skeleton className="h-10 w-10 rounded-lg" />
                        <Skeleton className="h-6 w-32" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                    </CardContent>
                  </Card>
                ))
            : skills.map((skillGroup, index) => {
                const IconComponent = iconMap[skillGroup.icon];
                return (
                  <Card key={index} className="bg-white">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg">
                          {skillGroup.category}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
