# Core Concepts

## Parameter Operations

### Getting Values

```tsx
// Basic get
const value = get<string>("key");

// With default
const value = get<string>("key") ?? "default";

// Force array return
const array = get<string[]>("key", { forceArray: true });

// Parse complex objects
const obj = get<{ status: string }>("key", { parse: true });
```

### Setting Values

```tsx
// Basic set
set("key", "value");

// Set arrays
set("tags", ["react", "typescript"]);

// Set objects
set("filters", { status: "active" }, { serialize: true });
```

## Type Safety

The library is built with TypeScript and provides full type inference:

```tsx
interface Filters {
  status: "active" | "inactive";
  tags: string[];
}

const filters = get<Filters>("filters", { parse: true });
```

## Array Handling

Use `forceArray` when you need consistent array handling:

```tsx
// Without forceArray
const tags = get("tags");
// Could be undefined, "tag1", or ["tag1", "tag2"]

// With forceArray
const tags = get("tags", { forceArray: true });
// Always an array: [], ["tag1"], or ["tag1", "tag2"]
```
