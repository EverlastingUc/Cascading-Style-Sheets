import { readFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const source = JSON.parse(await readFile(resolve("snippets.json"), "utf8"));
if (!Array.isArray(source) || source.length !== 1000) {
  throw new Error(`Expected exactly 1,000 snippets; received ${source.length}`);
}
const output = resolve("css");
await mkdir(output, { recursive: true });
const seen = new Set();
for (const item of source) {
  if (!item.id || !item.css || seen.has(item.id)) {
    throw new Error(`Invalid or duplicate snippet id: ${item.id}`);
  }
  seen.add(item.id);
  const content = `/* ${item.title}\n * ${item.description}\n * Category: ${item.category}\n * Source ID: ${item.id}\n */\n\n${item.css.trim()}\n`;
  await writeFile(resolve(output, `${item.id}.css`), content, "utf8");
}
console.log(`Exported ${seen.size} standalone CSS files to css/.`);
