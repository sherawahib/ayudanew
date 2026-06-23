import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import SocialIcon from "@/components/SocialIcon";
import { img } from "@/lib/images";
import { FOOTER_LINKS, SITE, SOCIAL_LINKS } from "@/lib/site";

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h5 className="mb-5 font-[family-name:var(--font-lora)] text-lg text-[#0f2d52] after:mt-3 after:block after:h-0.5 after:w-10 after:bg-ayuda-blue after:content-['']">
      {children}
    </h5>
  );
}

function ContactItem({
  icon,
  children,
  href,
}: {
  icon: React.ReactNode;
  children: ReactNode;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3 text-sm leading-relaxed text-[#3f4f63]">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ayuda-blue/10 text-ayuda-blue">
        {icon}
      </span>
      <span>{children}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="group block transition-colors hover:text-ayuda-blue">
        {content}
      </a>
    );
  }

  return content;
}

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden">
      {/* Top accent wave */}
      <div className="footer-wave h-3 bg-gradient-to-r from-ayuda-blue via-[#00b388] to-ayuda-blue-dark" />

      {/* Main footer */}
      <div className="footer-pattern relative bg-[#f4f8fc]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-ayuda-blue/[0.04]" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#00b388]/[0.06]" />

        <div className="container-ayuda relative py-12 sm:py-14 md:py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Brand column */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block">
                <Image
                  src={SITE.logo}
                  alt={SITE.name}
                  width={170}
                  height={56}
                  className="mb-6 h-12 w-auto"
                />
              </Link>
              <p className="max-w-sm text-sm leading-relaxed text-[#3f4f63]">
                The mission of AYUDA is to help improve the lives of children and
                families who are underserved and / or at risk in South Florida through
                education, life skills training, and programs that support self
                sufficiency.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Image
                  src={img("2025/07/gold-transparency-25.png")}
                  alt="Gold Transparency 2025"
                  width={113}
                  height={121}
                  className="h-auto w-[88px] drop-shadow-sm"
                />
                <div className="rounded-lg border border-ayuda-blue/15 bg-white px-4 py-3 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-ayuda-blue">
                    Since 1977
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-lora)] text-sm text-[#0f2d52]">
                    Helping Miami families thrive
                  </p>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-3">
              <FooterHeading>Important Links</FooterHeading>
              <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-1">
                {FOOTER_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center gap-2 py-1.5 text-sm text-[#3f4f63] transition-colors hover:text-ayuda-blue"
                  >
                    <svg
                      className="h-3 w-3 shrink-0 text-ayuda-blue/40 transition-all group-hover:translate-x-0.5 group-hover:text-ayuda-blue"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3">
              <FooterHeading>Get In Touch</FooterHeading>
              <div className="space-y-4">
                <ContactItem
                  href={SITE.phoneHref}
                  icon={
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M6.6 10.8c1.5 2.9 3.7 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V21c0 .6-.4 1-1 1C10.6 22 2 13.4 2 3c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                    </svg>
                  }
                >
                  {SITE.phone}
                </ContactItem>
                <ContactItem
                  icon={
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                    </svg>
                  }
                >
                  {SITE.address}
                </ContactItem>
                <Link
                  href={SITE.donatePageUrl}
                  className="mt-2 inline-flex items-center gap-2 bg-ayuda-blue px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] !text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-ayuda-blue-dark hover:shadow-lg"
                >
                  Donate Today
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Social */}
            <div className="lg:col-span-2">
              <FooterHeading>Follow Us</FooterHeading>
              <p className="mb-5 text-sm leading-relaxed text-[#3f4f63]">
                Stay connected with Ayuda Miami and see the impact in our community.
              </p>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="footer-social-btn flex h-11 w-11 items-center justify-center rounded-xl border border-ayuda-blue/15 bg-white text-ayuda-blue shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ayuda-blue hover:bg-ayuda-blue hover:text-white hover:shadow-md"
                  >
                    <SocialIcon icon={social.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#0c2340] text-white">
        <div className="container-ayuda flex flex-col items-center justify-between gap-4 py-5 md:flex-row">
          <p className="text-center text-xs text-white/70 md:text-left">
            &copy; 1977–{new Date().getFullYear()} AYUDA Miami. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/60">
            <Link href="/about-us" className="transition-colors hover:text-white">
              About
            </Link>
            <span className="hidden text-white/30 sm:inline">|</span>
            <Link href="/contact-us" className="transition-colors hover:text-white">
              Contact
            </Link>
            <span className="hidden text-white/30 sm:inline">|</span>
            <Link href="/programs" className="transition-colors hover:text-white">
              Programs
            </Link>
          </div>
          <div className="flex gap-2">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={`bottom-${social.href}`}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-ayuda-blue"
              >
                <SocialIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
