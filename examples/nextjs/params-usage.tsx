// @ts-nocheck

"use client";

import { useSearchParams } from "use-search-params";

interface FilterConfig {
  categories: string[];
  dateRange: {
    start: string;
    end: string;
  };
  sortBy: "date" | "name";
  isActive: boolean;
}

interface UserPreferences {
  theme: "light" | "dark";
  fontSize: number;
  notifications: boolean;
}

function AdvancedFilters() {
  const { get, set, getWithDefault } = useSearchParams();

  // Basic string usage (no parsing needed)
  const view = get("view");
  set("view", "grid");

  // Array of strings (no parsing needed)
  const tags = get<string[]>("tags");
  set("tags", ["react", "typescript"]);

  // Complex object with parsing
  const filters = get<FilterConfig>("filters", { parse: true });
  set(
    "filters",
    {
      categories: ["electronics", "books"],
      dateRange: {
        start: "2024-01-01",
        end: "2024-12-31",
      },
      sortBy: "date",
      isActive: true,
    },
    { serialize: true }
  );

  // Using with default values
  const preferences = get<UserPreferences>("prefs", { parse: true }) ?? {
    theme: "light",
    fontSize: 16,
    notifications: true,
  };

  const handleUpdatePreferences = (newPrefs: Partial<UserPreferences>) => {
    set(
      "prefs",
      {
        ...preferences,
        ...newPrefs,
      },
      { serialize: true }
    );
  };

  return (
    <div>
      <h2>Advanced Filters Example</h2>

      {/* View Toggle */}
      <select value={view} onChange={(e) => set("view", e.target.value)}>
        <option value="grid">Grid</option>
        <option value="list">List</option>
      </select>

      {/* Tags Selection */}
      <div>
        {["react", "typescript", "nextjs"].map((tag) => (
          <button
            key={tag}
            onClick={() =>
              set(
                "tags",
                tags?.includes(tag)
                  ? tags.filter((t) => t !== tag)
                  : [...(tags || []), tag]
              )
            }
            style={{
              backgroundColor: tags?.includes(tag) ? "blue" : "gray",
              color: "white",
              margin: "4px",
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Preferences Controls */}
      <div>
        <button
          onClick={() =>
            handleUpdatePreferences({
              theme: preferences.theme === "light" ? "dark" : "light",
            })
          }
        >
          Toggle Theme
        </button>
        <input
          type="range"
          value={preferences.fontSize}
          onChange={(e) =>
            handleUpdatePreferences({ fontSize: Number(e.target.value) })
          }
          min="12"
          max="24"
        />
      </div>

      {/* Debug View */}
      <div style={{ marginTop: "20px" }}>
        <h3>Current URL Parameters:</h3>
        <pre>
          {JSON.stringify(
            {
              view,
              tags,
              filters,
              preferences,
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SearchParamsProvider provider="next">
      <AdvancedFilters />
    </SearchParamsProvider>
  );
}
