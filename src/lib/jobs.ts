import { seedJobs } from "@/data/seed-jobs";
import { CreateJobInput, Job, JobFilters } from "@/types/job";

const postedJobs: Job[] = [];

function allJobs(): Job[] {
  return [...seedJobs, ...postedJobs].sort(
    (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  );
}

export function getJobs(filters: JobFilters = {}): Job[] {
  const { query = "", type = "all", location = "" } = filters;
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedLocation = location.trim().toLowerCase();

  return allJobs().filter((job) => {
    const matchesQuery =
      !normalizedQuery ||
      job.title.toLowerCase().includes(normalizedQuery) ||
      job.company.toLowerCase().includes(normalizedQuery) ||
      job.description.toLowerCase().includes(normalizedQuery);

    const matchesType = type === "all" || job.type === type;

    const matchesLocation =
      !normalizedLocation ||
      job.location.toLowerCase().includes(normalizedLocation);

    return matchesQuery && matchesType && matchesLocation;
  });
}

export function getJobById(id: string): Job | undefined {
  return allJobs().find((job) => job.id === id);
}

export function createJob(input: CreateJobInput): Job {
  const job: Job = {
    id: `job-${Date.now()}`,
    ...input,
    postedAt: new Date().toISOString(),
  };

  postedJobs.unshift(job);
  return job;
}

export function getJobStats() {
  const jobs = allJobs();
  return {
    total: jobs.length,
    remote: jobs.filter((j) => j.type === "remote").length,
    hyderabad: jobs.filter((j) =>
      j.location.toLowerCase().includes("hyderabad")
    ).length,
    companies: new Set(jobs.map((j) => j.company)).size,
  };
}
