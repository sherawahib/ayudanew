import fs from "node:fs";
import path from "node:path";

const BASE = "https://www.ayudamiami.org/wp-content/uploads";
const FILES = [
  "2022/10/magnificent-legacy-1024x609.jpg",
  "2022/10/magnificent-legacy-2.jpg",
  "2022/10/magnificent-legacy-3.jpg",
  "2022/10/magnificent-legacy-4.jpg",
  "2022/10/magnificent-legacy-5.jpg",
  "2022/10/magnificent-legacy-6.jpg.png",
];

const outRoot = path.join(process.cwd(), "public", "images");

for (const file of FILES) {
  const url = `${BASE}/${file}`;
  const dest = path.join(outRoot, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });

  if (fs.existsSync(dest)) {
    console.log("skip", file);
    continue;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed ${url}: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(dest, buffer);
  console.log("saved", file);
}
