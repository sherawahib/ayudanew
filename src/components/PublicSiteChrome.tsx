"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import BackgroundMusic from "@/components/BackgroundMusic";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import Header from "@/components/Header";
import { BackToTop, FloatingDonate } from "@/components/SiteChrome";

export function PublicSiteHeader() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return null;
  }
  return <Header />;
}

export function PublicSiteFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return null;
  }
  return <Footer />;
}

export function PublicSiteExtras() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <AccessibilityWidget />
      <BackgroundMusic />
      <BackToTop />
      <FloatingDonate />
    </>
  );
}
