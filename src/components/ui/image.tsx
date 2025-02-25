import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  fallbackClassName?: string;
  lowQualityPlaceholder?: string;
}

const Image = ({
  src,
  alt = "",
  className,
  fallback = "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1074&auto=format&fit=crop",
  fallbackClassName,
  lowQualityPlaceholder,
  ...props
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
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
        rootMargin: "200px 0px", // 200px "threshold" - starts loading 200px before it's visible
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, []);

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
        src={isInView ? (src || fallback) : "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="}
        data-src={src || fallback}
        alt={alt}
        className={cn(className, isLoading && "opacity-0 transition-opacity duration-300")}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </div>
  );
};

export { Image };
