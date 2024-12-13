import { defineConfig } from "vite";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/vanilla/index.ts"),
      name: "UseSearchParams",
      fileName: () => `urlkit-search-params.iife.min.js`,
      formats: ["iife"],
    },
    outDir: "cdn",
    minify: true,
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
});
