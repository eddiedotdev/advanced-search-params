import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "UseSearchParams",
      fileName: (format) => `urlkit-search-params.${format}.js`,
      formats: ["es", "cjs"],
    },
    outDir: "dist",
    rollupOptions: {
      external: ["react", "react-dom", "next", "react-router-dom"],
    },
  },
});
