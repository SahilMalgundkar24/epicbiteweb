import Image from "next/image";

interface RecipeImageProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  containerClassName?: string;
  imageClassName?: string;
}

export default function RecipeImage({
  src,
  alt,
  sizes = "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
  priority = false,
  containerClassName = "relative w-full h-64 lg:h-80",
  imageClassName = "rounded-lg object-cover bg-gray-200",
}: RecipeImageProps) {
  return (
    <div className={containerClassName}>
      <Image
        src={src || "/images/temp.jpg"}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={imageClassName}
      />
    </div>
  );
}
