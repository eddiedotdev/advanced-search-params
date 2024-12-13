# Vanilla JavaScript Usage

## CDN Usage

```html
<!-- Using unpkg -->
<script src="https://unpkg.com/use-search-params/cdn/use-search-params.iife.min.js"></script>

<!-- Using jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/use-search-params/cdn/use-search-params.iife.min.js"></script>

<script>
  const params = UseSearchParams.createSearchParams();

  // Get values
  const view = params.get("view");

  // Set values
  params.set("view", "grid");

  // Handle arrays
  params.add("tags", ["react", "typescript"]);
</script>
```

## Module Usage

```js
import { createSearchParams } from "use-search-params/vanilla";

const params = createSearchParams();

// Get values
const view = params.get("view");

// Set values
params.set("view", "grid");

// Handle arrays
params.add("tags", ["react", "typescript"]);
```

## TypeScript Usage

```ts
import { createSearchParams } from "use-search-params/vanilla";

interface Filters {
  status: "active" | "inactive";
  tags: string[];
}

const params = createSearchParams();

// Type-safe operations
const filters = params.get<Filters>("filters", { parse: true });
params.set("filters", { status: "active", tags: [] }, { serialize: true });
```
