"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import { NAV_ITEMS, SITE } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "#") return false;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-black/5 bg-white transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <TopBar />
      <div className="container-ayuda">
        {/* Logo row */}
        <div className="flex items-center justify-between gap-3 py-2 sm:py-3">
          <Link href="/" className="shrink-0">
            <Image
              src={SITE.logo}
              alt={SITE.name}
              width={540}
              height={180}
              className="h-[88px] w-auto sm:h-[104px] xl:h-[120px] 2xl:h-[144px]"
              priority
            />
          </Link>

          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-xl xl:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 105.7 7.11L10.59 12 5.7 16.89a1 1 0 101.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop nav — own row below logo so items never overlap */}
        <nav className="hidden border-t border-black/5 xl:block">
          <ul className="flex flex-wrap items-center justify-center gap-x-0.5 gap-y-1 2xl:justify-end">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="group relative shrink-0">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 whitespace-nowrap px-2 py-3 text-[11px] font-medium uppercase tracking-wide transition-colors hover:text-ayuda-blue 2xl:px-2.5 2xl:py-3.5 2xl:text-[12px] ${
                    isActive(item.href) ? "text-ayuda-blue" : "text-black"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.children && (
                    <svg
                      className="mt-0.5 h-3 w-3 opacity-60"
                      viewBox="0 0 10 6"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M0 0l5 6 5-6H0z" />
                    </svg>
                  )}
                </Link>

                {item.children && (
                  <div className="invisible absolute left-0 top-full z-50 min-w-[280px] border border-black/10 bg-white opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                    <ul className="py-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-5 py-2.5 text-[13px] leading-snug text-black transition-colors hover:bg-black/5 hover:text-ayuda-blue"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
            <li className="shrink-0">
              <Link
                href={SITE.phoneHref}
                className="flex items-center gap-1.5 whitespace-nowrap px-2 py-3 text-[11px] font-medium text-black transition-colors hover:text-ayuda-blue 2xl:px-2.5 2xl:py-3.5 2xl:text-[12px]"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M6.6 10.8c1.5 2.9 3.7 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.6 22 2 13.4 2 3c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                </svg>
                {SITE.phone}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {mobileOpen && (
        <nav className="max-h-[calc(100dvh-8rem)] overflow-y-auto border-t border-black/10 bg-white xl:hidden">
          <ul className="divide-y divide-black/5">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <div>
                    <p className="px-5 py-3 text-sm font-medium uppercase text-black">{item.label}</p>
                    <ul className="border-t border-black/5 bg-black/[0.02]">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`block px-8 py-2.5 text-sm ${
                              isActive(child.href) ? "text-ayuda-blue" : "text-ayuda-gray"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-5 py-3 text-sm font-medium uppercase ${
                      isActive(item.href) ? "text-ayuda-blue" : "text-black"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <Link href={SITE.phoneHref} className="block px-5 py-3 text-sm font-medium">
                {SITE.phone}
              </Link>
            </li>
            <li>
              <Link href="/donors/sign-in" className="block px-5 py-3 text-sm font-medium text-ayuda-blue">
                Donor Login
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
