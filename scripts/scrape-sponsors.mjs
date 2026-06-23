import fs from "node:fs";

const r = await fetch("https://www.ayudamiami.org/sponsors/");
const html = await r.text();
fs.writeFileSync("scripts/sponsors.html", html);

const entries = [];
for (const block of html.matchAll(
  /<a\s+href="([^"]+)"[^>]*target="_blank"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]*(?:title="([^"]*)")?/gi,
)) {
  const href = block[1];
  const src = block[2];
  const title = block[3] ?? "";
  if (!src.includes("/uploads/")) continue;
  entries.push({ href, src, title });
}

// Also unlinked images in sponsor content area
const unlinked = [];
for (const block of html.matchAll(
  /<div class="vc_single_image-wrapper[^"]*">\s*<img[^>]+src="([^"]+)"[^>]*(?:title="([^"]*)")?/gi,
)) {
  const src = block[1];
  const title = block[2] ?? "";
  if (!src.includes("/uploads/")) continue;
  unlinked.push({ src, title });
}

console.log("LINKED:", JSON.stringify(entries, null, 2));
console.log("\nUNLINKED COUNT:", unlinked.length);
