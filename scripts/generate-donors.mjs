import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const donors = JSON.parse(fs.readFileSync("scripts/donors-scraped.json", "utf8")).filter(
  (donor) => donor.title !== "December 2005 Newsletter",
);

const imageMap = {
  "The Norman Braman Philanthropic Fund Donates $10,000|May 15, 2018": null,
  "Kirk Foundation Donates $25,000|April 17, 2018": "2018/08/Kirk_Foundation_Logo.jpg",
  "Charity Services Centers Donates $1,990|": null,
  "Adriana & Manuel Gonzalez Trust Donates $4,000|December 18, 2017": null,
  "Target Foundation Donates $1,000|December 14, 2017": null,
  "Alliance for a Healthier Generation Donates $3,000|December 7, 2017":
    "2018/08/ahg-logo-main.jpg",
  "Batchelor Foundation Donates $10,000|December 4, 2017":
    "2018/08/batchelor-logo-main-125x80-1.jpg",
  "JeffreyGroup Donates $2,000|October 10, 2017": null,
  "Batchelor Foundation Donates $10,000|November 4th, 2016":
    "2018/08/batchelor-logo-main-125x80-1.jpg",
  "Cargill, Inc. Donates Turkeys to AYUDA’s Families for Thanksgiving|November 2nd, 2016":
    "2018/08/Cargill2-125x80.jpg",
  "Jeffrey Group Generously Donates $2,000|October 18th, 2016": "2018/08/JG-125x80.jpg",
  "Greater Miami and the Beaches Hotel Association Supports AYUDA’s Annual Toy Drive|October 17th, 2016":
    "2018/08/Hotel-Association-125x80.jpg",
  "Miami Beach Chamber of Commerce Supports AYUDA’s Annual Toy Drive|October 17th, 2016":
    "2018/08/MBCC-125x80.jpg",
  "Miami Beach Kids First Donates $5,000|August 1st, 2016": null,
};

for (const donor of donors) {
  if (donor.title.includes("Batchelor") && donor.date.includes("July 17th")) {
    donor.date = "July 17th, 2015";
    if (donor.description.startsWith("AMAZING NEWS!")) {
      donor.description = donor.description.replace(/^AMAZING NEWS!\s*/, "");
    }
  }

  const key = `${donor.title}|${donor.date}`;
  if (key in imageMap) {
    donor.image = imageMap[key];
  }

  if (
    donor.title === "Cargill, Inc. Donates Turkeys to AYUDA’s Families for Thanksgiving" &&
    !donor.description
  ) {
    donor.description =
      "Cargill generously provided turkeys to AYUDA families for Thanksgiving.";
  }

  if (
    donor.title ===
      "Greater Miami and the Beaches Hotel Association Supports AYUDA’s Annual Toy Drive" &&
    !donor.description
  ) {
    donor.description =
      "The Greater Miami and the Beaches Hotel Association supported AYUDA's annual toy drive.";
  }

  if (
    donor.title === "Miami Beach Chamber of Commerce Supports AYUDA’s Annual Toy Drive" &&
    donor.description.includes("Miami Beach Kids First")
  ) {
    donor.description = "";
  }
}

const outDir = path.join(__dirname, "..", "public", "images");
const uniqueImages = [...new Set(donors.map((d) => d.image).filter(Boolean))];

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
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log("downloaded", imagePath);
}

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const lines = donors.map((donor) => {
  const parts = [
    `    title: "${esc(donor.title)}",`,
    `    date: "${esc(donor.date)}",`,
  ];
  if (donor.image) {
    parts.push(`    image: img("${donor.image}"),`);
  }
  parts.push(`    description:\n      "${esc(donor.description)}",`);
  return `  {\n${parts.join("\n")}\n  }`;
});

const block = `export const DONOR_ENTRIES = [\n${lines.join(",\n")},\n];`;

const pageContentPath = path.join(__dirname, "..", "src", "lib", "page-content.ts");
const pageContent = fs.readFileSync(pageContentPath, "utf8");
const updated = pageContent.replace(
  /export const DONOR_ENTRIES = \[[\s\S]*?\];/,
  block,
);
fs.writeFileSync(pageContentPath, updated);
console.log("Updated DONOR_ENTRIES with", donors.length, "entries");
