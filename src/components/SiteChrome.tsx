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
      className="fixed bottom-24 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-ayuda-blue text-white shadow-lg transition-transform hover:scale-105"
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
      className="fixed bottom-6 right-6 z-40 rounded-full bg-ayuda-blue-deep px-5 py-3 font-[family-name:var(--font-poppins)] text-xs font-bold uppercase tracking-wide text-white shadow-xl transition-transform hover:scale-105"
    >
      Donate
    </Link>
  );
}
