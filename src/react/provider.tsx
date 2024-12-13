import { type ReactNode } from "react";
import { SearchParamsRootProvider } from "./context";
import type { RouterProvider } from "../lib/types";

interface SearchParamsProviderProps {
  children: ReactNode;
  provider: RouterProvider;
}

export function SearchParamsProvider({
  children,
  provider,
}: SearchParamsProviderProps) {
  return (
    <SearchParamsRootProvider value={{ provider }}>
      {children}
    </SearchParamsRootProvider>
  );
}
