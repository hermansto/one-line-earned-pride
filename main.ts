import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one line of earned pride this entry submits — a quiet commit
// nobody applauded, 124 characters, 126 bytes in UTF-8 (em dash).
const line =
  "Nobody saw the 3 AM fix that saved the launch. No applause, no announcement — just a quiet commit, and the system stayed up.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const outFile = join(outDir, "entry.txt");

// The competition allows 1–240 characters, and wants one line — fail
// loudly if the line ever grows past 240 or gains a newline.
if (line.length > 240) {
  throw new Error(`line is ${line.length} characters, over the 240 limit`);
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("line must be exactly one line");
}

writeFileSync(outFile, line, "utf8");

// Read it back and confirm the file holds exactly the line, byte for byte.
const written = readFileSync(outFile, "utf8");
if (written !== line) {
  throw new Error("entry.txt does not match the line exactly");
}
if (written.endsWith("\n") || written.endsWith("\r")) {
  throw new Error("entry.txt must not end with a newline");
}
console.log(`Wrote ${Buffer.byteLength(written, "utf8")} bytes to ${outFile}`);
