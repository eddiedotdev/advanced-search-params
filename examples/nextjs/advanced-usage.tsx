// @ts-nocheck

"use client";

import { useSearchParams } from "@urlkit/search-params";
import {
  parseAsIsoDateTime,
  parseAsStringEnum,
} from "@urlkit/search-params/parsers";

const StatusEnum = ["active", "inactive", "pending"] as const;
type Status = (typeof StatusEnum)[number];

export function AdvancedExample() {
  const { get, setMany, getWithDefault } = useSearchParams();

  // Get complex state with parsing and defaults
  const filters = getWithDefault<FilterState>(
    "filters",
    {
      categories: [],
      dateRange: { start: "", end: "" },
      status: "all",
    },
    { parse: true }
  );

  // Get array values consistently
  const selectedIds = get<string[]>("selected", { forceArray: true }) ?? [];

  // Parse date with ISO format
  const startDate = get<Date>("startDate", {
    parser: parseAsIsoDateTime({
      defaultValue: new Date(),
    }),
  });

  // Parse enum with validation
  const status = get<Status>("status", {
    parser: parseAsStringEnum(StatusEnum, {
      defaultValue: "active",
    }),
  });

  const handleUpdateFilters = (updates: Partial<FilterState>) => {
    setMany(
      {
        filters: { ...filters, ...updates },
      },
      { serialize: true }
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <h3>Categories</h3>
        <select
          multiple
          value={filters.categories}
          onChange={(e) => {
            const selected = Array.from(
              e.target.selectedOptions,
              (opt) => opt.value
            );
            handleUpdateFilters({ categories: selected });
          }}
        >
          <option value="electronics">Electronics</option>
          <option value="books">Books</option>
          <option value="clothing">Clothing</option>
        </select>
      </div>

      <div>
        <h3>Date Range</h3>
        <input
          type="date"
          value={filters.dateRange.start}
          onChange={(e) =>
            handleUpdateFilters({
              dateRange: { ...filters.dateRange, start: e.target.value },
            })
          }
        />
        <input
          type="date"
          value={filters.dateRange.end}
          onChange={(e) =>
            handleUpdateFilters({
              dateRange: { ...filters.dateRange, end: e.target.value },
            })
          }
        />
      </div>

      <div>
        <h3>Status</h3>
        <select
          value={filters.status}
          onChange={(e) =>
            handleUpdateFilters({
              status: e.target.value as FilterState["status"],
            })
          }
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
}
