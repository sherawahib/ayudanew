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
  size?: "default" | "large";
};

export default function LogoGrid({ logos, columns = 4, size = "default" }: LogoGridProps) {
  const isLarge = size === "large";
  const colClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : columns === 5
          ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid ${isLarge ? "gap-8" : "gap-6"} ${colClass}`}>
      {logos.map((logo, index) => {
        const card = (
          <div
            className={`flex items-center justify-center border border-black/10 bg-white transition-colors hover:border-ayuda-blue/30 hover:bg-[#f8fbff] ${
              isLarge ? "min-h-[160px] p-6 md:min-h-[180px] md:p-8" : "min-h-[100px] p-4"
            }`}
          >
            <ContentImage
              src={logo.src}
              alt={logo.alt}
              width={isLarge ? 280 : 180}
              height={isLarge ? 160 : 100}
              className={`h-auto w-auto max-w-full object-contain ${
                isLarge ? "max-h-32 md:max-h-36" : "max-h-20"
              }`}
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
