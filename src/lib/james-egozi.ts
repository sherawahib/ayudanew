import { img } from "@/lib/images";

export const JAMES_EGOZI_STATS = [
  { value: "218", label: "Races" },
  { value: "37", label: "Wins" },
  { value: "73", label: "Podiums" },
  { value: "33.5%", label: "Podium Rate" },
] as const;

export const JAMES_EGOZI_DRIVER = {
  eyebrow: "Beyond the Track",
  title: "The Driver",
  paragraphs: [
    "James Egozi is a mature, high-performance athlete who understands the responsibility of representing global brands with absolute professionalism. Born in Miami and competing in Europe, he balances rigorous high-tech simulator training with a lifestyle that includes golf and fishing — naturally connecting with luxury, outdoor, and sports markets.",
    "He isn't just the future of motorsport; he is the perfect opportunity for brands that want to accelerate alongside a champion.",
  ],
  image: img("2026/06/james-egozi1.png"),
  imageAlt: "James Egozi",
} as const;

export const JAMES_EGOZI_CAREER = {
  eyebrow: "Built to Win",
  title: "Career",
  intro:
    "From karting victories in Las Vegas to Formula podiums across Europe — a career defined by consistent results on the world's most competitive grids.",
  image: img("2026/06/james.jpg"),
  imageAlt: "James Egozi racing",
  items: [
    {
      year: "2026",
      title: "EuroCup3 — Spanish Winter Championship",
      results: "1st Algarve · 1st Algarve Sprint · 1st Jarama",
      badge: "3 Wins",
    },
    {
      year: "2025",
      title: "EuroCup3 Championship",
      results: "1st Algarve · 4th Spa · 4th Monza · 4th Paul Ricard · 5th Red Bull Ring",
      badge: "1 Win",
    },
    {
      year: "2025",
      title: "EuroCup3 — Spanish Winter Championship",
      results: "1st Motorland Aragon · 1st Algarve",
      badge: "2 Wins",
    },
    {
      year: "2024",
      title: "F4 Spanish Championship & Winter Series",
      results: "1st Motorland Aragon · 2nd Barcelona · 2nd & 3rd Paul Ricard",
      badge: "1 Win",
    },
    {
      year: "2023",
      title: "F4 Italian & CEZ Championship",
      results: "1st CEZ Red Bull Ring · 5th Italian (2nd Rookie) · 7th Italian (3rd Rookie)",
      badge: "Champion",
    },
    {
      year: "2021–23",
      title: "International Karting — WSK & FIA European",
      results: "WSK Super Master wins · FIA European pole positions · WSK Open Cup victories",
      badge: "Multiple Wins",
    },
    {
      year: "2018",
      title: "Karting — USA Nationals",
      results: "ROK the Rio (Las Vegas) · ROK Festival · Rotax Grand Nationals",
      badge: "Triple Champion",
    },
  ],
} as const;

export const JAMES_EGOZI_PARTNERSHIP = {
  eyebrow: "Your Brand in Motion",
  title: "Partnership",
  intro:
    "We don't just deliver a sticker on a car. We create a living partnership — real visibility, digital campaigns, and presence at the paddock on Europe's densest grids.",
  tiers: [
    {
      tier: "Tier 01",
      name: "Investor / Brand Partner",
      features: [
        "Primary car branding (nose & sidepod)",
        "Race suit & helmet logo",
        "Exclusive digital campaigns",
        "Paddock hospitality access",
        "James as brand ambassador",
        "Corporate event appearances",
      ],
    },
    {
      tier: "Tier 02",
      name: "Title Sponsor",
      features: [
        "Prominent car placement",
        "Race suit branding",
        "Social media features",
        "Paddock presence",
      ],
    },
    {
      tier: "Tier 04",
      name: "Supporting Sponsor",
      features: ["Car logo placement", "Digital presence", "No amount too small"],
    },
  ],
} as const;

export const JAMES_EGOZI_COMMUNITY_EDUCATION = {
  eyebrow: "Learn the Sport",
  title: "Community Education",
  intro:
    "Articles, insights, and behind-the-scenes knowledge — from racing theory to career paths in motorsport. New posts added periodically.",
} as const;

export const JAMES_EGOZI_VIDEO = {
  title: "Portimao 2026 | EUROCUP-3",
  embedUrl: "https://www.youtube.com/embed/0CRUeWt8pCI",
  watchUrl: "https://www.youtube.com/watch?v=0CRUeWt8pCI",
} as const;

export const JAMES_EGOZI_SOCIAL = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/jamesegozi/",
    icon: "facebook" as const,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/jamesegozi/",
    icon: "instagram" as const,
  },
] as const;

export const JAMES_EGOZI_SECTION_LINKS = [
  { label: "The Driver", href: "#driver" },
  { label: "Career", href: "#career" },
  { label: "Partnership", href: "#partnership" },
  { label: "Community Education", href: "#community-education" },
] as const;
