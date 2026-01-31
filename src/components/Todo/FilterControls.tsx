import React from 'react';
import { FilterType } from './TodoApp';

interface FilterControlsProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  stats: {
    total: number;
    active: number;
    completed: number;
  };
}

const FilterControls: React.FC<FilterControlsProps> = ({ filter, setFilter, stats }) => {
  const filters: { type: FilterType; label: string; count: number }[] = [
    { type: 'all', label: 'All', count: stats.total },
    { type: 'active', label: 'Active', count: stats.active },
    { type: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
      {filters.map(({ type, label, count }) => (
        <button
          key={type}
          onClick={() => setFilter(type)}
          className={`filter-btn flex-1 ${
            filter === type ? 'filter-btn-active' : 'filter-btn-inactive'
          }`}
        >
          {label}
          <span className={`ml-1.5 text-xs ${filter === type ? 'opacity-80' : 'opacity-60'}`}>
            ({count})
          </span>
        </button>
      ))}
    </div>
  );
};

export default FilterControls;
