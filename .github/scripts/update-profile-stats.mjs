import { readFile, writeFile } from "node:fs/promises";

const runId = process.env.GITHUB_RUN_ID;
if (!runId || [...runId].some((char) => char < "0" || char > "9")) {
  throw new Error("GITHUB_RUN_ID must be a numeric workflow run ID.");
}

const readmePath = "README.md";
const startMarker = "<!-- GENERATED_STATS_CARDS:START -->";
const endMarker = "<!-- GENERATED_STATS_CARDS:END -->";

const readme = await readFile(readmePath, "utf8");
const start = readme.indexOf(startMarker);
const end = readme.indexOf(endMarker);

if (start < 0 || end < 0 || end <= start) {
  throw new Error("The generated statistics markers are missing or out of order.");
}
if (readme.indexOf(startMarker, start + startMarker.length) !== -1) {
  throw new Error("Found duplicate statistics start markers.");
}

const block = `${startMarker}
  <img height="170" src="./profile/stats.svg?v=${runId}" alt="GitHub statistics" />
  <img height="170" src="./profile/top-langs.svg?v=${runId}" alt="Most used languages" />
  ${endMarker}`;

const updated =
  readme.slice(0, start) +
  block +
  readme.slice(end + endMarker.length);

await writeFile(readmePath, updated, "utf8");
console.log(`Updated README image cache-buster to workflow run ${runId}.`);
