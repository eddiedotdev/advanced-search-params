// @ts-nocheck

import { useSearchParams, SearchParamsProvider } from "use-search-params";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <SearchParamsProvider provider="react-router">
        <nav>
          <Link to="/tags">Tags</Link>
          <Link to="/filters">Filters</Link>
        </nav>

        <Routes>
          <Route path="/tags" element={<TagSelector />} />
          <Route path="/filters" element={<FiltersPage />} />
        </Routes>
      </SearchParamsProvider>
    </BrowserRouter>
  );
}

function TagSelector() {
  const { get, add, remove, matches, setMany, navigate } = useSearchParams();
  const selectedTags = get<string[]>("tags") ?? [];

  const tags = ["typescript", "react", "nextjs", "nodejs"];

  const handleApplyTags = () => {
    setMany({
      tags: selectedTags,
    });
    navigate("/filters");
  };

  return (
    <div>
      <h2>Select Tags</h2>

      <div>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() =>
              matches("tags", tag) ? remove("tags", tag) : add("tags", tag)
            }
            style={{
              backgroundColor: matches("tags", tag) ? "blue" : "gray",
              color: "white",
              margin: "0 4px",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      <div style={{ margin: "20px 0" }}>
        Selected: {selectedTags.join(", ")}
      </div>

      <button onClick={handleApplyTags}>Apply Tags and Go to Filters</button>
    </div>
  );
}

function FiltersPage() {
  const { getJson, setJson } = useSearchParams();

  const filters = getJson<{ tags: string[] }>("filters") ?? { tags: [] };

  return (
    <div>
      <h2>Filters Page</h2>
      <pre>{JSON.stringify(filters, null, 2)}</pre>
    </div>
  );
}
