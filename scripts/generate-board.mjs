import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { members, memoriam } = JSON.parse(
  fs.readFileSync("scripts/board-scraped.json", "utf8"),
);

function cleanImage(image) {
  if (!image) return null;
  return image.split(" ")[0].split(",")[0].trim();
}

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function cleanBio(bio) {
  return bio
    .replace(/The mission of AYUDA[\s\S]*$/, "")
    .replace(/&copy;[\s\S]*$/, "")
    .trim();
}

const activeMembers = members.filter(
  (m) => !m.heading.toUpperCase().includes("DEANNE CONNOLLY"),
);

const outDir = path.join(__dirname, "..", "public", "images");
const images = [
  ...new Set(
    [...activeMembers, memoriam]
      .map((m) => cleanImage(m.image))
      .filter(Boolean),
  ),
];

for (const imagePath of images) {
  const dest = path.join(outDir, ...imagePath.split("/"));
  if (fs.existsSync(dest)) continue;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const res = await fetch(
    `https://www.ayudamiami.org/wp-content/uploads/${imagePath}`,
  );
  if (!res.ok) {
    console.error("FAIL", imagePath, res.status);
    continue;
  }
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  console.log("downloaded", imagePath);
}

const memberLines = activeMembers.map((member) => {
  const image = cleanImage(member.image);
  const parts = [
    `    name: "${esc(member.heading)}",`,
    `    bio:\n      "${esc(cleanBio(member.bio))}",`,
  ];
  if (image) {
    parts.splice(1, 0, `    image: img("${image}"),`);
  }
  return `  {\n${parts.join("\n")}\n  }`;
});

const membersBlock = `export const BOARD_MEMBERS = [\n${memberLines.join(",\n")},\n];`;

const memImage = cleanImage(memoriam?.image);
const memoriamBlock = `export const BOARD_IN_MEMORIAM = {
  title: "${esc(memoriam?.title ?? "DEANNE CONNOLLY GRAHAM, BOARD CHAIR emeritus")}",
  image: img("${memImage ?? "2019/05/photo_deanne_graham-300x300.jpg"}"),
  bio: "${esc(cleanBio(memoriam?.bio ?? ""))}",
  legacyFundUrl: "https://www.ayudamiami.org/deanne-connolly-graham-legacy-fund/",
  legacyFundLabel: "DeAnne Connolly-Graham Legacy Fund",
};`;

const pageContentPath = path.join(__dirname, "..", "src", "lib", "page-content.ts");
let pageContent = fs.readFileSync(pageContentPath, "utf8");

pageContent = pageContent.replace(
  /export const BOARD_MEMBERS = \[[\s\S]*?\];/,
  membersBlock,
);

if (pageContent.includes("export const BOARD_IN_MEMORIAM")) {
  pageContent = pageContent.replace(
    /export const BOARD_IN_MEMORIAM = \{[\s\S]*?\};/,
    memoriamBlock,
  );
} else {
  pageContent = pageContent.replace(
    membersBlock,
    `${membersBlock}\n\n${memoriamBlock}`,
  );
}

fs.writeFileSync(pageContentPath, pageContent);
console.log("Updated", activeMembers.length, "board members + in memoriam");
