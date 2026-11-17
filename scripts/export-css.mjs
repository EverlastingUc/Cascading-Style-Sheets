import { readFile, mkdir, writeFile, readdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const source = JSON.parse(await readFile(resolve("snippets.json"), "utf8"));
if (!Array.isArray(source) || source.length !== 1000) {
  throw new Error(`Expected exactly 1,000 snippets; received ${source.length}`);
}
const output = resolve("css");
await mkdir(output, { recursive: true });
for (const name of await readdir(output)) {
  if (name.endsWith(".css")) await rm(resolve(output, name));
}
const seen = new Set();
const slugify = value => value.toLowerCase()
  .normalize("NFKD")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");
for (const item of source) {
  const filename = slugify(item.title);
  if (!filename || !item.css || seen.has(filename)) {
    throw new Error(`Invalid or duplicate CSS filename: ${filename}`);
  }
  seen.add(filename);
  const content = `/* ${item.title}\n * ${item.description}\n * Category: ${item.category}\n * Source ID: ${item.id}\n */\n\n${item.css.trim()}\n`;
  await writeFile(resolve(output, `${filename}.css`), content, "utf8");
}
if (seen.size !== 1000) throw new Error(`Expected 1,000 unique CSS files; generated ${seen.size}`);
console.log(`Exported ${seen.size} named CSS files to css/.`);
