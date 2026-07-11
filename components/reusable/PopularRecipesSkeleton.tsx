interface PopularRecipesSkeletonProps {
  count?: number;
}

export default function PopularRecipesSkeleton({
  count = 4,
}: PopularRecipesSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-[90%] lg:w-1/4 shrink-0 select-none animate-pulse"
        >
          <div className="w-full h-64 lg:h-80 bg-gray-200 rounded-lg" />
          <div className="mt-3 h-4 w-3/4 bg-gray-200 rounded-full" />
          <div className="mt-2 h-3 w-1/2 bg-gray-100 rounded-full" />
        </div>
      ))}
    </>
  );
}
