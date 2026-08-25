// One-off script: processes assets/incoming/Photo Album/ into public/photos/gallery/
// and regenerates data/gallery.ts. Not wired into the build — run manually:
//   node scripts/process-gallery-photos.mjs

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC_ROOT = path.join(ROOT, "assets/incoming/Photo Album");
const OUT_ROOT = path.join(ROOT, "public/photos/gallery");
const DATA_FILE = path.join(ROOT, "data/gallery.ts");

// Order doubles as album display order. Resolves the "two folders both start
// with 5" ambiguity: Keynote (Opening) before Welcome Dinner.
const ALBUM_MAP = [
  { folder: "1. Ribbon Cutting", slug: "ribbon-cutting", title: "Ribbon Cutting" },
  { folder: "2. Processional March", slug: "processional-march", title: "Processional March" },
  {
    folder: "3. Entrance of Colors, Doxology, National Anthem, IIEE Hymn",
    slug: "entrance-of-colors-doxology-national-anthem-iiee-hymn",
    title: "Entrance of Colors, Doxology, National Anthem, IIEE Hymn",
  },
  { folder: "4. IIEE Presentation", slug: "iiee-presentation", title: "IIEE Presentation" },
  { folder: "5 Keynote (Opening)", slug: "keynote-opening", title: "Keynote (Opening)" },
  { folder: "5. Welcome Dinner", slug: "welcome-dinner", title: "Welcome Dinner" },
  { folder: "6. MMRC Speakers", slug: "mmrc-speakers", title: "MMRC Speakers" },
  { folder: "7. Specs MOA", slug: "specs-moa", title: "Specs MOA" },
  { folder: "8. WEN (Lakambini)", slug: "wen-lakambini", title: "WEN (Lakambini)" },
  { folder: "9. YEP", slug: "yep", title: "YEP" },
  {
    folder: "9.1 Chapters officers meeting and leadership",
    slug: "chapters-officers-meeting-and-leadership",
    title: "Chapters Officers Meeting and Leadership",
  },
  { folder: "9.2 Fellowship", slug: "fellowship", title: "Fellowship" },
  { folder: "9.3 Closing Keynote", slug: "closing-keynote", title: "Closing Keynote" },
  { folder: "9.4 Closing Ceremony", slug: "closing-ceremony", title: "Closing Ceremony" },
  { folder: "9.5 BOG", slug: "board-of-governors", title: "Board of Governors" },
  { folder: "9.7 Emcee Post", slug: "emcee-post", title: "Emcee Post" },
  { folder: "9.8 Council of MMR Students", slug: "council-of-mmr-students", title: "Council of MMR Students" },
  { folder: "9.9a MMR in Action", slug: "mmr-in-action", title: "MMR in Action" },
  { folder: "9.9b Pictures of People", slug: "pictures-of-people", title: "Pictures of People" },
  {
    folder: "9.9c A big thank you to the MMRC",
    slug: "thank-you-to-the-mmrc",
    title: "A Big Thank You to the MMRC",
  },
  { folder: "9.9d 12th RCS Conference", slug: "12th-rcs-conference", title: "12th RCS Conference" },
  { folder: "9.9e MMR Cable Olympics", slug: "mmr-cable-olympics", title: "MMR Cable Olympics" },
  { folder: "9.9f MMRC Plant Tour", slug: "mmrc-plant-tour", title: "MMRC Plant Tour" },
  { folder: "9.9g MMR Sports Olympics", slug: "mmr-sports-olympics", title: "MMR Sports Olympics" },
];

const EXCLUDED_EXTS = new Set([".mov"]);
const SIPS_CONVERT_EXTS = new Set([".heic", ".rw2"]);

function naturalSort(filenames) {
  return [...filenames].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
  );
}

async function processFile(inputPath, outputPath, tmpDir) {
  const ext = path.extname(inputPath).toLowerCase();
  let sharpInput = inputPath;

  if (SIPS_CONVERT_EXTS.has(ext)) {
    const tmpJpg = path.join(tmpDir, `${path.basename(inputPath)}.jpg`);
    execFileSync("sips", ["-s", "format", "jpeg", inputPath, "--out", tmpJpg], {
      stdio: ["ignore", "ignore", "pipe"],
    });
    sharpInput = tmpJpg;
  }

  await sharp(sharpInput)
    .rotate() // auto-orient from EXIF, bake into pixels before metadata is stripped
    .flatten({ background: "#ffffff" }) // safety net for any PNG alpha
    .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true }) // no .withMetadata() -> EXIF/ICC/GPS stripped by default
    .toFile(outputPath);
}

async function main() {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "gallery-processing-"));

  const excluded = [];
  const errors = [];
  const albumSummaries = [];
  const albums = [];

  try {
    for (const { folder, slug, title } of ALBUM_MAP) {
      const folderPath = path.join(SRC_ROOT, folder);
      if (!fs.existsSync(folderPath)) {
        errors.push({ file: folder, reason: "album folder not found on disk" });
        continue;
      }

      const outDir = path.join(OUT_ROOT, slug);
      fs.mkdirSync(outDir, { recursive: true });

      const allFiles = fs
        .readdirSync(folderPath, { withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => entry.name);

      const usable = [];
      for (const name of allFiles) {
        const ext = path.extname(name).toLowerCase();
        if (EXCLUDED_EXTS.has(ext)) {
          excluded.push(path.join(folder, name));
        } else {
          usable.push(name);
        }
      }

      const sorted = naturalSort(usable);
      const photos = [];
      let processed = 0;

      for (let i = 0; i < sorted.length; i++) {
        const name = sorted[i];
        const inputPath = path.join(folderPath, name);
        const index = String(i + 1).padStart(3, "0");
        const outputFilename = `${slug}-${index}.jpg`;
        const outputPath = path.join(outDir, outputFilename);

        try {
          await processFile(inputPath, outputPath, tmpDir);
          photos.push({ src: `/photos/gallery/${slug}/${outputFilename}` });
          processed++;
        } catch (err) {
          errors.push({ file: path.join(folder, name), reason: err.message });
        }
      }

      albums.push({ slug, title, photos });
      albumSummaries.push({ slug, source: allFiles.length, processed });
    }

    // Generate data/gallery.ts
    const albumsTs = albums
      .map((album) => {
        const photosTs = album.photos.map((p) => `      { src: ${JSON.stringify(p.src)} },`).join("\n");
        return `  {
    slug: ${JSON.stringify(album.slug)},
    title: ${JSON.stringify(album.title)},
    photos: [
${photosTs}
    ],
  },`;
      })
      .join("\n");

    const dataFileContent = `export type GalleryPhoto = {
  src: string;
};

export type GalleryAlbum = {
  slug: string;
  title: string;
  photos: GalleryPhoto[];
};

export const galleryAlbums: GalleryAlbum[] = [
${albumsTs}
];
`;

    fs.writeFileSync(DATA_FILE, dataFileContent);

    // Report
    const totalSource = albumSummaries.reduce((sum, a) => sum + a.source, 0);
    const totalProcessed = albumSummaries.reduce((sum, a) => sum + a.processed, 0);

    console.log("\n=== Excluded files (%d) ===", excluded.length);
    for (const f of excluded) console.log(`  ${f}`);

    if (errors.length > 0) {
      console.log("\n=== Errors (%d) ===", errors.length);
      for (const e of errors) console.log(`  ${e.file}: ${e.reason}`);
    }

    console.log("\n=== Per-album summary ===");
    for (const a of albumSummaries) {
      console.log(`  ${a.slug}: ${a.source} source -> ${a.processed} processed`);
    }

    console.log("\n=== Totals ===");
    console.log(
      `  ${totalSource} source files, ${excluded.length} excluded, ${totalProcessed} processed, ${errors.length} errors`,
    );
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
