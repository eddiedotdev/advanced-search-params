import { createContext, useContext } from "react";
import type { RouterProvider } from "../lib/types";

export interface SearchParamsConfig {
  provider: RouterProvider;
}

const SearchParamsContext = createContext<SearchParamsConfig | null>(null);

export function useSearchParamsConfig() {
  const context = useContext(SearchParamsContext);
  if (!context) {
    throw new Error(
      "useSearchParams must be used within a SearchParamsProvider"
    );
  }
  return context;
}

export const SearchParamsRootProvider = SearchParamsContext.Provider;
