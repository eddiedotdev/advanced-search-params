import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "UseSearchParams",
      formats: ["es", "cjs"],
      fileName: (format) => `use-search-params.${format}.js`,
    },
    outDir: "dist",
    rollupOptions: {
      external: ["react", "react-dom", "next", "react-router-dom"],
    },
  },
});
