# API Reference

## Core Hook

### `useSearchParams()`

The main hook for managing URL search parameters.

```tsx
const params = useSearchParams();
```

Returns an object containing all parameter management methods.

## Parsers

### Date and Time Parsers

#### `parseAsTimestamp(options?: ParserOptions<number>)`

Parses string values into Unix timestamps.

```tsx
const timestamp = get<number>("time", {
  parser: parseAsTimestamp({ defaultValue: Date.now() }),
});
```

#### `parseAsIsoDateTime(options?: ParserOptions<Date>)`

Parses ISO 8601 date strings into Date objects.

```tsx
const date = get<Date>("startDate", {
  parser: parseAsIsoDateTime({ defaultValue: new Date() }),
});
```

### Enum and String Parsers

#### `parseAsStringEnum<T extends string>(enumValues: readonly T[], options?: ParserOptions<T>)`

Type-safe parsing for string enums with validation.

```tsx
const StatusEnum = ["active", "inactive"] as const;
type Status = (typeof StatusEnum)[number];

const status = get<Status>("status", {
  parser: parseAsStringEnum(StatusEnum, { defaultValue: "active" }),
});
```

### Number Parser

#### `parseAsNumber(options?: ParserOptions<number> & { min?: number; max?: number })`

Parses numbers with optional range validation.

```tsx
const count = get<number>("count", {
  parser: parseAsNumber({
    defaultValue: 0,
    min: 0,
    max: 100,
  }),
});
```

### Boolean Parser

#### `parseAsBoolean(options?: ParserOptions<boolean>)`

Parses boolean values from strings.

```tsx
const isActive = get<boolean>("active", {
  parser: parseAsBoolean({ defaultValue: false }),
});
```

### Parser Types

#### `ParserOptions<T>`

Configuration options for parsers.

```typescript
interface ParserOptions<T> {
  defaultValue?: T;
  validate?: (value: T) => boolean;
}
```

#### `Parser<T>`

Interface for creating custom parsers.

```typescript
interface Parser<T> {
  parse: (value: string) => T | undefined;
  serialize: (value: T) => string;
  validate?: (value: T) => boolean;
}
```

### Creating Custom Parsers

You can create custom parsers by implementing the `Parser` interface:

```typescript
const customParser: Parser<MyType> = {
  parse: (value: string) => {
    // Custom parsing logic
    return parsed;
  },
  serialize: (value: MyType) => {
    // Custom serialization logic
    return serialized;
  },
  validate: (value: MyType) => {
    // Optional validation
    return isValid;
  },
};

// Usage
const value = get<MyType>("key", { parser: customParser });
```

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
