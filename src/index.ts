// Types
import type { SearchParamsConfig } from "./lib/types";
export type {
  SearchParamsConfig,
  UseParamsReturn,
  RouterProvider,
} from "./lib/types";

// React/Next.js functionality
export { useSearchParams } from "./react/hooks/use-search-params";
export { SearchParamsProvider } from "./react/provider";

// Adapters
export { useNextAdapter } from "./lib/adapters/nextjs";
export { useReactAdapter } from "./lib/adapters/react";
export { useVanillaAdapter } from "./lib/adapters/vanilla";

// Utilities
export {
  serialize,
  deserialize,
  toArray,
  updateSearchParams,
  validateParams,
  createUrl,
  batchUpdateParams,
} from "./lib/utils";

// Default configuration
export const defaultConfig: SearchParamsConfig = {
  provider: "next",
};
