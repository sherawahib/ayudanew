import type { Metadata } from "next";
import Footer from "@/components/Footer";
import BackgroundMusic from "@/components/BackgroundMusic";
import Header from "@/components/Header";
import AuthSessionProvider from "@/components/providers/AuthSessionProvider";
import { BackToTop, FloatingDonate } from "@/components/SiteChrome";
import { SITE } from "@/lib/site";
import "./globals.css";

const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&family=Lora:wght@400;500;600;700&family=Catamaran:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "AYUDA helps improve the lives of children and families who are underserved and at risk in South Florida through education, life skills training, and programs that support self sufficiency.",
  icons: {
    icon: SITE.favicon,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href={GOOGLE_FONTS_URL} rel="stylesheet" />
      </head>
      <body className="min-h-full bg-white text-black antialiased" id="top">
        <AuthSessionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackgroundMusic />
          <BackToTop />
          <FloatingDonate />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
