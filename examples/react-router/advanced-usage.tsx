// @ts-nocheck

import { useSearchParams, SearchParamsProvider } from "use-search-params";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <SearchParamsProvider provider="react">
        <SearchableTable />
      </SearchParamsProvider>
    </BrowserRouter>
  );
}

interface TableState {
  sortColumn: string;
  sortDirection: "asc" | "desc";
  selectedRows: string[];
}

function SearchableTable() {
  const { getJson, setJson, getAll, resetAllParams } = useSearchParams();

  // Handle complex state
  const tableState = getJson<TableState>("tableState");

  // Get all current parameters
  const allParams = getAll();

  const handleSort = (column: string) => {
    const currentState = tableState || {
      sortColumn: "",
      sortDirection: "asc",
      selectedRows: [],
    };

    setJson("tableState", {
      ...currentState,
      sortColumn: column,
      sortDirection:
        currentState.sortColumn === column &&
        currentState.sortDirection === "asc"
          ? "desc"
          : "asc",
    });
  };

  return (
    <div>
      <div>
        <button onClick={resetAllParams}>Reset All Filters</button>
        <pre>Current State: {JSON.stringify(allParams, null, 2)}</pre>
      </div>

      <table>
        <thead>
          <tr>
            {["name", "date", "status"].map((column) => (
              <th key={column} onClick={() => handleSort(column)}>
                {column}
                {tableState?.sortColumn === column && (
                  <span>{tableState.sortDirection === "asc" ? "↑" : "↓"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        {/* Table body */}
      </table>
    </div>
  );
}
