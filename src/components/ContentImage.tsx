import Image from "next/image";

type ContentImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
};

export default function ContentImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill,
  sizes,
  quality = 75,
}: ContentImageProps) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        quality={quality}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 400}
      height={height ?? 300}
      className={className}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      quality={quality}
    />
  );
}
