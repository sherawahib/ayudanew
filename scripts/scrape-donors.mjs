import fs from "fs";

const r = await fetch("https://www.ayudamiami.org/donors/");
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

const startMarker = "The Norman Braman Philanthropic Fund Donates";
const endMarker = '<div class="sidebar';
const start = html.indexOf(startMarker);
const end = html.indexOf(endMarker, start);
const content = html.slice(start > 0 ? start - 400 : 0, end > start ? end : html.length);

const h3Regex = /<h3[^>]*>([\s\S]*?)<\/h3>/gi;
const matches = [...content.matchAll(h3Regex)];
const donors = [];

const skipTitles = /^(menu|search|donate now|follow us)$/i;

for (let i = 0; i < matches.length; i++) {
  const match = matches[i];
  const title = stripTags(match[1]);
  if (!title || title.length < 3 || skipTitles.test(title)) continue;

  const chunkStart = match.index + match[0].length;
  const chunkEnd = matches[i + 1]?.index ?? chunkStart + 6000;
  const chunk = content.slice(chunkStart, chunkEnd);
  const prevStart = Math.max(0, (match.index ?? 0) - 1500);
  const prevChunk = content.slice(prevStart, match.index ?? 0);

  const dateMatch = chunk.match(/<p>\s*<strong>([\s\S]*?)<\/strong>\s*<\/p>/i);
  let date = dateMatch ? stripTags(dateMatch[1]) : "";

  const paragraphs = [...chunk.matchAll(/<p>([\s\S]*?)<\/p>/gi)]
    .map((m) => stripTags(m[1]))
    .filter((p) => {
      if (!p || p.match(/^(read more|share|permalink)/i) || p.length > 2000) return false;
      if (p === date) return false;
      if (/^(January|February|March|April|May|June|July|August|September|October|November|December)\b/i.test(p) && p.length < 50) {
        return false;
      }
      return true;
    });

  let description = paragraphs.join(" ").trim();

  if (
    !date &&
    /^((January|February|March|April|May|June|July|August|September|October|November|December)[^!]*!)/i.test(
      description,
    )
  ) {
    const m = description.match(
      /^((?:January|February|March|April|May|June|July|August|September|October|November|December)[^!]*!)\s*/i,
    );
    if (m) {
      date = m[1].replace(/!$/, "").trim();
      description = description.slice(m[0].length).trim();
    }
  }

  const imgInPrev = prevChunk.match(/wp-content\/uploads\/([^"']+\.(?:jpg|jpeg|png|gif|webp))/i);
  const imgInChunk = chunk.match(/wp-content\/uploads\/([^"']+\.(?:jpg|jpeg|png|gif|webp))/i);
  const image = imgInPrev?.[1] ?? imgInChunk?.[1] ?? null;

  if (title.includes("Nascar") && description.includes("jordan")) {
    description =
      "The NASCAR Foundation donated $4,480 to support AYUDA programs serving children and families in Miami-Dade County.";
  }

  donors.push({ title, date, description, image });
}

fs.writeFileSync("scripts/donors-scraped.json", JSON.stringify(donors, null, 2));
console.log("TOTAL:", donors.length);
