import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { useTheme } from "./ThemeProvider";

interface ProjectCardSkeletonProps {
  isDarkMode?: boolean;
}

const ProjectCardSkeleton = ({ isDarkMode }: ProjectCardSkeletonProps) => {
  const { theme } = useTheme();
  
  // Use prop if provided, otherwise use theme context
  const isDark = isDarkMode !== undefined ? isDarkMode : theme === "dark";
  
  return (
    <Card className={`w-[350px] h-[400px] overflow-hidden ${
      isDark 
        ? "bg-gray-800 border-gray-700" 
        : "bg-white"
    }`}>
      <Skeleton className={`h-48 w-full ${
        isDark ? "bg-gray-700" : ""
      }`} />

      <div className="p-6 space-y-4">
        <Skeleton className={`h-6 w-3/4 ${
          isDark ? "bg-gray-700" : ""
        }`} />
        <Skeleton className={`h-4 w-full ${
          isDark ? "bg-gray-700" : ""
        }`} />
        <Skeleton className={`h-4 w-5/6 ${
          isDark ? "bg-gray-700" : ""
        }`} />

        <div className="flex gap-2">
          <Skeleton className={`h-6 w-16 ${
            isDark ? "bg-gray-700" : ""
          }`} />
          <Skeleton className={`h-6 w-16 ${
            isDark ? "bg-gray-700" : ""
          }`} />
          <Skeleton className={`h-6 w-16 ${
            isDark ? "bg-gray-700" : ""
          }`} />
        </div>
      </div>

      <div className={`absolute bottom-0 w-full p-4 border-t ${
        isDark ? "border-gray-700" : ""
      }`}>
        <Skeleton className={`h-9 w-full ${
          isDark ? "bg-gray-700" : ""
        }`} />
      </div>
    </Card>
  );
};

export default ProjectCardSkeleton;
