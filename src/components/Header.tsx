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
      <div className="container-ayuda max-w-7xl">
        <div className="flex min-h-[80px] items-center justify-between gap-3">
          <Link href="/" className="shrink-0 py-3">
            <Image
              src={SITE.logo}
              alt={SITE.name}
              width={180}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-xl lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="sr-only">Menu</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            </svg>
          </button>

          <nav className="hidden min-w-0 flex-1 lg:block">
            <ul className="flex flex-nowrap items-center justify-end">
              {NAV_ITEMS.map((item) => (
                <li key={item.label} className="group relative shrink-0">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 whitespace-nowrap px-2 py-6 text-[12px] font-medium uppercase tracking-wide transition-colors hover:text-ayuda-blue xl:px-2.5 xl:text-[13px] ${
                      isActive(item.href) ? "text-ayuda-blue" : "text-black"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.children && (
                      <svg
                        className="mt-0.5 h-3 w-3 opacity-60"
                        viewBox="0 0 10 6"
                        fill="currentColor"
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
                  className="flex items-center gap-1.5 whitespace-nowrap px-2 py-6 text-[12px] font-medium text-black transition-colors hover:text-ayuda-blue xl:px-2.5 xl:text-[13px]"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.6 10.8c1.5 2.9 3.7 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.6 22 2 13.4 2 3c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                  </svg>
                  {SITE.phone}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-black/10 bg-white lg:hidden">
          <ul className="divide-y divide-black/5">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`block px-5 py-3 text-sm font-medium uppercase ${
                    isActive(item.href) ? "text-ayuda-blue" : "text-black"
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="border-t border-black/5 bg-black/[0.02]">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-8 py-2.5 text-sm text-ayuda-gray"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li>
              <Link href={SITE.phoneHref} className="block px-5 py-3 text-sm font-medium">
                {SITE.phone}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
