import fs from "fs";

const r = await fetch("https://www.ayudamiami.org/deanne-connolly-graham-legacy-fund/");
const html = await r.text();
fs.writeFileSync("scripts/legacy-fund.html", html);

const uploads = [...new Set([...html.matchAll(/wp-content\/uploads\/[^"'\s)]+/g)].map((m) => m[0]))];
const iframes = [...html.matchAll(/<iframe[^>]+src="([^"]+)"/g)].map((m) => m[1]);
const headings = [...html.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)]
  .map((m) => m[1].replace(/<[^>]+>/g, "").trim())
  .filter(Boolean);
const paras = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
  .map((m) => m[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim())
  .filter((t) => t.length > 25 && !t.includes("function") && !t.includes("wp-"));

const contentStart = html.indexOf("DeAnne Connolly Graham Legacy Fund");
const chunk = html.slice(contentStart, contentStart + 15000);

console.log("HEADINGS:", headings);
console.log("\nPARAS:");
for (const p of paras.slice(0, 15)) console.log("-", p);
console.log("\nIFRAMES:", iframes);
console.log("\nUPLOADS:", uploads.filter((u) => /deanne|legacy|graham|2019|2021|2022/i.test(u)));

const out = { headings, paragraphs: paras.slice(0, 20), iframes, uploads: uploads.filter((u) => /deanne|legacy|graham|2019|2020|2021|2022|2023|jpeg|jpg|png|mp4/i.test(u)) };
fs.writeFileSync("scripts/legacy-fund-scraped.json", JSON.stringify(out, null, 2));
