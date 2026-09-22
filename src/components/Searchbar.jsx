import { Search } from "lucide-react";
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
function Searchbar({
  query,
  setQuery,
  selectedDay,
  setSelectedDay,
  selectedMuscle,
  setSelectedMuscle,
  muscleGroups,
  onClear,
}) {
  const hasFilters = query || selectedDay || selectedMuscle;
  return (
    <div className="my-5 flex flex-wrap items-center gap-2">
      <label className="flex h-10 min-w-full flex-1 items-center gap-2 rounded-lg border border-[#353d42] bg-[#20262a] px-3 text-[#84939c] sm:min-w-[290px]">
        <Search size={17} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search exercises or muscle groups"
          aria-label="Search exercises or muscle groups"
          className="min-w-0 flex-1 bg-transparent text-xs text-[#f4f7f8] outline-none placeholder:text-[#84939c]"
        />
      </label>
      <select
        value={selectedDay}
        onChange={(event) => setSelectedDay(event.target.value)}
        aria-label="Filter by day"
        className="h-10 rounded-lg border border-[#353d42] bg-[#20262a] px-3 text-xs text-[#c7d0d5] outline-none focus:border-[#4fdbc0]"
      >
        <option value="">All days</option>
        {days.map((day) => (
          <option key={day}>{day}</option>
        ))}
      </select>
      <select
        value={selectedMuscle}
        onChange={(event) => setSelectedMuscle(event.target.value)}
        aria-label="Filter by muscle group"
        className="h-10 rounded-lg border border-[#353d42] bg-[#20262a] px-3 text-xs text-[#c7d0d5] outline-none focus:border-[#4fdbc0]"
      >
        <option value="">All muscles</option>
        {muscleGroups.map((group) => (
          <option key={group}>{group}</option>
        ))}
      </select>
      {hasFilters && (
        <button
          onClick={onClear}
          className="px-2 text-xs font-bold text-[#69cbbb] hover:text-white"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
export default Searchbar;
