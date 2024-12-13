// @ts-nocheck

import { useSearchParams, SearchParamsProvider } from "use-search-params";

export default function App() {
  return (
    <SearchParamsProvider provider="next">
      <ColorPicker />
    </SearchParamsProvider>
  );
}

function ColorPicker() {
  const { getWithDefault, set, matches } = useSearchParams();

  const color = getWithDefault("color", "blue");
  const size = getWithDefault("size", "medium");

  const colors = ["blue", "red", "green", "yellow"];
  const sizes = ["small", "medium", "large"];

  return (
    <div>
      <h2>Color Picker</h2>

      <div>
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => set("color", [c])}
            style={{
              backgroundColor: c,
              border: matches("color", c) ? "2px solid black" : "none",
              padding: "10px",
              margin: "5px",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <div>
        <select value={size} onChange={(e) => set("size", [e.target.value])}>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          backgroundColor: color,
          width:
            size === "small" ? "100px" : size === "medium" ? "200px" : "300px",
          height: "100px",
          margin: "20px 0",
        }}
      />
    </div>
  );
}
