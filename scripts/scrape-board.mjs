import fs from "fs";

const r = await fetch("https://www.ayudamiami.org/board-of-directors/");
const html = await r.text();

function decode(s) {
  return s
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(s) {
  return decode(s.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, " "));
}

const start = html.indexOf("Diana Susi");
const end = html.indexOf("sidebar", start);
const content = html.slice(start > 0 ? start - 500 : 0, end > start ? end : html.length);

const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
const matches = [...content.matchAll(h2Regex)];

const members = [];
for (let i = 0; i < matches.length; i++) {
  const heading = stripTags(matches[i][1]);
  const chunkStart = matches[i].index + matches[i][0].length;
  const chunkEnd = matches[i + 1]?.index ?? content.length;
  const chunk = content.slice(chunkStart, chunkEnd);
  const prevStart = Math.max(0, (matches[i].index ?? 0) - 1200);
  const prevChunk = content.slice(prevStart, matches[i].index ?? 0);

  const bio = [...chunk.matchAll(/<p>([\s\S]*?)<\/p>/gi)]
    .map((m) => stripTags(m[1]))
    .filter((p) => p && p.length > 10)
    .join(" ");

  const imgMatch =
    prevChunk.match(/wp-content\/uploads\/([^"']+\.(?:jpg|jpeg|png|gif|webp))/i) ||
    chunk.match(/wp-content\/uploads\/([^"']+\.(?:jpg|jpeg|png|gif|webp))/i);

  members.push({
    heading,
    bio,
    image: imgMatch?.[1] ?? null,
  });
}

// Check for In Memoriam section
const memoriamIdx = html.indexOf("In Memoriam");
let memoriam = null;
if (memoriamIdx > 0) {
  const memSlice = html.slice(memoriamIdx, memoriamIdx + 3000);
  const memH2 = [...memSlice.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
  if (memH2[0]) {
    const title = stripTags(memH2[0][1]);
    const after = memSlice.slice(memH2[0].index + memH2[0][0].length);
    const memBio = [...after.matchAll(/<p>([\s\S]*?)<\/p>/gi)]
      .map((m) => stripTags(m[1]))
      .filter((p) => p && p.length > 10)
      .join(" ");
    const memImg = memSlice.match(/wp-content\/uploads\/([^"']+\.(?:jpg|jpeg|png|gif|webp))/i);
    memoriam = { title, bio: memBio, image: memImg?.[1] ?? null };
  }
}

fs.writeFileSync("scripts/board-scraped.json", JSON.stringify({ members, memoriam }, null, 2));
console.log("Members:", members.length);
members.forEach((m) => console.log("-", m.heading.slice(0, 60)));
if (memoriam) console.log("Memoriam:", memoriam.title);
