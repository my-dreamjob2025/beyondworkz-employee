import { useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import SearchBar from "../../components/jobsearch/SearchBar";
import FiltersSidebar from "../../components/jobsearch/FiltersSidebar";
import ResultsHeader from "../../components/jobsearch/ResultsHeader";
import JobCard from "../../components/jobsearch/JobCard";
import Pagination from "../../components/jobsearch/Pagination";
import EmployerCard from "../../components/jobsearch/EmployerCard";
import FAQSection from "../../components/jobsearch/FAQSection";
import TestimonialsStrip from "../../components/jobsearch/TestimonialsStrip";

import { jobs } from "../../data/jobs";
import { filters } from "../../data/filter";

const JobSearchPage = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 pb-12">
        <SearchBar />

        <section className="py-6 md:py-8 lg:py-10">
          <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
            {/* Mobile filters toggle */}
            <div className="lg:hidden mb-4">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)_minmax(0,300px)] gap-6 lg:gap-8 items-start">
              <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
                <FiltersSidebar filters={filters} />
              </div>

              {/* CENTER - JOB LIST */}
              <div className="space-y-5 lg:space-y-6 min-w-0 order-first lg:order-none">
                <ResultsHeader />

                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}

                <div className="pt-4">
                  <Pagination />
                </div>
              </div>

              <EmployerCard />
            </div>
          </div>
        </section>

        <FAQSection />
        <TestimonialsStrip />
      </main>

      <Footer />
    </>
  );
};

export default JobSearchPage;
