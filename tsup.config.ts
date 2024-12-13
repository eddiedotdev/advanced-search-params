import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "use-search-params": "src/index.ts",
    "vanilla/use-search-params": "src/vanilla/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: true,
  external: ["react", "react-dom"],
});
