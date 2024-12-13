import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "vanilla/index": "src/vanilla/index.ts",
  },
  format: ["esm", "cjs"],
  dts: {
    resolve: true,
    compilerOptions: {
      declarationDir: "./dist",
      declarationMap: true,
    },
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: true,
  external: ["react", "react-dom", "next", "react-router-dom"],
  outDir: "dist",
  target: "es2020",
  platform: "browser",
  esbuildOptions(options) {
    options.conditions = ["import", "module"];
  },
});
