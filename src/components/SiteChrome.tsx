"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="#top"
      className="fixed bottom-[5.5rem] right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-ayuda-blue text-white shadow-lg transition-transform hover:scale-105 sm:bottom-24 sm:right-6"
      aria-label="Back to top"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4l-8 8h5v8h6v-8h5l-8-8z" />
      </svg>
    </a>
  );
}

export function FloatingDonate() {
  return (
    <Link
      href={SITE.donateUrl}
      className="fixed bottom-4 right-4 z-40 rounded-full bg-ayuda-blue-deep px-4 py-2.5 font-[family-name:var(--font-poppins)] text-[11px] font-bold uppercase tracking-wide !text-white shadow-xl transition-transform hover:scale-105 sm:bottom-6 sm:right-6 sm:px-5 sm:py-3 sm:text-xs"
    >
      Donate
    </Link>
  );
}
