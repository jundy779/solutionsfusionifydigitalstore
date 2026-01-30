import { Skeleton } from "@/components/ui/skeleton";

export const FeaturedProjectSkeleton = () => {
  return (
    <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border/50 animate-pulse">
      {/* Thumbnail skeleton */}
      <Skeleton className="aspect-video rounded-xl mb-5" />

      {/* Category badge skeleton */}
      <div className="flex items-center gap-2 mb-3">
        <Skeleton className="w-6 h-6 rounded-lg" />
        <Skeleton className="h-3 w-24" />
      </div>

      {/* Title skeleton */}
      <Skeleton className="h-6 w-3/4 mb-3" />
      
      {/* Description skeleton */}
      <div className="space-y-2 mb-4">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>

      {/* Technologies skeleton */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-18 rounded-full" />
      </div>

      {/* Results skeleton */}
      <div className="pt-4 border-t border-border/30">
        <Skeleton className="h-3 w-20 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
};

export const OtherProjectSkeleton = () => {
  return (
    <div className="flex gap-5 p-5 rounded-2xl bg-card/50 border border-border/50 animate-pulse">
      {/* Icon skeleton */}
      <Skeleton className="w-14 h-14 rounded-xl flex-shrink-0" />

      {/* Content skeleton */}
      <div className="flex-1 min-w-0">
        <Skeleton className="h-5 w-2/3 mb-2" />
        <div className="space-y-2 mb-3">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const PortfolioSkeletonLoader = () => {
  return (
    <>
      {/* Featured Section Skeleton */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <FeaturedProjectSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Other Projects Section Skeleton */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Skeleton className="h-8 w-40 mb-2" />
            <Skeleton className="h-4 w-56" />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <OtherProjectSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
