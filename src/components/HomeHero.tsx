"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { HERO_BANNER_HEIGHT_CLASS, HERO_BACKGROUND_VIDEO } from "@/lib/hero";
import { AUCTION_URL, SITE, type HeroButtonVariant } from "@/lib/site";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
      className={`${BUTTON_CLASS[variant]} w-full sm:w-auto`}
    >
      {label}
    </Link>
  );
}

function SlideShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-ayuda flex h-full min-h-[inherit] items-center py-8 md:py-0">
      {children}
    </div>
  );
}

function LeftTextSlide({
  subtitle,
  buttons,
}: {
  subtitle: string;
  buttons: { label: string; href: string; variant: HeroButtonVariant }[];
}) {
  return (
    <SlideShell>
      <div className="w-full max-w-xl text-center md:text-left">
        <p className="font-[family-name:var(--font-poppins)] text-lg font-bold leading-tight tracking-tight text-white drop-shadow-md sm:text-2xl md:text-3xl lg:text-[2rem] lg:leading-[1.2]">
          {subtitle}
        </p>
        <div className="mt-5 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center md:items-start">
          {buttons.map((button) => (
            <HeroButton key={button.label} {...button} />
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

function AmbassadorSlide() {
  return (
    <SlideShell>
      <div className="w-full max-w-2xl text-center md:text-left">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#00b388] drop-shadow-sm sm:text-sm">
          Ayuda Miami Ambassador
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-lora)] text-3xl text-white drop-shadow-md sm:text-4xl md:text-5xl lg:text-6xl">
          James Egozi
        </h2>
        <p className="mt-2 text-base font-medium text-white/90 sm:text-lg md:text-xl">
          American Racing Driver
        </p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
          18 years old. Born in Miami. Racing in Europe. The future of motorsport
          doesn&apos;t wait — and neither does James.
        </p>
        <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center md:items-start">
          <HeroButton label="Donate" href={SITE.donateUrl} variant="primary" />
        </div>
      </div>
    </SlideShell>
  );
}

export default function HomeHero() {
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

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop
        speed={700}
        autoplay={{ delay: 9000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="hero-swiper relative z-10 h-full w-full"
      >
        <SwiperSlide>
          <LeftTextSlide
            subtitle="Please give to this one of a kind organization – no amount is too small"
            buttons={[
              {
                label: "DeAnne Connolly Graham Legacy Fund",
                href: SITE.legacyFundUrl,
                variant: "primary",
              },
            ]}
          />
        </SwiperSlide>

        <SwiperSlide>
          <AmbassadorSlide />
        </SwiperSlide>

        <SwiperSlide>
          <LeftTextSlide
            subtitle="A message from Miami Dade County Mayor Daniella Levine Cava"
            buttons={[
              {
                label: "Auction Now",
                href: AUCTION_URL,
                variant: "primary",
              },
            ]}
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
