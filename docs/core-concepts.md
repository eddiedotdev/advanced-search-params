# Core Methods

### Getting Values

```tsx
const { get, getWithDefault, matches } = useSearchParams();

// Basic get - returns undefined if not found
const value = get<string>("key");

// With default value
const value = getWithDefault("key", "default-value");

// Force array return
const array = get<string[]>("key", { forceArray: true });
// Always returns: [] | [value] | [value1, value2, ...]

// Parse complex objects
const filters = get<{ status: string }>("key", { parse: true });
```

### Setting Values

```tsx
const { set, add, remove } = useSearchParams();

// Basic set (replaces existing values)
set("view", "grid");

// Set multiple values
set("tags", ["react", "typescript"]);

// Set with serialization
set("filters", { status: "active" }, { serialize: true });
```

### Adding Values

```tsx
// Add single value (preserves existing values)
add("tags", "nextjs");

// Add multiple values
add("categories", ["frontend", "backend"]);

// Add with serialization
add("configs", { theme: "dark" }, { serialize: true });
```

### Removing Values

```tsx
// Remove specific value
remove("tags", "react");

// Remove multiple values
remove("categories", ["frontend", "backend"]);

// Clear all values for a key
clear("tags");

// Reset all parameters
resetAllParams();
```

### Updating Values

```tsx
// Update specific value
update("tags", "react", "nextjs");
```

### Checking Values

```tsx
// Check if value exists
const hasTag = matches("tags", "react");

// Check with type parsing
const isActive = matches("status", { state: "active" }, { parse: true });

// Check in array
const hasTags = matches("tags", ["react", "typescript"]);
```

### Batch Operations

```tsx
// Get all current parameters
const allParams = getAll();

// Set multiple parameters at once
setMany(
  {
    view: "grid",
    tags: ["react", "typescript"],
    filters: { status: "active" },
  },
  { serialize: true }
);
```
