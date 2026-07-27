import Link from "next/link";
import { Job } from "@/types/job";
import { formatDate, formatJobType } from "@/lib/format";

const typeStyles: Record<string, string> = {
  "full-time": "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  "part-time": "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  contract: "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300",
  internship: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300",
  remote: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
};

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-800"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-50 dark:group-hover:text-indigo-400">
            {job.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {job.company}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${typeStyles[job.type]}`}
        >
          {formatJobType(job.type)}
        </span>
      </div>

      <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {job.description}
      </p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500 dark:text-zinc-500">
        <span>{job.location}</span>
        <span>{job.salary}</span>
        <span>Posted {formatDate(job.postedAt)}</span>
      </div>
    </Link>
  );
}
