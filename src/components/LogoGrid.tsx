import ContentImage from "@/components/ContentImage";
import Link from "next/link";

export type LogoItem = {
  src: string;
  alt: string;
  href?: string;
};

type LogoGridProps = {
  logos: LogoItem[];
  columns?: 2 | 3 | 4 | 5;
};

export default function LogoGrid({ logos, columns = 4 }: LogoGridProps) {
  const colClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : columns === 5
          ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid gap-6 ${colClass}`}>
      {logos.map((logo, index) => {
        const card = (
          <div className="flex min-h-[100px] items-center justify-center border border-black/10 bg-white p-4 transition-colors hover:border-ayuda-blue/30 hover:bg-[#f8fbff]">
            <ContentImage
              src={logo.src}
              alt={logo.alt}
              width={180}
              height={100}
              className="h-auto max-h-20 w-auto max-w-full object-contain"
            />
          </div>
        );

        return logo.href ? (
          <Link
            key={`${logo.src}-${index}`}
            href={logo.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={logo.alt}
            className="block"
          >
            {card}
          </Link>
        ) : (
          <div key={`${logo.src}-${index}`}>{card}</div>
        );
      })}
    </div>
  );
}
