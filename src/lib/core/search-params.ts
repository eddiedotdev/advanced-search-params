import {
  serialize,
  deserialize,
  toArray,
  validateParams,
  createUrl,
} from "../utils";
import type { ParamOptions } from "../types";

/**
 * Creates core search parameter functionality that can be used across different adapters.
 * This is the shared implementation used by both React hooks and vanilla JS.
 *
 * @param adapter - An object containing the adapter implementation
 * @param adapter.pathname - The current URL pathname
 * @param adapter.searchParams - The URLSearchParams instance
 * @param adapter.navigate - Function to handle URL navigation
 * @returns An object containing methods for manipulating URL parameters
 */
export function createSearchParamsCore(adapter: {
  pathname: string;
  searchParams: URLSearchParams;
  navigate: (url: string) => void;
}) {
  const { pathname, searchParams, navigate } = adapter;

  function updateAndNavigate(newParams: URLSearchParams) {
    Array.from(searchParams.keys()).forEach((key) => searchParams.delete(key));
    Array.from(newParams.entries()).forEach(([key, value]) =>
      searchParams.append(key, value)
    );
    navigate(createUrl(pathname, newParams));
  }

  return {
    /**
     * Gets values for a key from URL search parameters.
     * Returns undefined if the key doesn't exist.
     *
     * @param key - The URL parameter key to get values for
     * @param options - Optional configuration for parsing values
     * @returns A single value if one exists, an array of values if multiple exist, or undefined if none exist
     *
     * @example
     * // Simple string value
     * get('view') // returns 'grid'
     *
     * // Array of values
     * get('tags') // returns ['react', 'typescript']
     *
     * // Complex object with parsing
     * get('filters', { parse: true }) // returns parsed object
     */
    get<T>(key: string, options?: ParamOptions): T | undefined {
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
    },

    /**
     * Gets a value with a fallback default if the key doesn't exist.
     *
     * @param key - The URL parameter key to get
     * @param defaultValue - The default value to return if key doesn't exist
     * @param options - Optional configuration for parsing values
     * @returns The parameter value if it exists, otherwise the default value
     *
     * @example
     * getWithDefault('view', 'grid')
     * getWithDefault('filters', defaultFilters, { parse: true })
     */
    getWithDefault<T>(key: string, defaultValue: T, options?: ParamOptions): T {
      return this.get<T>(key, options) ?? defaultValue;
    },

    /**
     * Sets values for a URL parameter key, replacing any existing values.
     *
     * @param key - The URL parameter key to set
     * @param values - Value or array of values to set
     * @param options - Optional configuration for serializing values
     *
     * @example
     * // Simple string value
     * set('view', 'grid')
     *
     * // Array of values
     * set('tags', ['react', 'typescript'])
     *
     * // Complex object with serialization
     * set('filters', { status: 'active' }, { serialize: true })
     */
    set(
      key: string,
      values: unknown | unknown[],
      options?: ParamOptions
    ): void {
      validateParams(key, values);
      const processedValues = options?.serialize
        ? toArray(values).map((v) => serialize(v))
        : toArray(values).map(String);

      const newParams = new URLSearchParams(searchParams);
      newParams.delete(key);
      processedValues.forEach((value) => newParams.append(key, value));
      updateAndNavigate(newParams);
    },

    /**
     * Adds values to a URL parameter key while preserving existing values.
     * Automatically deduplicates values.
     *
     * @param key - The URL parameter key to add values to
     * @param values - Value or array of values to add
     * @param options - Optional configuration for serializing values
     */
    add(
      key: string,
      values: unknown | unknown[],
      options?: ParamOptions
    ): void {
      const currentValues = toArray(this.get(key, options) ?? []);
      const newValues = toArray(values);
      const uniqueValues = [...new Set([...currentValues, ...newValues])];
      this.set(
        key,
        uniqueValues.length === 1 ? [uniqueValues[0]] : uniqueValues,
        options
      );
    },

    /**
     * Removes specific values from a URL parameter key.
     *
     * @param key - The URL parameter key to remove values from
     * @param values - Value or array of values to remove
     * @param options - Optional configuration for parsing values
     */
    remove(
      key: string,
      values: unknown | unknown[],
      options?: ParamOptions
    ): void {
      const currentValues = toArray(this.get(key, options));
      const valuesToRemove = toArray(values);
      const updated = currentValues.filter(
        (value) => !valuesToRemove.includes(value)
      );
      this.set(key, updated, options);
    },

    /**
     * Checks if a URL parameter key contains a specific value.
     *
     * @param key - The URL parameter key to check
     * @param value - The value to look for
     * @param options - Optional configuration for parsing values
     */
    matches(key: string, value: unknown, options?: ParamOptions): boolean {
      const currentValue = this.get(key, options);
      if (!currentValue) return false;

      if (options?.parse) {
        return Array.isArray(currentValue)
          ? currentValue.some(
              (v) => JSON.stringify(v) === JSON.stringify(value)
            )
          : JSON.stringify(currentValue) === JSON.stringify(value);
      }

      return Array.isArray(currentValue)
        ? currentValue.includes(String(value))
        : currentValue === String(value);
    },

    /**
     * Toggles a value for a key. If it exists, removes it. If it doesn't exist, adds it.
     *
     * @param key - The URL parameter key to toggle
     * @param value - The value to toggle (defaults to "true")
     * @param options - Optional configuration for serializing values
     */
    toggle(key: string, value: unknown = "true", options?: ParamOptions): void {
      if (this.matches(key, value, options)) {
        this.remove(key, value, options);
      } else {
        this.add(key, value, options);
      }
    },

    /**
     * Updates all occurrences of a value to a new value for a specific key.
     *
     * @param key - The URL parameter key to update
     * @param oldValue - The value to replace
     * @param newValue - The value to replace with
     * @param options - Optional configuration for serializing values
     */
    update(
      key: string,
      oldValue: unknown,
      newValue: unknown,
      options?: ParamOptions
    ): void {
      const currentValues = toArray(this.get(key, options));
      const updated = currentValues.map((value) =>
        value === oldValue ? newValue : value
      );
      this.set(key, updated, options);
    },

    /**
     * Removes all values for a specific URL parameter key.
     *
     * @param key - The URL parameter key to clear
     */
    clear(key: string): void {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete(key);
      navigate(createUrl(pathname, newParams));
    },

    /**
     * Removes all search parameters from the URL.
     */
    resetAllParams(): void {
      navigate(pathname);
    },

    /**
     * Gets all URL search parameters as a structured object.
     *
     * @param options - Optional configuration for parsing values
     * @returns An object mapping parameter keys to their values
     */
    getAll(options?: ParamOptions): Record<string, unknown> {
      const params: Record<string, unknown> = {};

      searchParams.forEach((value, key) => {
        const existing = params[key];
        const processedValue = options?.parse ? deserialize(value) : value;

        if (existing) {
          params[key] = Array.isArray(existing)
            ? [...existing, processedValue]
            : [existing, processedValue];
        } else {
          params[key] = processedValue;
        }
      });

      return params;
    },

    /**
     * Sets multiple URL parameter key/value pairs simultaneously.
     *
     * @param params - Object mapping parameter keys to their values
     * @param options - Optional configuration for serializing values
     */
    setMany(
      params: Record<string, unknown | unknown[]>,
      options?: ParamOptions
    ): void {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(params).forEach(([key, values]) => {
        newParams.delete(key);
        const processedValues = options?.serialize
          ? toArray(values).map((v) => serialize(v))
          : toArray(values).map(String);
        processedValues.forEach((value) => newParams.append(key, value));
      });
      updateAndNavigate(newParams);
    },

    /** Access to the underlying URLSearchParams object */
    params: searchParams,
  };
}
