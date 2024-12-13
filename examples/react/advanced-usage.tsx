// @ts-nocheck

import { useSearchParams, SearchParamsProvider } from "use-search-params";

export default function App() {
  return (
    <SearchParamsProvider provider="react">
      <ImageGallery />
    </SearchParamsProvider>
  );
}

interface GalleryFilters {
  categories: string[];
  minRating: number;
  layout: "grid" | "masonry";
}

function ImageGallery() {
  const { getJson, setJson, getWithDefault, toggle, resetAllParams } =
    useSearchParams();

  // Complex state management
  const filters = getJson<GalleryFilters>("filters") ?? {
    categories: [],
    minRating: 0,
    layout: "grid",
  };

  // Simple boolean toggles
  const showSidebar = getWithDefault("sidebar", "true") === "true";

  // Handle filter updates
  const updateFilters = (updates: Partial<GalleryFilters>) => {
    setJson("filters", {
      ...filters,
      ...updates,
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <button onClick={() => toggle("sidebar")}>
        {showSidebar ? "Hide" : "Show"} Sidebar
      </button>

      {showSidebar && (
        <div style={{ width: "200px", padding: "20px" }}>
          <h3>Filters</h3>

          <div>
            <h4>Categories</h4>
            {["nature", "architecture", "people", "animals"].map((category) => (
              <label key={category}>
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...filters.categories, category]
                      : filters.categories.filter((c) => c !== category);
                    updateFilters({ categories: newCategories });
                  }}
                />
                {category}
              </label>
            ))}
          </div>

          <div>
            <h4>Minimum Rating</h4>
            <input
              type="range"
              min="0"
              max="5"
              value={filters.minRating}
              onChange={(e) =>
                updateFilters({ minRating: Number(e.target.value) })
              }
            />
            {filters.minRating} stars
          </div>

          <div>
            <h4>Layout</h4>
            <select
              value={filters.layout}
              onChange={(e) =>
                updateFilters({ layout: e.target.value as "grid" | "masonry" })
              }
            >
              <option value="grid">Grid</option>
              <option value="masonry">Masonry</option>
            </select>
          </div>

          <button onClick={resetAllParams}>Reset All</button>
        </div>
      )}

      <div style={{ flex: 1, padding: "20px" }}>
        <pre>
          Current Filters:
          {JSON.stringify(filters, null, 2)}
        </pre>
        {/* Gallery content would go here */}
      </div>
    </div>
  );
}
