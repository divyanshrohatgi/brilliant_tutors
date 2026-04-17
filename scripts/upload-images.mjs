/**
 * Upload images to Cloudinary.
 *
 * Usage:
 *   node scripts/upload-images.mjs <folder>
 *
 * Examples:
 *   node scripts/upload-images.mjs images/
 *   node scripts/upload-images.mjs images/blog/
 *
 * All image files (jpg, jpeg, png, webp, avif, gif, svg) in the given folder
 * are uploaded to Cloudinary under the `brilliant-tutors/` prefix.
 * The public_id is derived from the filename (without extension).
 *
 * Requires CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 * to be set in .env.local or as environment variables.
 */

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Load .env.local manually (Next.js doesn't load it for plain node scripts)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"]);
const CDN_PREFIX = "brilliant-tutors";

const folder = process.argv[2] ?? "images";
const absFolder = path.resolve(__dirname, "../", folder);

if (!fs.existsSync(absFolder)) {
  console.error(`Folder not found: ${absFolder}`);
  process.exit(1);
}

const files = fs
  .readdirSync(absFolder)
  .filter((f) => SUPPORTED.has(path.extname(f).toLowerCase()))
  .map((f) => ({
    filePath: path.join(absFolder, f),
    publicId: `${CDN_PREFIX}/${path.basename(f, path.extname(f))}`,
  }));

if (files.length === 0) {
  console.log("No supported image files found in", absFolder);
  process.exit(0);
}

console.log(`Uploading ${files.length} file(s) from ${absFolder}...\n`);

let passed = 0;
let failed = 0;

for (const { filePath, publicId } of files) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      overwrite: true,
      resource_type: "image",
    });
    console.log(`✓ ${path.basename(filePath)}`);
    console.log(`  → ${result.secure_url}\n`);
    passed++;
  } catch (err) {
    console.error(`✗ ${path.basename(filePath)}: ${err.message ?? err}\n`);
    failed++;
  }
}

console.log(`\nDone: ${passed} uploaded, ${failed} failed.`);
