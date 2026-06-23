import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const srcDir = path.join(root, "src");
const outDir = path.join(root, "public", "images");

const REMOTE_BASES = [
  "https://www.ayudamiami.org/wp-content/uploads/",
  "https://ayudamiami.org/wp-content/uploads/",
];

function collectPaths() {
  const paths = new Set();

  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!/\.(tsx?|ts|jsx?|js)$/.test(entry.name)) continue;

      const content = fs.readFileSync(full, "utf8");
      for (const match of content.matchAll(/img\(["']([^"']+)["']\)/g)) {
        paths.add(match[1]);
      }
      for (const match of content.matchAll(
        /https?:\/\/(?:www\.)?ayudamiami\.org\/wp-content\/uploads\/([^"')\s]+)/g,
      )) {
        paths.add(match[1]);
      }
    }
  };

  walk(srcDir);
  return [...paths].sort();
}

async function download(pathKey) {
  const dest = path.join(outDir, ...pathKey.split("/"));
  if (fs.existsSync(dest)) {
    return { pathKey, status: "skip" };
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });

  let lastError = null;
  for (const base of REMOTE_BASES) {
    const url = base + pathKey;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buf);
      return { pathKey, status: "ok" };
    } catch (error) {
      lastError = error;
    }
  }

  return { pathKey, status: "fail", error: lastError };
}

async function runPool(items, concurrency, worker) {
  const results = [];
  let index = 0;

  async function next() {
    while (index < items.length) {
      const current = index++;
      results[current] = await worker(items[current]);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, next));
  return results;
}

const paths = collectPaths();
console.log(`Downloading ${paths.length} images to public/images/`);

const results = await runPool(paths, 6, download);
const ok = results.filter((r) => r.status === "ok").length;
const skip = results.filter((r) => r.status === "skip").length;
const failed = results.filter((r) => r.status === "fail");

console.log(`Done: ${ok} downloaded, ${skip} skipped, ${failed.length} failed`);
for (const item of failed) {
  console.error(`  FAIL ${item.pathKey}: ${item.error}`);
}

if (failed.length > 0) process.exit(1);
