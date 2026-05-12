export const ProductSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="md:col-span-2">
      <div className="h-96 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
    </div>
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-3/4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-1/2" />
      <div className="h-12 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-full" />
      <div className="h-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-full" />
      <div className="h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded w-full" />
    </div>
  </div>
);
