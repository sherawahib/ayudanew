import { img } from "@/lib/images";

/** Responsive home hero banner height — scales from mobile to desktop. */
export const HERO_BANNER_HEIGHT_CLASS =
  "min-h-[520px] h-auto py-16 sm:min-h-[560px] md:min-h-[620px] md:h-[620px] md:py-0 lg:h-[680px] xl:h-[700px]";

export const JAMES_EGOZI_BANNER = img("2026/06/james-egozi-ayuda-banner.png");

export const HERO_IMAGE_SLIDES = [
  {
    src: JAMES_EGOZI_BANNER,
    alt: "James Egozi — Official Ayuda Miami brand ambassador and American racing driver",
  },
  {
    src: img("2026/06/james-egozi-hero-2.png"),
    alt: "James Egozi — Driven by passion. Built for victory.",
  },
] as const;