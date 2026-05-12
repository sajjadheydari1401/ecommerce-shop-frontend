export const CartSkeleton = () => (
  <div className="py-8">
    <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-6" />
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
          <div className="flex-1">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mb-2" />
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
            <div className="mt-2 flex gap-2">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
              <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
            </div>
          </div>
          <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
        </div>
      ))}
    </div>
    <div className="mt-6 border-t pt-4">
      <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded ml-auto mb-3" />
      <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
    </div>
  </div>
);
