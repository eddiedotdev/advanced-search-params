import { defineConfig } from "vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/vanilla/index.ts"),
      name: "UseSearchParams",
      formats: ["es", "umd", "iife"],
      fileName: (format) => `use-search-params.${format}.js`,
    },
  },
});
