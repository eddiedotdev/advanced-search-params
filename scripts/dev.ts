import { createServer } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function dev() {
  // Build CDN version first
  await import("./build").then((m) => m.buildLibrary());

  // Start dev server for examples
  const server = await createServer({
    root: resolve(__dirname, "../examples/vanilla"),
    server: {
      port: 3000,
      open: true,
    },
  });

  await server.listen();
}

dev().catch(console.error);
