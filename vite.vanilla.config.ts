import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/vanilla/index.ts"),
      name: "UseSearchParams",
      fileName: (format) => `use-search-params.${format}.min.js`,
      formats: ["iife"],
    },
    outDir: "cdn",
    emptyOutDir: true,
    minify: true,
    rollupOptions: {
      output: {
        globals: {
          "use-search-params": "UseSearchParams",
        },
      },
    },
  },
});
