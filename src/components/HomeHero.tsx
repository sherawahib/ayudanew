"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { CampaignBannerPanel } from "@/components/CampaignBannerWidget";
import { HERO_BANNER_HEIGHT_CLASS, HERO_BACKGROUND_VIDEO } from "@/lib/hero";
import { HERO_SLIDES, type HeroButtonVariant } from "@/lib/site";

const BUTTON_CLASS: Record<HeroButtonVariant, string> = {
  gray: "hero-btn hero-btn-gray",
  "gray-bloom": "hero-btn hero-btn-gray-bloom",
  outline: "hero-btn hero-btn-outline",
  primary: "hero-btn hero-btn-primary",
  ghost: "hero-btn hero-btn-ghost",
};

function HeroButton({
  label,
  href,
  variant,
}: {
  label: string;
  href: string;
  variant: HeroButtonVariant;
}) {
  const external = href.startsWith("http");

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={BUTTON_CLASS[variant]}
    >
      {label}
    </Link>
  );
}

export default function HomeHero() {
  const slide = HERO_SLIDES[0];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = true;
    video.play().catch(() => {
      // Autoplay can be blocked until user interaction.
    });
  }, []);

  return (
    <section className={`relative overflow-hidden bg-[#0f2d52] ${HERO_BANNER_HEIGHT_CLASS}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={HERO_BACKGROUND_VIDEO} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/35" />

      <div className="container-ayuda relative z-10 flex h-full items-center justify-center px-5">
        <div className="flex w-full max-w-6xl flex-col items-center justify-center gap-8 md:flex-row md:items-center md:gap-10 lg:gap-14">
          <div className="max-w-xl text-center md:flex-1 md:text-left">
            {slide.subtitle && (
              <p className="font-[family-name:var(--font-poppins)] text-xl font-bold leading-tight tracking-tight text-white drop-shadow-md sm:text-2xl md:text-3xl lg:text-[2rem] lg:leading-[1.2]">
                {slide.subtitle}
              </p>
            )}

            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap md:items-start">
              {slide.buttons.map((button) => (
                <HeroButton key={button.label} {...button} />
              ))}
            </div>
          </div>

          <div className="shrink-0">
            <CampaignBannerPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
