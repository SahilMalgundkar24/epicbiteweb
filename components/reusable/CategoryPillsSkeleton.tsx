interface CategoryPillsSkeletonProps {
  count?: number;
}

export default function CategoryPillsSkeleton({
  count = 5,
}: CategoryPillsSkeletonProps) {
  return (
    <div className="flex items-center gap-4 whitespace-nowrap">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-9 w-20 bg-gray-200 rounded-full animate-pulse shrink-0"
        />
      ))}
    </div>
  );
}
