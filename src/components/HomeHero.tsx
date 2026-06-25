"use client";

import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { HERO_BANNER_HEIGHT_CLASS, HERO_IMAGE_SLIDES } from "@/lib/hero";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ImageBackgroundSlide({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative h-full min-h-[inherit] w-full">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  );
}

export default function HomeHero() {
  return (
    <section className={`relative overflow-hidden bg-black ${HERO_BANNER_HEIGHT_CLASS}`}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop
        speed={700}
        autoplay={{ delay: 9000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="hero-swiper h-full w-full"
      >
        {HERO_IMAGE_SLIDES.map((slide, index) => (
          <SwiperSlide key={slide.src}>
            <ImageBackgroundSlide {...slide} priority={index === 0} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
