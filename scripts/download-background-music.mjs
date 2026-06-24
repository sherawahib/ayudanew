import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "audio");
const dest = path.join(outDir, "background-music.mp3");

// Cheerful Happy Upbeat Uplifting — royalty-free instrumental (Free Music / SoundCloud via Archive.org)
const url = "https://archive.org/download/soundcloud-554872557/554872557.mp3";

fs.mkdirSync(outDir, { recursive: true });

const res = await fetch(url);
if (!res.ok) {
  console.error("Failed to download background music", res.status);
  process.exit(1);
}

fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
console.log("Saved", dest);
