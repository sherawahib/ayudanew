import fs from "node:fs";
import path from "node:path";

const BASE = "https://www.ayudamiami.org/wp-content/uploads";
const FILES = ["2021/04/mail.png", "2018/08/succes.bmp"];
const outRoot = path.join(process.cwd(), "public", "images");

for (const file of FILES) {
  const dest = path.join(outRoot, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (fs.existsSync(dest)) {
    console.log("skip", file);
    continue;
  }
  const response = await fetch(`${BASE}/${file}`);
  if (!response.ok) {
    throw new Error(`Failed ${file}: ${response.status}`);
  }
  fs.writeFileSync(dest, Buffer.from(await response.arrayBuffer()));
  console.log("saved", file);
}
