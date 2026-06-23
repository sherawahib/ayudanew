import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "images");

const files = [
  "2025/09/Sabor-Latino-A-Celebration-of-Heritage_opt.mp4",
  "revslider/video-media/Sabor-Latino-A-Celebration-of-Heritage_opt_22_layer3.jpeg",
  "2021/08/logo.png",
];

for (const fileKey of files) {
  const dest = path.join(outDir, ...fileKey.split("/"));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const url = `https://www.ayudamiami.org/wp-content/uploads/${fileKey}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error("FAIL", fileKey, res.status);
    process.exit(1);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log("ok", fileKey, buf.length);
}
