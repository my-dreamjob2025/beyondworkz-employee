import { PUBLIC_JOB_CITY_OPTIONS, PUBLIC_JOB_TYPE_OPTIONS } from "../../constants/publicJobFilters";

const FiltersSidebar = ({
  selectedCity = "",
  selectedJobType = "",
  onCityChange,
  onJobTypeChange,
  onClear,
  disabled = false,
}) => {
  const hasActive = Boolean(selectedCity || selectedJobType);

  return (
    <aside className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-5">
        <h2 className="text-base sm:text-lg font-semibold text-slate-900">Filters</h2>
        <button
          type="button"
          onClick={() => onClear?.()}
          disabled={disabled || !hasActive}
          className="text-sm text-blue-600 hover:underline disabled:opacity-40 disabled:no-underline shrink-0"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="filter-city" className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
            City
          </label>
          <select
            id="filter-city"
            value={selectedCity}
            onChange={(e) => onCityChange?.(e.target.value)}
            disabled={disabled}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 disabled:opacity-60"
          >
            <option value="">All cities</option>
            {PUBLIC_JOB_CITY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-job-type" className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
            Job type
          </label>
          <select
            id="filter-job-type"
            value={selectedJobType}
            onChange={(e) => onJobTypeChange?.(e.target.value)}
            disabled={disabled}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 disabled:opacity-60"
          >
            <option value="">All types</option>
            {PUBLIC_JOB_TYPE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
