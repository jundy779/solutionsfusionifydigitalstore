import { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Image source */
  src: string;
  /** Alt text (required for accessibility) */
  alt: string;
  /** Responsive sizes attribute for browser to pick best size */
  sizes?: string;
  /** Priority loading for above-the-fold images */
  priority?: boolean;
}

/**
 * Optimized image component with lazy loading, decoding, and responsive hints.
 * Automatically applies lazy loading for non-priority images.
 */
export const OptimizedImage = ({
  src,
  alt,
  sizes,
  priority = false,
  className,
  ...props
}: OptimizedImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      sizes={sizes}
      className={cn(className)}
      {...props}
    />
  );
};
