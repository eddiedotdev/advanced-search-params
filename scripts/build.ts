import { build } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function buildLibrary() {
  // Build main library
  await build({
    configFile: resolve(__dirname, "../vite.config.ts"),
  });

  // Build CDN version
  await build({
    configFile: resolve(__dirname, "../vite.vanilla.config.ts"),
  });

  // Copy CDN build to examples
  await fs.copy(
    resolve(__dirname, "../cdn"),
    resolve(__dirname, "../examples/vanilla/cdn")
  );
}

buildLibrary().catch(console.error);
