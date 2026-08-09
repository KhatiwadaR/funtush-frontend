"use client";
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';

interface FilterProps {
  starFilter: string;
  setStarFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
}

export function ReviewFilterToolbar({
  starFilter,
  setStarFilter,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
}: FilterProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between my-4 w-full">
      <div className="flex flex-wrap gap-3 items-center w-full md:w-auto">
        {/* Star Rating Filter */}
        <div className="relative flex items-center">
          <FilterListIcon className="absolute left-3 text-slate-400 pointer-events-none" fontSize="small" />
          <select
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg pl-9 pr-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer w-full md:w-auto"
            value={starFilter}
            onChange={(e) => {
              const newValue = e.target.value;
              console.log("👉 [Toolbar Dropdown] Star Filter Changed To:", newValue);
              setStarFilter(newValue);
            }}
          >
            <option value="all">All Star Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        {/* Status Filter */}
        <select
          className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer w-full md:w-auto"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Not Responded</option>
          <option value="responded">Responded</option>
        </select>
      </div>

      {/* Sorting Dropdown */}
      <div className="relative flex items-center w-full md:w-auto justify-end">
        <SortIcon className="absolute left-3 text-slate-400 pointer-events-none" fontSize="small" />
        <select
          className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg pl-9 pr-4 py-2 outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer w-full md:w-auto"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="lowest">Lowest Rating</option>
        </select>
      </div>
    </div>
  );
}