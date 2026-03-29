import searchIcon from "../../assets/icons/common-icon/search.svg";
import locationIcon from "../../assets/icons/common-icon/location.svg";
import { PUBLIC_JOB_CITY_OPTIONS } from "../../constants/publicJobFilters";

const SearchBar = ({
  query = "",
  onQueryChange,
  location = "",
  onLocationChange,
  onSubmit,
  disabled = false,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <div className="bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row sm:items-stretch gap-2 sm:gap-0 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 flex-1 min-w-0">
            <img src={searchIcon} alt="" className="w-5 shrink-0 opacity-60" />
            <input
              type="search"
              enterKeyHint="search"
              placeholder="Job title, keyword, or skill"
              value={query}
              onChange={(e) => onQueryChange?.(e.target.value)}
              disabled={disabled}
              className="w-full min-w-0 text-sm focus:outline-none disabled:opacity-60"
            />
          </div>

          <div className="hidden sm:block w-px bg-slate-200 shrink-0 self-stretch my-3" aria-hidden />

          <div className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 flex-1 min-w-0 border-t sm:border-t-0 border-slate-200">
            <img src={locationIcon} alt="" className="w-5 shrink-0 opacity-60" />
            <input
              type="text"
              list="job-search-city-suggestions"
              placeholder="City (optional)"
              value={location}
              onChange={(e) => onLocationChange?.(e.target.value)}
              disabled={disabled}
              className="w-full min-w-0 text-sm focus:outline-none disabled:opacity-60"
            />
            <datalist id="job-search-city-suggestions">
              {PUBLIC_JOB_CITY_OPTIONS.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>

          <button
            type="submit"
            disabled={disabled}
            className="bg-blue-600 text-white px-6 py-3 sm:py-4 text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none w-full sm:w-auto sm:min-w-[120px] shrink-0"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
