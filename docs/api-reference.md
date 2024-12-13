# API Reference

## Core Hook

### `useSearchParams()`

The main hook for managing URL search parameters.

```tsx
const params = useSearchParams();
```

Returns an object containing all parameter management methods.

## Provider

### `SearchParamsProvider`

Context provider that configures the URL parameter adapter.

```tsx
<SearchParamsProvider provider="next">
  <App />
</SearchParamsProvider>
```

**Props:**

- `provider`: `"next" | "react" | "react-router"` - Specifies which router adapter to use

## Core Methods

### Get Operations

#### `get<T>(key: string, options?: ParamOptions): T | undefined`

Retrieves value(s) for a key.

```tsx
const value = get<string>("view");
const tags = get<string[]>("tags", { forceArray: true });
const filters = get<Filters>("filters", { parse: true });
```

#### `getWithDefault<T>(key: string, defaultValue: T, options?: ParamOptions): T`

Gets a value with fallback.

```tsx
const view = getWithDefault("view", "grid");
```

#### `getAll(options?: ParamOptions): Record<string, unknown>`

Gets all parameters as an object.

```tsx
const allParams = getAll({ parse: true });
```

### Set Operations

#### `set(key: string, values: unknown | unknown[], options?: ParamOptions): void`

Sets value(s) for a key, replacing existing values.

```tsx
set("view", "grid");
set("tags", ["react", "typescript"]);
set("filters", { status: "active" }, { serialize: true });
```

#### `setMany(params: Record<string, unknown | unknown[]>, options?: ParamOptions): void`

Sets multiple parameters at once.

```tsx
setMany(
  {
    view: "grid",
    tags: ["react"],
    filters: { status: "active" },
  },
  { serialize: true }
);
```

### Array Operations

#### `add(key: string, values: unknown | unknown[], options?: ParamOptions): void`

Adds value(s) while preserving existing ones.

```tsx
add("tags", "typescript");
add("categories", ["frontend", "backend"]);
```

#### `remove(key: string, values: unknown | unknown[], options?: ParamOptions): void`

Removes specific value(s) from a key.

```tsx
remove("tags", "react");
remove("categories", ["frontend"]);
```

#### `update(key: string, oldValue: unknown, newValue: unknown, options?: ParamOptions): void`

Updates specific value(s) for a key.

```tsx
update("tags", "react", "nextjs");
```

### State Operations

#### `clear(key: string): void`

Removes all values for a key.

```tsx
clear("tags");
```

#### `resetAllParams(): void`

Removes all search parameters.

```tsx
resetAllParams();
```

### Utility Operations

#### `matches(key: string, value: unknown, options?: ParamOptions): boolean`

Checks if a key contains a specific value.

```tsx
const hasTag = matches("tags", "react");
const isActive = matches("status", { state: "active" }, { parse: true });
```

## Options Interface

```typescript
interface ParamOptions {
  serialize?: boolean; // Serialize objects to JSON
  parse?: boolean; // Parse JSON strings to objects
  forceArray?: boolean; // Always return arrays for get operations
}
```

## Vanilla JavaScript API

### `createSearchParams()`

Creates a parameter manager for non-React applications.

```typescript
import { createSearchParams } from "use-search-params/vanilla";

const params = createSearchParams();
// Same API as useSearchParams()
```

## Types

### `RouterProvider`

```typescript
type RouterProvider = "next" | "react";
```

### `UseParamsReturn`

```typescript
interface UseParamsReturn {
  get: <T>(key: string, options?: ParamOptions) => T | undefined;
  set: (
    key: string,
    values: unknown | unknown[],
    options?: ParamOptions
  ) => void;
  add: (
    key: string,
    values: unknown | unknown[],
    options?: ParamOptions
  ) => void;
  remove: (
    key: string,
    values: unknown | unknown[],
    options?: ParamOptions
  ) => void;
  update: (
    key: string,
    oldValue: unknown,
    newValue: unknown,
    options?: ParamOptions
  ) => void;
  clear: (key: string) => void;
  resetAllParams: () => void;
  matches: (key: string, value: unknown, options?: ParamOptions) => boolean;
  getAll: (options?: ParamOptions) => Record<string, unknown>;
  setMany: (
    params: Record<string, unknown | unknown[]>,
    options?: ParamOptions
  ) => void;
  getWithDefault: <T>(
    key: string,
    defaultValue: T,
    options?: ParamOptions
  ) => T;
  params: URLSearchParams;
}
```
