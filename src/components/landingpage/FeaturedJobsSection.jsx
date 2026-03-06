import React, { useState } from "react";

import TechCorp from "../../assets/TechCorp.svg";
import Buildlt from "../../assets/Test.svg";
import Creative from "../../assets/Creative.svg";

const jobs = [
  {
    title: "Senior Frontend Engineer",
    company: "TechCorp Solutions",
    logo: TechCorp,
    location: "San Francisco, CA",
    type: "Full-Time",
    salary: "₹ 62,000 – 85,000 / year",
    posted: "Posted 2 days ago",
  },
  {
    title: "Heavy Equipment Operator",
    company: "Buildit Construction",
    logo: Buildlt,
    location: "Austin, TX",
    type: "Contract",
    salary: "₹ 6,200 / hr",
    posted: "Posted 5 hours ago",
  },
  {
    title: "Marketing Manager",
    company: "Creatives Agency",
    logo: Creative,
    location: "New York, NY",
    type: "Full-Time",
    salary: "₹ 62,000 – 85,000 / year",
    posted: "Posted 1 day ago",
  },
];

const FeaturedJobsSection = () => {
  const [current, setCurrent] = useState(0);
  const totalSlides = jobs.length;

  const next = () => {
    if (current < totalSlides - 1) setCurrent(current + 1);
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const progressWidth = ((current + 1) / totalSlides) * 100;

  return (
    <section className="w-full bg-[#F1F5F9] py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-[#0F172A]">
            Featured Jobs
          </h2>

          <p className="mt-3 text-sm text-[#94A3B8]">
            Discover hand-picked opportunities from top companies actively
            hiring right now.
          </p>
        </div>

        {/* Slider */}
        <div className="relative mt-10 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {jobs.map((job, index) => (
              <div
                key={index}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
              >
                <article className="flex flex-col justify-between h-full rounded-xl bg-white p-5 border border-[#E2E8F0] shadow-sm hover:shadow-md transition">
                  {/* Top */}
                  <div className="space-y-3">
                    {/* Logo + Title */}
                    <div className="flex items-start gap-3">
                      <div className="flex h-[46px] w-[46px] items-center justify-center bg-white">
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="h-7 w-7"
                        />
                      </div>

                      <div>
                        <h5 className="text-sm font-semibold text-[#0F172A]">
                          {job.title}
                        </h5>

                        <p className="mt-1 text-xs text-[#94A3B8]">
                          {job.company}
                        </p>
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B]">
                      <span>{job.location}</span>

                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-[#2563EB]">
                        {job.type}
                      </span>

                      <span className="inline-flex items-center rounded-full bg-[#F97316] px-2.5 py-1 text-[11px] font-semibold text-white">
                        {job.salary}
                      </span>
                    </div>
                  </div>

                  <hr className="border-t border-[#94A3B8] mt-15" />
                  {/* Bottom */}
                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-[11px] text-[#94A3B8]">{job.posted}</p>

                    <button className="rounded-full bg-[#2563EB] px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition">
                      Apply Now
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Controls */}
        <div className="mt-8 flex justify-start">
          <div className="flex items-center gap-4 rounded-full bg-white px-5 py-2 border border-[#E2E8F0] shadow-sm">
            <button
              onClick={prev}
              disabled={current === 0}
              className="text-[#64748B] text-lg disabled:opacity-30"
            >
              &#8249;
            </button>

            <div className="w-28 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2563EB] transition-all duration-300"
                style={{ width: `${progressWidth}%` }}
              />
            </div>

            <button
              onClick={next}
              disabled={current === totalSlides - 1}
              className="text-[#64748B] text-lg disabled:opacity-30"
            >
              &#8250;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobsSection;
