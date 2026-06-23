import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sections = JSON.parse(fs.readFileSync("scripts/testimonials-scraped.json", "utf8"));

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function cleanQuote(quote) {
  return quote.replace(/^[“"]+/, "").replace(/[”"]+$/, "").trim();
}

const sectionLines = sections.map((section) => {
  const testimonialLines = section.testimonials.map((t) => {
    const parts = [`        quote:\n          "${esc(cleanQuote(t.quote))}",`];
    if (t.author) {
      parts.push(`        author: "${esc(t.author)}",`);
    }
    return `      {\n${parts.join("\n")}\n      }`;
  });
  return `  {\n    title: "${esc(section.title)}",\n    testimonials: [\n${testimonialLines.join(",\n")},\n    ],\n  }`;
});

const block = `export const TESTIMONIAL_SECTIONS = [\n${sectionLines.join(",\n")},\n];`;

const pageContentPath = path.join(__dirname, "..", "src", "lib", "page-content.ts");
const pageContent = fs.readFileSync(pageContentPath, "utf8");

let updated;
if (pageContent.includes("export const TESTIMONIAL_SECTIONS")) {
  updated = pageContent.replace(/export const TESTIMONIAL_SECTIONS = \[[\s\S]*?\];/, block);
} else {
  updated = `${pageContent.trim()}\n\n${block}\n`;
}

fs.writeFileSync(pageContentPath, updated);
console.log("Updated TESTIMONIAL_SECTIONS:", sections.length, "sections");
