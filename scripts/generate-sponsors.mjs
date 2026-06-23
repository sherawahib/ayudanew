import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tiers = JSON.parse(fs.readFileSync("scripts/sponsors-scraped.json", "utf8"));

const altMap = {
  "2018/08/batchelor-logo-300x64.jpg": "The Batchelor Foundation",
  "2018/08/bremen-125x80.png": "Bremen",
  "2018/08/kkskl-1.jpg": "KKSKL",
  "2019/03/JeffreyGroup-Logo-Purple-Text-No-Background.png": "Jeffrey Group",
  "2018/08/LATAM-e1361819015919-300x94.jpg": "LATAM",
  "2018/08/nascar-logo-main-125x80.jpg": "NASCAR Foundation",
  "2018/08/macys.png": "Macy's",
  "2018/08/lamborghini.gif": "Lamborghini",
  "2018/08/td-foundation.png": "TD Charitable Foundation",
  "2018/08/prestige.gif": "Prestige",
  "2018/08/BJsCharitableFoundationClr.jpg": "BJ's Charitable Foundation",
  "2018/08/ahg-logo-main.jpg": "Alliance for a Healthier Generation",
  "2018/08/doubletree-logo-main-125x80.jpg": "Doubletree",
  "2018/08/isabelallende-logo-125x80.png": "Isabel Allende Foundation",
  "2018/08/alex_and_ani-250x250.jpg": "Alex and Ani",
  "2018/08/PWP-Logo-clear-sig1-e1340738164823.jpg": "PWP",
  "2018/08/mount.png": "Mount Sinai Medical Center",
  "2018/08/lush-logo-main-125x80.jpg": "LUSH",
  "2018/08/miamibeach.gif": "City of Miami Beach",
  "2019/04/miami-beach-life-magazine-logo.jpg": "Miami Beach Life Magazine",
  "2019/04/Ocean-Terrace-Holdings-logo.png": "Ocean Terrace Holdings",
  "2019/04/seaworld-logo.jpg": "SeaWorld",
  "2019/04/Disney-Parks-logo.jpg": "Disney Parks",
  "2019/04/show-tech-inc-logo.jpg": "Show Tech Inc",
  "2018/08/deauville.png": "Deauville Beach Resort",
  "2025/07/gold-transparency-25.png": "Candid Gold Transparency",
};

const outDir = path.join(__dirname, "..", "public", "images");
const uniqueImages = [
  ...new Set(tiers.flatMap((t) => t.sponsors.map((s) => s.image))),
];

for (const imagePath of uniqueImages) {
  const dest = path.join(outDir, ...imagePath.split("/"));
  if (fs.existsSync(dest)) continue;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const url = `https://www.ayudamiami.org/wp-content/uploads/${imagePath}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error("FAIL download", imagePath, res.status);
    continue;
  }
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  console.log("downloaded", imagePath);
}

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const tierLines = tiers.map((tier) => {
  const sponsorLines = tier.sponsors.map((sponsor) => {
    const alt = altMap[sponsor.image] ?? sponsor.alt;
    return `      { src: img("${sponsor.image}"), alt: "${esc(alt)}" }`;
  });
  return `  {\n    title: "${esc(tier.tier)}",\n    logos: [\n${sponsorLines.join(",\n")},\n    ],\n  }`;
});

const block = `export const SPONSOR_TIERS = [\n${tierLines.join(",\n")},\n];`;

const pageContentPath = path.join(__dirname, "..", "src", "lib", "page-content.ts");
const pageContent = fs.readFileSync(pageContentPath, "utf8");

const flatLogos = tiers.flatMap((t) =>
  t.sponsors.map((s) => ({
    image: s.image,
    alt: altMap[s.image] ?? s.alt,
  })),
);
const flatLines = flatLogos.map(
  (s) => `  { src: img("${s.image}"), alt: "${esc(s.alt)}" }`,
);
const flatBlock = `export const SPONSOR_LOGOS = [\n${flatLines.join(",\n")},\n];`;

let updated = pageContent.replace(
  /export const SPONSOR_LOGOS = \[[\s\S]*?\];/,
  flatBlock,
);

if (updated.includes("export const SPONSOR_TIERS")) {
  updated = updated.replace(/export const SPONSOR_TIERS = \[[\s\S]*?\];/, block);
} else {
  updated = updated.replace(flatBlock, `${flatBlock}\n\n${block}`);
}

fs.writeFileSync(pageContentPath, updated);
console.log("Updated sponsors:", uniqueImages.length, "logos in", tiers.length, "tiers");
