const ResultsHeader = ({ total = 0, page = 1, limit = 20 }) => {
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = total === 0 ? 0 : Math.min(page * limit, total);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl bg-white px-5 py-3 shadow-sm">
      <p className="font-medium text-slate-900 text-sm sm:text-base">
        {total === 0
          ? "No open roles match your filters"
          : `Showing ${start}–${end} of ${total} job${total === 1 ? "" : "s"}`}
      </p>

      <select
        className="rounded-full border border-slate-200 px-3 py-1 text-sm w-full sm:w-auto"
        defaultValue="latest"
        aria-label="Sort jobs"
      >
        <option value="latest">Latest</option>
        <option value="relevance">Relevance</option>
        <option value="salary">Salary (high to low)</option>
      </select>
    </div>
  );
};

export default ResultsHeader;
