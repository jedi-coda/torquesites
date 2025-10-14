import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.join(__dirname, "..");
const cacheDir = path.join(root, ".next", "cache");

try {
  if (fs.existsSync(cacheDir)) {
    fs.rmSync(cacheDir, { recursive: true, force: true });
    console.log(`[clean-cache] Removed ${path.relative(root, cacheDir)}`);
  } else {
    console.log("[clean-cache] No .next/cache directory found; nothing to remove.");
  }
} catch (e) {
  console.warn("[clean-cache] Warning:", e?.message || e);
}


