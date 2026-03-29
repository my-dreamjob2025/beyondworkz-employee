const Pagination = ({ page = 1, totalPages = 1, onPageChange, disabled }) => {
  if (totalPages <= 1) return null;

  const go = (p) => {
    if (disabled || p < 1 || p > totalPages) return;
    onPageChange?.(p);
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
      <button
        type="button"
        disabled={disabled || page <= 1}
        onClick={() => go(page - 1)}
        className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ‹ Previous
      </button>

      <span className="text-sm text-slate-600 px-2">
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        disabled={disabled || page >= totalPages}
        onClick={() => go(page + 1)}
        className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next ›
      </button>
    </div>
  );
};

export default Pagination;
