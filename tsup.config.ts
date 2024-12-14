import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "vanilla/index": "src/vanilla/index.ts",
    parsers: "src/lib/parsers.ts",
    "react/provider": "src/react/provider.tsx",
    "react/hooks/index": "src/react/hooks/use-search-params.ts",
  },
  format: ["cjs", "esm"],
  dts: {
    resolve: true,
    entry: {
      index: "src/index.ts",
      "vanilla/index": "src/vanilla/index.ts",
      parsers: "src/lib/parsers.ts",
      "react/provider": "src/react/provider.tsx",
      "react/hooks/index": "src/react/hooks/use-search-params.ts",
    },
    compilerOptions: {
      rootDir: "./src",
      outDir: "./dist",
    },
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: true,
  external: ["react", "react-dom", "next", "react-router-dom"],
  outDir: "dist",
  outExtension({ format }) {
    return {
      js: format === "cjs" ? ".cjs" : ".js",
    };
  },
});
