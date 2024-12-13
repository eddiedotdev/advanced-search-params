// @ts-nocheck

"use client";

import { useSearchParams } from "use-search-params";

export function BasicExample() {
  const { get, set, add, remove } = useSearchParams();

  // Basic string value
  const view = get<string>("view") ?? "grid";

  // Array of values with forced array return
  const tags = get<string[]>("tags", { forceArray: true }) ?? [];

  // Parsed object
  const filters = get<{ status: string }>("filters", { parse: true });

  return (
    <div className="space-y-4">
      <div>
        <h3>View Mode</h3>
        <select value={view} onChange={(e) => set("view", e.target.value)}>
          <option value="grid">Grid</option>
          <option value="list">List</option>
        </select>
      </div>

      <div>
        <h3>Tags</h3>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => remove("tags", tag)}
              className="px-2 py-1 bg-gray-100 rounded"
            >
              {tag} ×
            </button>
          ))}
          <button
            onClick={() => add("tags", "new-tag")}
            className="px-2 py-1 bg-blue-100 rounded"
          >
            Add Tag
          </button>
        </div>
      </div>

      <div>
        <h3>Filters</h3>
        <button
          onClick={() =>
            set("filters", { status: "active" }, { serialize: true })
          }
          className="px-3 py-1 bg-blue-100 rounded"
        >
          Set Filter
        </button>
      </div>
    </div>
  );
}
