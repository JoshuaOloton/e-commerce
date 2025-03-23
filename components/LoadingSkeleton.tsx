import { Skeleton } from "@/components/ui/skeleton";

export const ProductsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
};

export const ProductSkeleton = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center my-10">
      <div className="p-4 w-3/4 sm:w-5/6 max-w-5xl  flex flex-col sm:flex-row gap-1 md:gap-6">
        <div className="bg-gray-100 flex-1/2 p-4 rounded">
          <div className="animate-pulse bg-gray-300 w-full h-96 rounded"></div>
        </div>
        <div className="my-8 flex-1/2">
          <div className="animate-pulse bg-gray-300 w-3/4 h-6 mb-2 rounded"></div>
          <div className="animate-pulse bg-gray-300 w-1/2 h-6 mb-2 rounded"></div>
          <div className="animate-pulse bg-gray-300 w-3/4 h-6 mb-2 rounded"></div>
          <div className="animate-pulse bg-gray-300 w-3/4 h-6 mb-2 rounded"></div>
          <div className="animate-pulse bg-gray-300 w-3/4 h-6 mb-2 rounded"></div>
        </div>
      </div>
    </div>
  );
};
