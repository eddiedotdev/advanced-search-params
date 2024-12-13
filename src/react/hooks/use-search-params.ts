"use client";

import { useSearchParamsConfig } from "../context";
import { useNextAdapter } from "../../lib/adapters/nextjs";
import { useReactAdapter } from "../../lib/adapters/react";
import type { UseParamsReturn } from "../../lib/types";
import { createSearchParamsCore } from "../../lib/core/search-params";

/**
 * A hook for managing URL search parameters that can have multiple values.
 * Provides a simple interface for common operations while maintaining URL state.
 *
 * Key features:
 * - Handles multiple values per key (e.g., ?filter=a&filter=b)
 * - Preserves other URL parameters during operations
 * - Prevents duplicate values
 * - Type-safe operations
 * - Works with Next.js and React
 *
 * @returns An object containing methods for manipulating URL parameters
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const { get, set, add, remove } = useSearchParams();
 *
 *   // Set initial values
 *   useEffect(() => {
 *     set('filter', ['active', 'pending']);
 *   }, []);
 *
 *   // Get current values
 *   const currentFilters = get('filter');
 *
 *   return (
 *     <div>
 *       <button onClick={() => add('filter', 'completed')}>
 *         Add Completed
 *       </button>
 *       <button onClick={() => remove('filter', 'pending')}>
 *         Remove Pending
 *       </button>
 *     </div>
 *   );
 * };
 * ```
 */
export function useSearchParams(): UseParamsReturn {
  const { provider } = useSearchParamsConfig();
  const adapter = provider === "next" ? useNextAdapter() : useReactAdapter();

  return createSearchParamsCore(adapter);
}
