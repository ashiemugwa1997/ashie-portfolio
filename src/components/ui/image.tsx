import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  fallbackClassName?: string;
  lowQualityPlaceholder?: string;
  priority?: boolean; // Add priority flag
}

const Image = ({
  src,
  alt = "",
  className,
  fallback = "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1074&auto=format&fit=crop",
  fallbackClassName,
  lowQualityPlaceholder,
  loading: propLoading,
  fetchPriority: propFetchPriority,
  priority = false, // Default to non-priority
  ...props
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Determine if we should use the IntersectionObserver or load immediately
  const shouldLazyLoad = !priority && propLoading !== "eager";

  useEffect(() => {
    // If priority is set, mark as in view immediately
    if (priority || propLoading === "eager") {
      setIsInView(true);
      return;
    }
    
    // Set up intersection observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          // Disconnect after image is in view to save memory
          if (imgRef.current) observer.unobserve(imgRef.current);
        }
      },
      {
        rootMargin: priority ? "0px" : "200px 0px", // Smaller threshold for priority images
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current && observer) observer.unobserve(imgRef.current);
    };
  }, [priority, propLoading]);

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

  // Determine optimal loading attribute value
  const loadingAttribute = propLoading || (priority ? "eager" : "lazy");
  
  // Determine optimal fetch priority
  const fetchPriority = propFetchPriority || (priority ? "high" : "auto");

  return (
    <div className="relative overflow-hidden">
      {isLoading && (
        <div
          className={cn("absolute inset-0 animate-pulse bg-muted", className)}
        />
      )}
      
      {/* Low quality placeholder while loading */}
      {isLoading && lowQualityPlaceholder && (
        <img 
          src={lowQualityPlaceholder} 
          alt={alt}
          className={cn(className, "absolute inset-0 blur-md scale-105")} 
          aria-hidden="true"
        />
      )}
      
      <img
        ref={imgRef}
        src={isInView || priority ? (src || fallback) : "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="}
        data-src={src || fallback}
        alt={alt}
        className={cn(className, isLoading && "opacity-0 transition-opacity duration-300")}
        onLoad={handleLoad}
        onError={handleError}
        loading={loadingAttribute}
        decoding={priority ? "sync" : "async"}
        fetchPriority={fetchPriority}
        {...props}
      />
    </div>
  );
};

export { Image };
