/**
 * After `next build`, Next still emits `<link rel="icon" href="/favicon.ico" .../>`
 * before the logo link; browsers pick the first icon. Strip that tag from every
 * exported HTML file and delete `out/favicon.ico` so the tab uses the site logo.
 */
const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "..", "out");

if (!fs.existsSync(outDir)) {
  console.warn("strip-default-favicon: out/ not found; skipping.");
  process.exit(0);
}

const defaultIconRe =
  /<link rel="icon" href="\/favicon\.ico" type="image\/x-icon" sizes="16x16"\/>/g;

const patchHtml = (filePath) => {
  const s = fs.readFileSync(filePath, "utf8");
  const next = s.replace(defaultIconRe, "");
  if (next !== s) {
    fs.writeFileSync(filePath, next, "utf8");
    console.log("strip-default-favicon:", path.relative(outDir, filePath));
  }
};

const walk = (dir) => {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === "_next") {
      continue;
    }
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walk(full);
    } else if (ent.isFile() && ent.name.endsWith(".html")) {
      patchHtml(full);
    }
  }
};

walk(outDir);

const fav = path.join(outDir, "favicon.ico");
if (fs.existsSync(fav)) {
  fs.unlinkSync(fav);
  console.log("strip-default-favicon: removed favicon.ico");
}
