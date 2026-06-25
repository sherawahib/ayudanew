import { img } from "@/lib/images";

/** Responsive home hero banner height — scales from mobile to desktop. */
export const HERO_BANNER_HEIGHT_CLASS =
  "min-h-[520px] h-auto py-16 sm:min-h-[560px] md:min-h-[620px] md:h-[620px] md:py-0 lg:h-[680px] xl:h-[700px]";

export const HERO_IMAGE_SLIDES = [
  {
    src: img("2026/06/james-egozi-hero-1.png"),
    alt: "James Egozi — American racing driver from Miami",
  },
  {
    src: img("2026/06/james-egozi-hero-2.png"),
    alt: "James Egozi — Driven by passion. Built for victory.",
  },
] as const;