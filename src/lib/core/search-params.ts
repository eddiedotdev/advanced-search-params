import {
  serialize,
  deserialize,
  toArray,
  validateParams,
  createUrl,
} from "../utils";
import type { ParamOptions } from "../types";
import { ReadonlyURLSearchParams } from "next/navigation";

/**
 * Creates core search parameter functionality that can be used across different adapters.
 * This is the shared implementation used by both React hooks and vanilla JS.
 *
 * @param adapter - An object containing the adapter implementation
 * @param adapter.pathname - The current URL pathname
 * @param adapter.searchParams - The URLSearchParams instance (can be readonly in Next.js)
 * @param adapter.navigate - Function to handle URL navigation
 * @returns An object containing methods for manipulating URL parameters
 */
export function createSearchParamsCore(adapter: {
  pathname: string;
  searchParams: URLSearchParams | ReadonlyURLSearchParams;
  navigate: (url: string) => void;
}) {
  const { pathname, searchParams, navigate } = adapter;

  const getMutableParams = () => {
    return new URLSearchParams(searchParams.toString());
  };

  const updateAndNavigate = (updater: (params: URLSearchParams) => void) => {
    const newParams = getMutableParams();
    updater(newParams);
    navigate(createUrl(pathname, newParams));
  };

  /**
   * Gets values for a key as a structured object containing both key and value(s).
   * If there's only one value, returns it as a string. If multiple values exist,
   * returns them as an array.
   *
   * @param key - The URL parameter key to get values for
   * @param options - Optional configuration for parsing values
   * @returns The value(s) for the key, or undefined if not found
   *
   * @example
   * // URL: ?filter=active
   * get('filter') // Returns: 'active'
   *
   * // URL: ?filter=active&filter=pending
   * get('filter') // Returns: ['active', 'pending']
   *
   * // URL: ?data={"test":true}
   * get('data', { parse: true }) // Returns: { test: true }
   */
  const get = <T>(key: string, options?: ParamOptions): T | undefined => {
    const values = searchParams.getAll(key);
    if (values.length === 0) return undefined;

    if (options?.parse) {
      try {
        const parsedValues = values.map((v) => deserialize<T>(v));
        return options.forceArray || values.length > 1
          ? (parsedValues as T)
          : (parsedValues[0] as T);
      } catch (error) {
        console.warn(`Failed to parse value for key "${key}"`, error);
        return undefined;
      }
    }

    return options?.forceArray || values.length > 1
      ? (values as T)
      : (values[0] as T);
  };

  /**
   * Sets/replaces all values for a key.
   *
   * @param key - The URL parameter key to set values for
   * @param values - Single value or array of values to set
   * @param options - Optional configuration for serializing values
   *
   * @example
   * // Set single value
   * set('view', 'grid');
   *
   * // Set multiple values
   * set('filter', ['active', 'pending']);
   *
   * // Set serialized object
   * set('filters', { status: 'active' }, { serialize: true });
   */
  const set = (key: string, values: unknown | unknown[], options?: ParamOptions): void => {
    validateParams(key, values);
    updateAndNavigate((params) => {
      params.delete(key);
      const processedValues = options?.serialize
        ? toArray(values).map((v) => serialize(v))
        : toArray(values).map(String);
      processedValues.forEach((value) => params.append(key, value));
    });
  };

  /**
   * Adds new values to existing ones for a key, preventing duplicates.
   * Accepts either a single value or an array of values.
   *
   * @param key - The URL parameter key to add values to
   * @param values - Single value or array of values to add
   * @param options - Optional configuration for serializing values
   *
   * @example
   * // Add single value
   * add('filter', 'completed');
   *
   * // Add multiple values
   * add('filter', ['archived', 'draft']);
   */
  const add = (key: string, values: unknown | unknown[], options?: ParamOptions): void => {
    validateParams(key, values);
    const currentValues = get(key) || [];
    const updated = [...new Set([
      ...toArray(currentValues),
      ...toArray(options?.serialize ? toArray(values).map(serialize) : values)
    ])];
    
    updateAndNavigate((params) => {
      params.delete(key);
      updated.forEach((value) => params.append(key, String(value)));
    });
  };

  /**
   * Removes specific values from a key's array.
   * Accepts either a single value or an array of values to remove.
   *
   * @param key - The URL parameter key to remove values from
   * @param values - Single value or array of values to remove
   *
   * @example
   * // Remove single value
   * remove('filter', 'pending');
   *
   * // Remove multiple values
   * remove('filter', ['archived', 'draft']);
   */
  const remove = (key: string, values: unknown | unknown[]): void => {
    const currentValues = toArray(get(key));
    const valuesToRemove = toArray(values);
    const updated = currentValues.filter(
      (value) => !valuesToRemove.includes(value)
    );
    
    updateAndNavigate((params) => {
      params.delete(key);
      updated.forEach((value) => params.append(key, String(value)));
    });
  };

  /**
   * Checks if a URL parameter key contains a specific value.
   * For single values, checks for exact match.
   * For array values, checks if value exists in the array.
   *
   * @param key - The URL parameter key to check
   * @param value - The value to look for
   * @param options - Optional configuration for parsing values before comparison
   * @returns True if the key contains the value, false otherwise
   *
   * @example
   * // URL: ?filter=active
   * matches('filter', 'active') // true
   * matches('filter', 'pending') // false
   *
   * // URL: ?filter=active&filter=pending
   * matches('filter', 'active') // true
   * matches('filter', 'completed') // false
   */
  const matches = (key: string, value: unknown, options?: ParamOptions): boolean => {
    const values = get(key, options);
    if (!values) return false;

    // For parsed objects, use JSON string comparison
    if (options?.parse) {
      const valueStr = JSON.stringify(value);
      if (Array.isArray(values)) {
        return values.some(v => JSON.stringify(v) === valueStr);
      }
      return JSON.stringify(values) === valueStr;
    }

    // For regular values, use direct comparison
    if (Array.isArray(values)) {
      return values.includes(value as never);
    }
    return values === value;
  };

  /**
   * Gets a value with a default fallback if the key doesn't exist.
   *
   * @param key - The URL parameter key to get the value for
   * @param defaultValue - The default value to return if the key doesn't exist
   * @param options - Optional configuration for parsing values
   * @returns The value if it exists, otherwise the default value
   */
  const getWithDefault = <T>(
    key: string,
    defaultValue: T,
    options?: ParamOptions
  ): T => {
    const value = get<T>(key, options);
    return value === undefined ? defaultValue : value;
  };

  /**
   * Clears a specific key from the URL parameters
   */
  const clear = (key: string): void => {
    updateAndNavigate((params) => params.delete(key));
  };

  /**
   * Resets all URL search parameters
   */
  const resetAllParams = (): void => {
    navigate(pathname);
  };

  /**
   * Sets multiple URL parameter key/value pairs simultaneously.
   * Preserves any existing parameters not included in the update.
   *
   * @param params - An object where keys are parameter names and values are arrays of values
   * @param options - Optional configuration for serializing values
   *
   * @example
   * // Set multiple parameters at once
   * setMany({
   *   filter: ['active', 'pending'],
   *   sort: ['date'],
   *   view: ['grid']
   * });
   *
   * // Set serialized objects
   * setMany({
   *   filters: [{ status: 'active' }],
   *   config: [{ view: 'grid' }]
   * }, { serialize: true });
   */
  const setMany = (
    params: Record<string, unknown[]>,
    options?: ParamOptions
  ): void => {
    Object.entries(params).forEach(([key, values]) => {
      validateParams(key, values);
    });

    updateAndNavigate((newParams) => {
      Object.entries(params).forEach(([key, values]) => {
        newParams.delete(key);
        const processedValues = options?.serialize
          ? toArray(values).map((v) => serialize(v))
          : toArray(values).map(String);
        processedValues.forEach((value) => newParams.append(key, value));
      });
    });
  };

  return {
    get,
    set,
    add,
    remove,
    matches,
    getWithDefault,
    clear,
    resetAllParams,
    setMany,
    params: searchParams,
  };
}
