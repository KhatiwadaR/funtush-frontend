import { Input } from "@/components/ui/input";
import { useTheme } from "@/context/theme";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function BlogFilter() {
  const { isDark } = useTheme();

  const inputClass = isDark
    ? "border-[#615B5B] bg-[#111B3A] text-white placeholder-[#615B5B]"
    : "border-neutral-300 bg-white text-neutral-900 placeholder-neutral-500";

  const selectClass = isDark
    ? "border-[#615B5B] bg-[#111B3A] text-[#615B5B]"
    : "border-neutral-300 bg-white text-neutral-600";

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
        <div className="relative flex items-center">
          <SearchIcon className="absolute left-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
          <Input
            id="search"
            placeholder="Search blogs"
            className={`${inputClass} rounded-xl pl-10 pr-4 py-3 text-xs w-full shadow-sm`}
          />
        </div>

        <select
          id="category"
          className={`w-full rounded-xl border px-3.5 py-3 text-xs focus:outline-none focus:ring-2 shadow-sm ${selectClass}`}
          defaultValue=""
        >
          <option value="" disabled>
            Category
          </option>
          <option value="festival">Festival</option>
          <option value="announcement">Announcement</option>
          <option value="event">Event</option>
          <option value="notice">Notice</option>
        </select>

        <select
          id="status"
          className={`w-full rounded-xl border px-3.5 py-3 text-xs focus:outline-none focus:ring-2 shadow-sm ${selectClass}`}
          defaultValue=""
        >
          <option value="" disabled>
            Status
          </option>
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>

        <div className="relative flex items-center">
          <Input
            id="date"
            placeholder="Date"
            className={`${inputClass} rounded-xl pl-4 pr-10 py-3 text-xs w-full shadow-sm`}
          />
          <CalendarTodayIcon className="absolute right-3.5 w-4 h-4 text-neutral-400 pointer-events-none" />
        </div>

        <select
          id="sortBy"
          className={`w-full rounded-xl border px-3.5 py-3 text-xs focus:outline-none focus:ring-2 shadow-sm ${selectClass}`}
          defaultValue=""
        >
          <option value="" disabled>
            Sort By
          </option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title-asc">Title (A–Z)</option>
          <option value="title-desc">Title (Z–A)</option>
          <option value="updated">Recently Updated</option>
        </select>
      </div>
    </div>
  );
}