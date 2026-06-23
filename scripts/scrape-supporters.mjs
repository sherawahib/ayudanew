import fs from "node:fs";

const r = await fetch("https://www.ayudamiami.org/supporters/");
const html = await r.text();
fs.writeFileSync("scripts/supporters.html", html);

const entries = [];
for (const block of html.matchAll(
  /<a\s+href="([^"]+)"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]*(?:title="([^"]*)")?/gi,
)) {
  const href = block[1];
  const src = block[2];
  const title = block[3] ?? "";
  if (!src.includes("/uploads/")) continue;
  if (href === "/" || href.includes("favicon")) continue;
  entries.push({ href, src, title });
}

console.log(JSON.stringify(entries, null, 2));
