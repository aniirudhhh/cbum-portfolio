import { rm } from "node:fs/promises";

// Remove only production compiler caches, including caches restored by Netlify.
// Development output and runtime data caches are left intact.
const caches = [
  new URL("../.next/cache/turbopack/", import.meta.url),
  new URL("../.netlify/.next/cache/turbopack/", import.meta.url),
];

for (const cache of caches) {
  await rm(cache, { recursive: true, force: true });
}
