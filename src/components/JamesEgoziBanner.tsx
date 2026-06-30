import Image from "next/image";
import {
  JAMES_EGOZI_BANNER,
  JAMES_EGOZI_BANNER_ALT,
  JAMES_EGOZI_BANNER_HEIGHT,
  JAMES_EGOZI_BANNER_WIDTH,
} from "@/lib/hero";

type JamesEgoziBannerProps = {
  priority?: boolean;
  children?: React.ReactNode;
};

export default function JamesEgoziBanner({
  priority = false,
  children,
}: JamesEgoziBannerProps) {
  return (
    <section className="relative w-full bg-[#0b0b0b]">
      <Image
        src={JAMES_EGOZI_BANNER}
        alt={JAMES_EGOZI_BANNER_ALT}
        width={JAMES_EGOZI_BANNER_WIDTH}
        height={JAMES_EGOZI_BANNER_HEIGHT}
        priority={priority}
        sizes="100vw"
        className="mx-auto block h-auto w-full max-w-[1600px]"
      />
      {children ? (
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end">
          <div className="pointer-events-auto">{children}</div>
        </div>
      ) : null}
    </section>
  );
}
