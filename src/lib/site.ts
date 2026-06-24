import { img } from "@/lib/images";
import { versionedAsset } from "@/lib/assets";
import { HERO_BACKGROUND_VIDEO } from "@/lib/hero";

export const SITE = {
  name: "Ayuda Miami",
  tagline: "Helping Families Since 1977",
  phone: "(305) 864-6885",
  phoneHref: "tel:305-864-6885",
  email: "info@ayudamiami.org",
  address: "11098 Biscayne Blvd, 4th floor, North Miami, FL 33161",
  donateUrl: "/donate",
  donatePageUrl: "/donate",
  legacyFundUrl: "/deanne-connolly-graham-legacy-fund",
  backgroundMusic: versionedAsset("/audio/background-music.mp3"),
  logo: img("2018/11/ayuda_logo_new.png"),
  favicon: img("2018/11/favicon.png"),
};

export const AUCTION_URL =
  "https://ayudamiami.auctions.networkforgood.com/auctions/ayuda-s-online-auction";

export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/AyudaMiami/",
    icon: "instagram",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/ayudamiami",
    icon: "facebook",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ayuda-inc",
    icon: "linkedin",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/user/AyudaFoundation",
    icon: "youtube",
  },
];

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about-us",
    children: [
      { label: "Board Of Directors", href: "/board-of-directors" },
      { label: "Staff", href: "/staff" },
    ],
  },
  {
    label: "Programs",
    href: "/programs",
    children: [
      {
        label: "Here for You, Miami Beach Safety Net Program",
        href: "/programs/here-for-you",
      },
      {
        label: "Afterschool Enrichment Program/ TALL (Teenagers are Lifelong Learners)",
        href: "/programs/tall",
      },
      {
        label: "Miami Dade County Public Schools Mental Health Counseling Services",
        href: "/programs/mental-health",
      },
    ],
  },
  { label: "Ambassador", href: "/ambassador" },
  { label: "Events", href: "/events" },
  { label: "Supporters", href: "/supporters" },
  {
    label: "History",
    href: "#",
    children: [
      { label: "Donors", href: "/donors" },
      { label: "FUNDERS", href: "/funding" },
      { label: "Sponsors", href: "/sponsors" },
    ],
  },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact-us" },
];

export const FOOTER_LINKS = [
  { label: "Programs", href: "/programs" },
  { label: "Board Of Directors", href: "/board-of-directors" },
  { label: "Donors", href: "/donors" },
  { label: "Events", href: "/events" },
  { label: "Ambassador", href: "/ambassador" },
  { label: "Staff", href: "/staff" },
  { label: "About us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];

export const HOME_CARDS = [
  {
    title: "Supporters",
    href: "/supporters",
    image: img("2018/07/image_donors.jpg"),
  },
  {
    title: "Events",
    href: "/events",
    image: img("2018/07/image_events.jpg"),
  },
  {
    title: "Programs",
    href: "/programs",
    image: img("2023/06/Program.png"),
  },
  {
    title: "Board of Directors",
    href: "/board-of-directors",
    image: img("2016/08/image-5.jpg"),
  },
];

export const AMBASSADOR_HERO_IMAGE = img("2026/06/aa.webp");

export type HeroButtonVariant = "gray" | "gray-bloom" | "outline" | "primary" | "ghost";

export type HeroSlide = {
  id: string;
  kind: "image" | "mayor" | "legacy" | "brighter" | "cloud";
  alt: string;
  image?: string;
  bgColor?: string;
  video?: { mp4: string; poster: string };
  backgroundVideo?: string;
  title?: string;
  subtitle?: string;
  logo?: string;
  objectPosition?: string;
  buttons: { label: string; href: string; variant: HeroButtonVariant }[];
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "clouds",
    kind: "cloud",
    alt: "Clouds",
    backgroundVideo: HERO_BACKGROUND_VIDEO,
    subtitle:
      "Please give to this one of a kind organization – no amount is too small",
    buttons: [
      {
        label: "DeAnne Connolly Graham Legacy Fund",
        href: SITE.legacyFundUrl,
        variant: "primary",
      },
      {
        label: "Auction Now",
        href: AUCTION_URL,
        variant: "primary",
      },
    ],
  },
];

export const HOME_VIDEOS = [
  {
    id: "covid-help",
    title: "Ayuda is here to help during COVID-19",
    embedUrl: "https://www.youtube.com/embed/J3zNG56no-Q",
  },
  {
    id: "tito-puente",
    title: "ayuda message by tito puente jr",
    embedUrl: "https://www.youtube.com/embed/S_zQ0SJIEqo",
  },
];
