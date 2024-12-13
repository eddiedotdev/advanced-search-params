# @urlkit/search-params

[![npm version](https://badge.fury.io/js/%40urlkit%2Fsearch-params.svg)](https://www.npmjs.com/package/@urlkit/search-params)
[![jsDelivr hits](https://data.jsdelivr.com/v1/package/npm/@urlkit/search-params/badge)](https://www.jsdelivr.com/package/npm/@urlkit/search-params)
[![unpkg](https://img.shields.io/badge/unpkg-available-success)](https://unpkg.com/@urlkit/search-params/)

`@urlkit/search-params` is a type-safe URL search parameter management library for JavaScript applications. It provides a simple, consistent API for reading and updating URL parameters while maintaining browser history and state. The library supports complex data types, arrays, and includes dedicated integrations for React, Next.js, and vanilla JavaScript projects.

# Getting Started

## Installation

<details>
<summary>npm</summary>

```bash
npm install @urlkit/search-params
```

</details>

<details>
<summary>yarn</summary>

```bash
yarn add @urlkit/search-params
```

</details>

<details>
<summary>pnpm</summary>

```bash
pnpm add @urlkit/search-params
```

</details>

<details>
<summary>bun</summary>

```bash
bun add @urlkit/search-params
```

</details>

### CDN Usage

For vanilla JavaScript projects, you can include UseSearchParams directly via CDN:

```html
<!-- Using unpkg -->
<script src="https://unpkg.com/@urlkit/search-params/cdn/urlkit-search-params.iife.min.js"></script>

<!-- Using jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@urlkit/search-params/cdn/urlkit-search-params.iife.min.js"></script>
```

## Framework Setup

### React

1. Wrap your app with the provider:

```tsx
import { SearchParamsProvider } from "use-search-params";

function App() {
  return (
    <SearchParamsProvider provider="react">
      <YourApp />
    </SearchParamsProvider>
  );
}
```

2. Use the hook in your components:

```tsx
import { useSearchParams } from "use-search-params";

function SearchableContent() {
  const { get, set, getWithDefault } = useSearchParams();

  // Basic string value
  const view = get<string>("view") ?? "grid";

  // Array with forced array return
  const tags = get<string[]>("tags", { forceArray: true });

  // Complex object with parsing
  const filters = get<{ status: string }>("filters", { parse: true });

  return (
    <div>
      <div>Current View: {view}</div>
      {/* Rest of Component */}
    </div>
  );
}
```

### Next.js

1. Create a client-side component:

```tsx
"use client";

import { useSearchParams } from "use-search-params";

export function SearchFilters() {
  const { get, set, getWithDefault } = useSearchParams();

  return <div>{/* Rest of Component */}</div>;
}
```

2. Use in your pages:

```tsx
import { SearchParamsProvider } from "use-search-params";
import { SearchFilters } from "./search-filters";

export default function Page() {
  return (
    <SearchParamsProvider provider="next">
      <SearchFilters />
    </SearchParamsProvider>
  );
}
```

### Vanilla JavaScript

```javascript
import { createSearchParams } from "use-search-params/vanilla";

const params = createSearchParams();

// Get values
const view = params.get("view");

// Set values
params.set("view", "grid");

// Handle arrays
params.add("tags", ["react", "typescript"]);

// Parse complex objects
const filters = params.get("filters", { parse: true });
```

## TypeScript Support

The library is written in TypeScript and includes built-in type definitions:

```typescript
interface Filters {
  status: "active" | "inactive";
  tags: string[];
}

const filters = get<Filters>("filters", { parse: true });
```

## Core Features

- **Type-safe operations**: Full TypeScript support
- **Multiple value handling**: Support for array values
- **Complex object support**: Parse and serialize JSON objects
- **Framework adapters**: Seamless integration with Next.js and React Router
- **URL state management**: Preserve and update URL parameters

## Next Steps

- Check out the [Core Concepts](https://github.com/eddiedotdev/urlkit-search-params/blob/main/docs/core-concepts.md) guide
- See [Examples](https://github.com/eddiedotdev/urlkit-search-params/tree/main/examples) for complete implementations
- Read the [API Reference](https://github.com/eddiedotdev/urlkit-search-params/blob/main/docs/api-reference.md) for detailed documentation

## Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/CONTRIBUTING.md) for details.

## License

MIT © [eddiedotdev](https://github.com/eddiedotdev)
