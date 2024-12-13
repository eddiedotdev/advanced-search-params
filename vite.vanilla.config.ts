import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/vanilla/index.ts"),
      name: "UseSearchParams",
      fileName: (format) => `urlkit-search-params.${format}.min.js`,
      formats: ["iife"],
    },
    outDir: "cdn",
    minify: true,
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore "use client" directive warnings
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
        warn(warning);
      },
    },
  },
});
