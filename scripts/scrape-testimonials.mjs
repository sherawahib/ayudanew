import fs from "fs";

const r = await fetch("https://www.ayudamiami.org/testimonials/");
const html = await r.text();

function decode(s) {
  return s
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripTags(s) {
  return decode(s.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, " "));
}

const start = html.indexOf("Early Childhood Education Parenting Program");
const end = html.indexOf("<footer", start);
const content = html.slice(start > 0 ? start - 300 : 0, end > start ? end : html.length);

const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
const h2Matches = [...content.matchAll(h2Regex)];

const sections = [];

for (let i = 0; i < h2Matches.length; i++) {
  const title = stripTags(h2Matches[i][1]);
  if (!title) continue;

  const chunkStart = h2Matches[i].index + h2Matches[i][0].length;
  const chunkEnd = h2Matches[i + 1]?.index ?? content.length;
  const chunk = content.slice(chunkStart, chunkEnd);

  const paragraphs = [...chunk.matchAll(/<p>([\s\S]*?)<\/p>/gi)]
    .map((m) => stripTags(m[1]))
    .filter(Boolean);

  const testimonials = [];
  for (const p of paragraphs) {
    if (/mission of AYUDA|rights reserved|©/i.test(p)) continue;

    const isAuthor =
      p.length < 60 &&
      !p.includes("?") &&
      (p === "Elizabeth" ||
        p.includes("Family") ||
        (!p.includes(".") && !p.includes("!") && p.split(" ").length <= 5));

    if (isAuthor && testimonials.length > 0 && !testimonials[testimonials.length - 1].author) {
      testimonials[testimonials.length - 1].author = p;
      continue;
    }

    if (p.length < 20) continue;

    testimonials.push({ quote: p, author: "" });
  }

  if (testimonials.length > 0) {
    sections.push({ title, testimonials });
  }
}

fs.writeFileSync("scripts/testimonials-scraped.json", JSON.stringify(sections, null, 2));
let total = 0;
for (const s of sections) {
  console.log(`${s.title}: ${s.testimonials.length}`);
  total += s.testimonials.length;
}
console.log("TOTAL:", total);
