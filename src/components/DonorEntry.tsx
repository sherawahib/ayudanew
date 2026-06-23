import ContentImage from "@/components/ContentImage";

type DonorEntryProps = {
  title: string;
  date: string;
  description: string;
  image?: string;
};

export default function DonorEntry({ title, date, description, image }: DonorEntryProps) {
  return (
    <article className="grid gap-6 border-b border-black/10 py-8 last:border-0 md:grid-cols-[160px_1fr]">
      <div className="flex items-start justify-center md:justify-start">
        {image ? (
          <ContentImage
            src={image}
            alt={title}
            width={140}
            height={100}
            className="h-auto max-h-24 w-auto max-w-[140px] object-contain"
          />
        ) : (
          <div className="flex h-24 w-32 items-center justify-center bg-[#f0f0f0] text-xs text-ayuda-gray">
            AYUDA
          </div>
        )}
      </div>
      <div>
        <h2 className="text-lg text-black md:text-xl">{title}</h2>
        <p className="mt-2 text-sm text-ayuda-blue">{date}</p>
        <p className="mt-4 text-base leading-relaxed text-black">{description}</p>
      </div>
    </article>
  );
}
