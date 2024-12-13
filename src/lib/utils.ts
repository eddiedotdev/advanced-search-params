/**
 * Converts a value to an array if it isn't already one.
 */
export function toArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

/**
 * Serializes a value to a URL-safe string.
 */
export function serialize(value: unknown): string {
  if (value === undefined || value === null) return "";
  return JSON.stringify(value);
}

/**
 * Deserializes a URL-safe string to a value.
 */
export function deserialize<T>(value: string): T | undefined {
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    return undefined;
  }
}

/**
 * Creates a new URLSearchParams instance with updated parameters.
 */
export function updateSearchParams(
  current: URLSearchParams,
  key: string,
  values: string[]
): URLSearchParams {
  const newParams = new URLSearchParams(current);
  newParams.delete(key);
  values.forEach((value) => newParams.append(key, value));
  return newParams;
}

/**
 * Validates search parameter inputs.
 */
export function validateParams(key: string, values: unknown | unknown[]): void {
  if (!key) throw new Error("Key cannot be empty");
  if (values === undefined) throw new Error("Values cannot be undefined");
}

/**
 * Creates a URL string from pathname and search params.
 */
export function createUrl(pathname: string, params: URLSearchParams): string {
  const search = params.toString();
  return `${pathname}${search ? `?${search}` : ""}`;
}

/**
 * Processes multiple parameter updates.
 */
export function batchUpdateParams(
  current: URLSearchParams,
  updates: Record<string, string[]>
): URLSearchParams {
  const newParams = new URLSearchParams(current);

  Object.entries(updates).forEach(([key, values]) => {
    newParams.delete(key);
    values.forEach((value) => newParams.append(key, value));
  });

  return newParams;
}
