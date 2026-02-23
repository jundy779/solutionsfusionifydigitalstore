import { Skeleton } from "@/components/ui/skeleton";

export const PageSkeleton = () => (
  <div className="min-h-screen bg-background">
    {/* Navbar skeleton */}
    <div className="h-16 border-b border-border/50 flex items-center px-6 gap-4">
      <Skeleton className="h-8 w-32" />
      <div className="flex-1" />
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-20" />
    </div>

    {/* Hero skeleton */}
    <div className="container mx-auto px-4 pt-24 pb-12">
      <Skeleton className="h-6 w-24 rounded-full mb-6" />
      <Skeleton className="h-12 w-3/4 max-w-xl mb-4" />
      <Skeleton className="h-12 w-1/2 max-w-md mb-6" />
      <Skeleton className="h-5 w-full max-w-lg mb-2" />
      <Skeleton className="h-5 w-4/5 max-w-md" />
    </div>

    {/* Content skeleton */}
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-2xl border border-border/50 space-y-4">
            <Skeleton className="aspect-video rounded-xl" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  </div>
);
