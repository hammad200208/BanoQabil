import { ChevronDown, Filter, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  onFilterChange?: (filters: Record<string, string>) => void;
  filters?: Record<string, string>;
}

const filterGroups = [
  {
    name: "Program",
    options: [
      { label: "Bano Qabil KPK", value: "bqkpk" },
    ],
  },
  {
    name: "Phase",
    options: [
      { label: "Phase 1", value: "p1" },
      { label: "Phase 2", value: "p2" },
      { label: "Phase 3", value: "p3" },
    ],
  },
  {
    name: "Season",
    options: [
      { label: "Spring 2026", value: "sp26" },
      { label: "Summer 2026", value: "s26" },
      { label: "Winter 2026", value: "w26" },
      { label: "Autumn 2026", value: "a26" },
    ],
  },
  {
    name: "Region",
    options: [
      { label: "South KPK", value: "south" },
      { label: "North KPK", value: "north" },
    ],
  },
  {
    name: "District",
    options: [
      { label: "Peshawar", value: "psh" },
      { label: "Swat", value: "swat" },
      { label: "Mardan", value: "mrd" },
      { label: "DI Khan", value: "dik" },
      { label: "Upper Dir", value: "udir" },
      { label: "Abbottabad", value: "abb" },
    ],
  },
];

export function FilterBar({ onFilterChange, filters = {} }: FilterBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleSelect = (groupName: string, value: string, label: string) => {
    const newFilters = { ...filters, [groupName]: label };
    setOpenDropdown(null);
    onFilterChange?.(newFilters);
  };

  const clearFilter = (groupName: string) => {
    const newFilters = { ...filters };
    delete newFilters[groupName];
    onFilterChange?.(newFilters);
  };

  const clearAll = () => {
    onFilterChange?.({});
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span>Filters:</span>
        </div>

        {filterGroups.map((group) => (
          <div key={group.name} className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === group.name ? null : group.name)}
              className={cn(
                "filter-button",
                filters[group.name] && "bg-primary/10 border-primary/30 text-primary"
              )}
            >
              <span>{filters[group.name] || group.name}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {openDropdown === group.name && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-card rounded-lg border border-border shadow-lg z-50 py-1 animate-fade-in">
                {group.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(group.name, option.value, option.label)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {Object.keys(filters).length > 0 && (
          <>
            <div className="h-6 w-px bg-border" />
            {Object.entries(filters).map(([key, value]) => (
              <span
                key={key}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm"
              >
                {value}
                <button
                  onClick={() => clearFilter(key)}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={clearAll}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear all
            </button>
          </>
        )}
      </div>
    </div>
  );
}
