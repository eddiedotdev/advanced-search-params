import { createContext, useContext } from "react";
import type { SearchParamsConfig } from "../lib/types";

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

export { SearchParamsContext };
