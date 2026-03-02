'use client';

import { JOB_CATEGORIES, JOB_TYPES, JobFilters } from '@/lib/types';
import { Search, MapPin, ChevronDown } from 'lucide-react';

interface JobFiltersProps {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
}

export default function JobFiltersPanel({ filters, onChange }: JobFiltersProps) {
  const handleChange = (key: keyof JobFilters, value: string) => {
    onChange({ ...filters, [key]: value || undefined, page: 1 });
  };

  return (
    <aside className="w-full lg:w-64 xl:w-72 flex-shrink-0 space-y-6">
      {/* Category */}
      <div className="bg-white border border-neutrals-20 rounded-md p-5">
        <h3 className="font-semibold text-neutrals-100 mb-4 text-body-lg">Category</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="category"
              value=""
              checked={!filters.category}
              onChange={() => handleChange('category', '')}
              className="accent-primary"
            />
            <span className="text-body-md text-neutrals-80 group-hover:text-neutrals-100">
              All Categories
            </span>
          </label>
          {JOB_CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={filters.category === cat}
                onChange={() => handleChange('category', cat)}
                className="accent-primary"
              />
              <span className="text-body-md text-neutrals-80 group-hover:text-neutrals-100">
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Job Type */}
      <div className="bg-white border border-neutrals-20 rounded-md p-5">
        <h3 className="font-semibold text-neutrals-100 mb-4 text-body-lg">Job Type</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="type"
              value=""
              checked={!filters.type}
              onChange={() => handleChange('type', '')}
              className="accent-primary"
            />
            <span className="text-body-md text-neutrals-80 group-hover:text-neutrals-100">
              All Types
            </span>
          </label>
          {JOB_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="type"
                value={type}
                checked={filters.type === type}
                onChange={() => handleChange('type', type)}
                className="accent-primary"
              />
              <span className="text-body-md text-neutrals-80 group-hover:text-neutrals-100">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => onChange({ page: 1 })}
        className="w-full text-body-sm text-neutrals-60 hover:text-error transition-colors py-2 text-center"
      >
        Clear all filters
      </button>
    </aside>
  );
}
