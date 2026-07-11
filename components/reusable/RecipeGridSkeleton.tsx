interface RecipeGridSkeletonProps {
  count?: number;
}

export default function RecipeGridSkeleton({
  count = 8,
}: RecipeGridSkeletonProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-full shrink-0 animate-pulse">
          <div className="w-full h-64 lg:h-80 bg-gray-200 rounded-lg" />
          <div className="mt-3 h-4 w-3/4 bg-gray-200 rounded-full" />
          <div className="mt-2 h-3 w-1/2 bg-gray-100 rounded-full" />
        </div>
      ))}
    </div>
  );
}
