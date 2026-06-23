import ContentImage from "@/components/ContentImage";

type ImageGalleryProps = {
  images: { src: string; alt: string }[];
};

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image, index) => (
        <figure
          key={image.src}
          className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm"
        >
          <div className="relative h-56 w-full overflow-hidden bg-[#f4f8fc] sm:h-64 md:h-72">
            <ContentImage
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 3}
            />
          </div>
        </figure>
      ))}
    </div>
  );
}
