import Link from "next/link";
import { img } from "@/lib/images";
import { SITE } from "@/lib/site";

const PARALLAX_IMAGE = img("2018/07/pexels-photo-853168.jpeg");
const DECOR_IMAGE = img("2016/08/image.png");

export default function DonateSection() {
  return (
    <section className="relative">
      <div className="relative min-h-[260px] overflow-hidden sm:min-h-[320px] md:min-h-[380px]">
        {/* Static image layer — no bg-fixed (that causes blank gaps on scroll) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PARALLAX_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
          draggable={false}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-[#00b388]/90" />

        <div className="relative flex min-h-[inherit] items-center justify-center px-6 py-16 md:py-20">
          <div className="donate-logo-glow flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={DECOR_IMAGE}
              alt=""
              width={66}
              height={66}
              className="h-14 w-14 brightness-0 invert opacity-95 md:h-[66px] md:w-[66px]"
            />
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#00b388] to-transparent" />
      </div>

      <div className="relative bg-[#00b388]">
        <div className="absolute inset-x-0 top-0 h-px bg-white/20" />

        <div className="container-ayuda py-10 md:py-12 lg:py-14">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-3xl text-center lg:text-left">
              <span
                className="mb-3 block font-[family-name:var(--font-lora)] text-4xl leading-none text-white/30 sm:text-5xl md:text-6xl"
                aria-hidden
              >
                &ldquo;
              </span>
              <h2 className="font-[family-name:var(--font-lora)] text-2xl font-normal leading-snug tracking-tight text-white md:text-3xl lg:text-[2rem]">
                Your donation is important. Any amount welcome.
              </h2>
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-white/75">
                Every gift helps Miami families thrive
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href={SITE.donatePageUrl}
                className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden bg-ayuda-blue px-8 py-4 font-[family-name:var(--font-poppins)] text-sm font-bold uppercase tracking-[0.15em] !text-white shadow-[0_8px_30px_rgba(18,97,171,0.45)] transition-colors duration-300 hover:bg-ayuda-blue-dark sm:w-auto sm:px-10"
              >
                <span className="relative z-10">Donate Now</span>
                <svg
                  className="relative z-10 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
