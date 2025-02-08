import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const ProjectCardSkeleton = () => {
  return (
    <Card className="w-[350px] h-[400px] bg-white overflow-hidden">
      <Skeleton className="h-48 w-full" />

      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />

        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-4 border-t">
        <Skeleton className="h-9 w-full" />
      </div>
    </Card>
  );
};

export default ProjectCardSkeleton;
