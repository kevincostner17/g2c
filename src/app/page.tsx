import { Suspense } from "react";
import { Header } from "@/components/Header";
import { JobCard } from "@/components/JobCard";
import { JobFiltersBar } from "@/components/JobFiltersBar";
import { StatCard } from "@/components/StatCard";
import { getJobs, getJobStats } from "@/lib/jobs";
import { JobType } from "@/types/job";

interface HomeProps {
  searchParams: Promise<{
    q?: string;
    type?: string;
    location?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const filters = {
    query: params.q,
    type: (params.type as JobType | "all") ?? "all",
    location: params.location,
  };

  const jobs = getJobs(filters);
  const stats = getJobStats();

  return (
    <>
      <Header />

      <main className="flex-1">
        <section className="border-b border-zinc-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:border-zinc-800 dark:from-indigo-950/40 dark:via-zinc-950 dark:to-violet-950/30">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Tech Jobs Marketplace
            </p>
            <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Discover your next opportunity on TalentBoard
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              A modern jobs board connecting developers, designers, and engineers
              with companies across India. Search, filter, and apply in minutes.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard label="Open roles" value={stats.total} />
              <StatCard label="Remote jobs" value={stats.remote} />
              <StatCard label="In Hyderabad" value={stats.hyderabad} />
              <StatCard label="Companies" value={stats.companies} />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <Suspense fallback={<div className="h-32 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />}>
            <JobFiltersBar />
          </Suspense>

          <div className="mt-8">
            <p className="mb-4 text-sm text-zinc-500">
              {jobs.length} {jobs.length === 1 ? "job" : "jobs"} found
            </p>

            {jobs.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
                <p className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
                  No jobs match your filters
                </p>
                <p className="mt-2 text-sm text-zinc-500">
                  Try adjusting your search or browse all listings.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 py-6 text-center text-sm text-zinc-500 dark:border-zinc-800">
        TalentBoard &copy; {new Date().getFullYear()} — Built for the G2C technical assessment
      </footer>
    </>
  );
}
