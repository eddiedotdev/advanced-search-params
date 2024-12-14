import { build } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs-extra";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function cleanupSrcDirectory(dir: string) {
  const srcPath = resolve(dir, "src");
  if (fs.existsSync(srcPath)) {
    const files = await fs.readdir(srcPath);
    for (const file of files) {
      const filePath = resolve(srcPath, file);
      const destPath = resolve(dir, file);
      if (fs.statSync(filePath).isFile()) {
        await fs.move(filePath, destPath, { overwrite: true });
      }
    }
    await fs.remove(srcPath);
  }
}

export async function buildLibrary() {
  // Build main library using tsup
  execSync("npm run build:lib", { stdio: "inherit" });

  // Build CDN version
  await build({
    configFile: resolve(__dirname, "../vite.vanilla.config.ts"),
  });

  // Clean up src directories
  await cleanupSrcDirectory(resolve(__dirname, "../dist"));
  await cleanupSrcDirectory(resolve(__dirname, "../cdn"));

  // Copy CDN build to examples
  await fs.copy(
    resolve(__dirname, "../cdn"),
    resolve(__dirname, "../examples/vanilla/cdn")
  );
}

buildLibrary().catch(console.error);
