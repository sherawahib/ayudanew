import fs from "node:fs";

const r = await fetch("https://www.ayudamiami.org/funding/");
const html = await r.text();
fs.writeFileSync("scripts/funding.html", html);

const logoBlocks = [...html.matchAll(
  /<div class="vc_single_image-wrapper[^"]*">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi,
)];

const entries = [];
for (const block of html.matchAll(
  /<a\s+href="([^"]+)"[^>]*>[\s\S]*?<img[^>]+(?:data-lazy-src|src)="([^"]+)"[^>]*(?:alt="([^"]*)")?/gi,
)) {
  const href = block[1];
  const src = block[2];
  const alt = block[3] ?? "";
  if (!src.includes("/uploads/")) continue;
  if (href.includes("ayudamiami.org/funding")) continue;
  entries.push({ href, src, alt });
}

const unique = [];
const seen = new Set();
for (const e of entries) {
  const key = e.src.replace(/^https?:\/\/[^/]+/, "");
  if (seen.has(key)) continue;
  seen.add(key);
  unique.push(e);
}

console.log(JSON.stringify(unique, null, 2));
