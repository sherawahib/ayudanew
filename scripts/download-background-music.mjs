import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "audio");
const dest = path.join(outDir, "background-music.mp3");

if (fs.existsSync(dest)) {
  console.log("background-music.mp3 already exists");
  process.exit(0);
}

fs.mkdirSync(outDir, { recursive: true });

const url = "https://archive.org/download/CanonInD_261/CanoninD.mp3";

const res = await fetch(url);
if (!res.ok) {
  console.error("Failed to download background music", res.status);
  process.exit(1);
}

fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
console.log("Saved", dest);
