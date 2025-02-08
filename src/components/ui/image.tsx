import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  fallbackClassName?: string;
}

const Image = ({
  src,
  alt = "",
  className,
  fallback = "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1074&auto=format&fit=crop",
  fallbackClassName,
  ...props
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted",
          fallbackClassName || className,
        )}
      >
        <ImageOff className="w-6 h-6 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div
          className={cn("absolute inset-0 animate-pulse bg-muted", className)}
        />
      )}
      <img
        src={src || fallback}
        alt={alt}
        className={cn(className, isLoading && "opacity-0")}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

export { Image };
