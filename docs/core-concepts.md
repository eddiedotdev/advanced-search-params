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

## Framework Integration

The library provides dedicated adapters for popular frameworks to enable seamless integration with their routing systems.

### Next.js App Router

```tsx
import { useNextSearchParams } from "@use-search-params/next";

export default function Page() {
  const { get, set } = useNextSearchParams();

  // Use with Next.js App Router
  const status = get<string>("status");

  return <button onClick={() => set("status", "active")}>Set Status</button>;
}
```

### React Router

```tsx
import { useReactRouterSearchParams } from "@use-search-params/react-router";

function Component() {
  const { get, set } = useReactRouterSearchParams();

  // Use with React Router
  const filters = get<string[]>("filters", { forceArray: true });

  return (
    <button onClick={() => set("filters", ["new", "active"])}>
      Update Filters
    </button>
  );
}
```

### Remix

```tsx
import { useRemixSearchParams } from "@use-search-params/remix";

function Component() {
  const { get, set } = useRemixSearchParams();

  // Use with Remix
  const page = get<number>("page", { parse: true }) ?? 1;

  return <button onClick={() => set("page", page + 1)}>Next Page</button>;
}
```

### SolidJS

```tsx
import { useSolidSearchParams } from "@use-search-params/solid";

function Component() {
  const { get, set } = useSolidSearchParams();

  // Use with SolidJS
  const view = get<string>("view") ?? "grid";

  return <button onClick={() => set("view", "list")}>Change View</button>;
}
```

Each adapter provides the same consistent API while integrating with the framework's native routing system. This ensures you get the best of both worlds: a unified interface for handling search parameters and seamless integration with your chosen framework.
