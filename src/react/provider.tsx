"use client";

import { ReactNode } from "react";
import { SearchParamsContext } from "./context";
import type { RouterProvider } from "../lib/types";

interface SearchParamsProviderProps {
  provider: RouterProvider;
  children: ReactNode;
}

export function SearchParamsProvider({
  provider,
  children,
}: SearchParamsProviderProps) {
  return (
    <SearchParamsContext.Provider value={{ provider }}>
      {children}
    </SearchParamsContext.Provider>
  );
}
