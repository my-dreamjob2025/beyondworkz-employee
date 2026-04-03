import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import AuthenticatedShell from "../../components/layout/AuthenticatedShell";
import useAuth from "../../hooks/useAuth";

import SearchBar from "../../components/jobsearch/SearchBar";
import FiltersSidebar from "../../components/jobsearch/FiltersSidebar";
import ResultsHeader from "../../components/jobsearch/ResultsHeader";
import JobCard from "../../components/jobsearch/JobCard";
import Pagination from "../../components/jobsearch/Pagination";
import FAQSection from "../../components/jobsearch/FAQSection";
import TestimonialsStrip from "../../components/jobsearch/TestimonialsStrip";

import { fetchPublishedJobs } from "../../services/jobsService";
import { toJobCardModel } from "../../utils/jobDisplay";

const PAGE_SIZE = 20;

const JobSearchPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [draftQ, setDraftQ] = useState("");
  const [draftCity, setDraftCity] = useState("");
  const [appliedQ, setAppliedQ] = useState("");
  const [appliedCity, setAppliedCity] = useState("");
  const [appliedJobType, setAppliedJobType] = useState("");

  const applySearch = () => {
    setAppliedQ(draftQ.trim());
    setAppliedCity(draftCity.trim());
    setPage(1);
  };

  const handleCityFilter = (value) => {
    setAppliedCity(value);
    setDraftCity(value);
    setPage(1);
  };

  const handleJobTypeFilter = (value) => {
    setAppliedJobType(value);
    setPage(1);
  };

  const clearFilters = () => {
    setDraftQ("");
    setDraftCity("");
    setAppliedQ("");
    setAppliedCity("");
    setAppliedJobType("");
    setPage(1);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchPublishedJobs({
          page,
          limit: PAGE_SIZE,
          q: appliedQ || undefined,
          city: appliedCity || undefined,
          jobType: appliedJobType || undefined,
        });
        if (cancelled) return;
        if (res.success && Array.isArray(res.jobs)) {
          setJobs(res.jobs.map(toJobCardModel));
          setTotal(typeof res.total === "number" ? res.total : res.jobs.length);
          setTotalPages(typeof res.totalPages === "number" ? res.totalPages : 1);
        } else {
          setError(res.message || "Could not load jobs.");
          setJobs([]);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.response?.data?.message || e.message || "Could not load jobs.");
          setJobs([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [page, appliedQ, appliedCity, appliedJobType]);

  const pagePadding = user ? "" : "px-4 sm:px-6 lg:px-8";

  const body = (
    <>
      <SearchBar
        query={draftQ}
        onQueryChange={setDraftQ}
        location={draftCity}
        onLocationChange={setDraftCity}
        onSubmit={applySearch}
        disabled={loading}
      />

      <section className={`py-6 md:py-8 lg:py-10 ${user ? "pb-8" : ""}`}>
        <div className={`mx-auto w-full max-w-[1400px] ${pagePadding}`}>
            <div className="lg:hidden mb-4">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 w-full sm:w-auto justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                {showFilters ? "Hide filters" : "Show filters"}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
              <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
                <FiltersSidebar
                  selectedCity={appliedCity}
                  selectedJobType={appliedJobType}
                  onCityChange={handleCityFilter}
                  onJobTypeChange={handleJobTypeFilter}
                  onClear={clearFilters}
                  disabled={loading}
                />
              </div>

              <div className="space-y-5 lg:space-y-6 min-w-0 order-first lg:order-none">
                <ResultsHeader total={total} page={page} limit={PAGE_SIZE} />

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 text-red-800 px-4 py-3 text-sm">
                    {error}
                  </div>
                )}

                {loading ? (
                  <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-500 text-sm">
                    Loading open roles…
                  </div>
                ) : jobs.length === 0 && !error ? (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 sm:p-10 text-center text-slate-600 text-sm">
                    <p className="font-medium text-slate-900">No matching jobs</p>
                    <p className="mt-2 max-w-md mx-auto">
                      Try different keywords, clear filters, or check back when employers publish new roles.
                    </p>
                    {(appliedQ || appliedCity || appliedJobType) && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="mt-4 text-sm font-semibold text-blue-600 hover:underline"
                      >
                        Clear all filters
                      </button>
                    )}
                    <Link
                      to="/dashboard"
                      className="block mt-4 text-sm font-semibold text-blue-600 hover:underline"
                    >
                      Go to dashboard
                    </Link>
                  </div>
                ) : (
                  jobs.map((job) => <JobCard key={job.id} job={job} />)
                )}

                <div className="pt-4">
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
        </div>
      </section>

      {!user ? (
        <>
          <FAQSection />
          <TestimonialsStrip />
        </>
      ) : null}
    </>
  );

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) {
    return <AuthenticatedShell>{body}</AuthenticatedShell>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 pb-12">{body}</main>
      <Footer />
    </>
  );
};

export default JobSearchPage;
