import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  name: string;
  key: string;
  options: FilterOption[];
}

interface ProductFiltersProps {
  filters: FilterGroup[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterKey: string, value: string, checked: boolean) => void;
  onClearAll: () => void;
}

export function ProductFilters({ filters, activeFilters, onFilterChange, onClearAll }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters = Object.values(activeFilters).some(values => values.length > 0);

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
              {Object.values(activeFilters).flat().length}
            </span>
          )}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={onClearAll}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="space-y-6">
            {filters.map((filterGroup) => (
              <div key={filterGroup.key}>
                <h4 className="font-medium text-slate-900 mb-3">{filterGroup.name}</h4>
                <div className="space-y-2">
                  {filterGroup.options.map((option) => (
                    <label key={option.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={activeFilters[filterGroup.key]?.includes(option.id) || false}
                        onChange={(e) => onFilterChange(filterGroup.key, option.id, e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-slate-700">{option.label}</span>
                      {option.count && (
                        <span className="ml-auto text-xs text-slate-400">({option.count})</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            <div className="p-4 space-y-6 overflow-y-auto h-full pb-20">
              {filters.map((filterGroup) => (
                <div key={filterGroup.key}>
                  <h4 className="font-medium text-slate-900 mb-3">{filterGroup.name}</h4>
                  <div className="space-y-2">
                    {filterGroup.options.map((option) => (
                      <label key={option.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={activeFilters[filterGroup.key]?.includes(option.id) || false}
                          onChange={(e) => onFilterChange(filterGroup.key, option.id, e.target.checked)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-slate-700">{option.label}</span>
                        {option.count && (
                          <span className="ml-auto text-xs text-slate-400">({option.count})</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200">
              <div className="flex space-x-3">
                <button
                  onClick={onClearAll}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Clear all
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}