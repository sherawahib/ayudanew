"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { HeroButtonVariant, HeroSlide } from "@/lib/site";
import { HERO_SLIDES } from "@/lib/site";
import { HERO_BANNER_HEIGHT_CLASS } from "@/lib/hero";

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

function SlideButton({
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

function ImageSlide({ slide }: { slide: HeroSlide }) {
  return (
    <div className="relative h-full w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slide.image}
        alt={slide.alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: slide.objectPosition ?? "center center" }}
        draggable={false}
      />
      <div className="absolute bottom-[18%] left-1/2 z-10 translate-x-[8%] sm:translate-x-[18%] md:translate-x-[28%] lg:translate-x-[33%]">
        {slide.buttons.map((button) => (
          <SlideButton key={button.label} {...button} />
        ))}
      </div>
    </div>
  );
}

function MayorSlide({ slide }: { slide: HeroSlide }) {
  return (
    <div className="relative h-full w-full" style={{ backgroundColor: slide.bgColor }}>
      <div className="container-ayuda relative h-full">
        {slide.title && (
          <h2 className="absolute left-5 top-5 z-20 max-w-[92%] font-[family-name:var(--font-poppins)] text-xl font-extrabold leading-tight tracking-tight text-white sm:left-8 sm:top-8 sm:text-3xl md:max-w-4xl md:text-4xl lg:text-5xl">
            {slide.title}
          </h2>
        )}

        {slide.video && (
          <div className="absolute left-4 top-[32%] z-10 w-[88%] overflow-hidden rounded-sm shadow-2xl sm:left-10 sm:top-[34%] sm:w-[62%] md:left-16 md:top-[30%] md:w-[55%] lg:left-24">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={slide.video.poster}
              className="aspect-video w-full bg-black object-cover"
            >
              <source src={slide.video.mp4} type="video/mp4" />
            </video>
          </div>
        )}

        <div className="absolute bottom-[14%] left-[38%] z-20 sm:left-[42%] md:bottom-[12%] md:left-[44%]">
          {slide.buttons.map((button) => (
            <SlideButton key={button.label} {...button} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CloudSlide({ slide }: { slide: HeroSlide }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    video.muted = true;
    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Autoplay can be blocked until user interaction.
      });
    }
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={slide.backgroundVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/30" />

      <div className="container-ayuda relative z-10 flex h-full items-center justify-center md:justify-start">
        <div className="max-w-md text-center sm:max-w-lg md:max-w-xl md:text-left lg:max-w-2xl">
          {slide.subtitle && (
            <p className="font-[family-name:var(--font-poppins)] text-xl font-bold leading-tight tracking-tight text-white drop-shadow-sm sm:text-2xl md:text-3xl lg:text-4xl lg:leading-[1.15]">
              {slide.subtitle}
            </p>
          )}

          <div className="mt-5 flex flex-col items-center gap-3 sm:mt-6 sm:flex-row sm:flex-wrap md:items-start">
            {slide.buttons.map((button) => (
              <SlideButton key={button.label} {...button} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LegacySlide({ slide }: { slide: HeroSlide }) {
  return (
    <div className="relative h-full w-full">
      {slide.backgroundVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={slide.image}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={slide.backgroundVideo} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={slide.image}
          alt={slide.alt}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-transparent to-transparent" />

      <div className="container-ayuda relative z-10 flex h-full flex-col justify-center py-16">
        {slide.subtitle && (
          <p className="max-w-4xl font-[family-name:var(--font-poppins)] text-2xl font-bold leading-tight tracking-tight text-[#5856d6] sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[1.1]">
            {slide.subtitle}
          </p>
        )}

        {slide.logo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={slide.logo}
            alt=""
            className="mt-6 w-40 sm:mt-8 sm:w-52 md:w-64"
            draggable={false}
          />
        )}

        <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
          {slide.buttons.map((button) => (
            <SlideButton key={button.label} {...button} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BrighterSlide({ slide }: { slide: HeroSlide }) {
  return (
    <div className="relative h-full w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slide.image}
        alt={slide.alt}
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

      <div className="container-ayuda relative flex h-full flex-col justify-end pb-20 pt-24 md:pb-24 md:items-end md:text-right">
        {slide.title && (
          <h2 className="max-w-4xl font-[family-name:var(--font-poppins)] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.05]">
            {slide.title}
          </h2>
        )}
        <div className="mt-6 md:mt-8">
          {slide.buttons.map((button) => (
            <SlideButton key={button.label} {...button} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideContent({ slide }: { slide: HeroSlide }) {
  switch (slide.kind) {
    case "cloud":
      return <CloudSlide slide={slide} />;
    case "mayor":
      return <MayorSlide slide={slide} />;
    case "legacy":
      return <LegacySlide slide={slide} />;
    case "brighter":
      return <BrighterSlide slide={slide} />;
    default:
      return <ImageSlide slide={slide} />;
  }
}

export default function HeroSlider() {
  const multipleSlides = HERO_SLIDES.length > 1;

  return (
    <section className={`relative overflow-hidden bg-[#0f2d52] ${HERO_BANNER_HEIGHT_CLASS}`}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={multipleSlides}
        speed={600}
        autoplay={multipleSlides ? { delay: 9000, disableOnInteraction: false } : false}
        pagination={multipleSlides ? { clickable: true } : false}
        navigation={multipleSlides}
        className="hero-swiper h-full w-full"
      >
        {HERO_SLIDES.map((slide) => (
          <SwiperSlide key={slide.id}>
            <SlideContent slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
