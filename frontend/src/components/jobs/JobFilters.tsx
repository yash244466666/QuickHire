'use client';

import { JOB_CATEGORIES, JOB_TYPES, JobFilters } from '@/lib/types';

interface JobFiltersProps {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
}

// Approximate job counts per type (display only)
const TYPE_COUNTS: Record<string, number> = {
  'Full-Time': 573,
  'Part-Time': 182,
  Remote: 216,
  Contract: 64,
  Internship: 74,
};

const CATEGORY_COUNTS: Record<string, number> = {
  Design: 235,
  Sales: 756,
  Marketing: 310,
  Finance: 89,
  Engineering: 542,
  Business: 178,
  HR: 143,
  Tech: 621,
};

export default function JobFiltersPanel({ filters, onChange }: JobFiltersProps) {
  const handleToggleType = (value: string) => {
    const newType = filters.type === value ? '' : value;
    onChange({ ...filters, type: newType || undefined, page: 1 });
  };

  const handleToggleCategory = (value: string) => {
    const newCat = filters.category === value ? '' : value;
    onChange({ ...filters, category: newCat || undefined, page: 1 });
  };

  const hasActiveFilters = !!(filters.category || filters.type || filters.search || filters.location);

  return (
    <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-neutrals-100 text-body-lg">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={() => onChange({ page: 1, limit: filters.limit })}
            className="text-body-sm text-primary hover:underline"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Type of Employment */}
      <div className="bg-white border border-neutrals-20 rounded-md p-5">
        <h3 className="font-semibold text-neutrals-100 mb-4 text-body-md">Type of Employment</h3>
        <div className="space-y-3">
          {JOB_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.type === type}
                onChange={() => handleToggleType(type)}
                className="w-4 h-4 rounded border-neutrals-40 accent-primary cursor-pointer"
              />
              <span className="text-body-md text-neutrals-80 group-hover:text-neutrals-100 flex-1">
                {type}
              </span>
              <span className="text-body-sm text-neutrals-60">({TYPE_COUNTS[type] ?? ''})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="bg-white border border-neutrals-20 rounded-md p-5">
        <h3 className="font-semibold text-neutrals-100 mb-4 text-body-md">Category</h3>
        <div className="space-y-3">
          {JOB_CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.category === cat}
                onChange={() => handleToggleCategory(cat)}
                className="w-4 h-4 rounded border-neutrals-40 accent-primary cursor-pointer"
              />
              <span className="text-body-md text-neutrals-80 group-hover:text-neutrals-100 flex-1">
                {cat}
              </span>
              <span className="text-body-sm text-neutrals-60">({CATEGORY_COUNTS[cat] ?? ''})</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
