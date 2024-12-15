"use client";

import { useSearchParamsConfig } from "../context";
import { useNextAdapter } from "../../lib/adapters/nextjs";
import { useReactAdapter } from "../../lib/adapters/react";
import type { UseParamsReturn } from "../../lib/types";
import { createSearchParamsCore } from "../../lib/core/search-params";
import { createServerAdapter } from "../../lib/adapters/server";
import { useReactRouterAdapter } from "../../lib/adapters/react-router";

/**
 * Hook for managing URL search parameters with support for multiple values per key.
 * 
 * @returns {UseParamsReturn} Object with methods: 
 * get, set, add, remove, getWithDefault, matches, update, clear, resetAllParams, getAll, setMany
 * 
 * @example
 * ```tsx
 * function FilterComponent() {
 *   const { get, set, add, remove } = useSearchParams();
 * 
 *   // Get current filters
 *   const filters = get('filter');
 * 
 *   return (
 *     <div>
 *       <button onClick={() => add('filter', 'active')}>Add Active</button>
 *       <button onClick={() => remove('filter', 'active')}>Remove Active</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useSearchParams(): UseParamsReturn {
  const config = useSearchParamsConfig();

  if (!config) {
    throw new Error(
      "useSearchParams must be used within a SearchParamsProvider"
    );
  }

  const adapterConfig = () => {
    switch(config.provider) {
      case "next":
        return useNextAdapter();
      case "react":
        return useReactAdapter();
      case 'react-router':
        return useReactRouterAdapter();
      case "server":
        return createServerAdapter();
      default:
        return useReactAdapter();
    }
  };

  return createSearchParamsCore(adapterConfig());
}
