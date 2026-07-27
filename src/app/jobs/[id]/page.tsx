import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { getJobById } from "@/lib/jobs";
import { formatDate, formatJobType } from "@/lib/format";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const job = getJobById(id);

  if (!job) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="mx-auto max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <Link
          href="/"
          className="mb-6 inline-flex text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          &larr; Back to all jobs
        </Link>

        <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-50">
                {job.title}
              </h1>
              <p className="mt-2 text-lg font-medium text-zinc-600 dark:text-zinc-400">
                {job.company}
              </p>
            </div>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
              {formatJobType(job.type)}
            </span>
          </div>

          <dl className="mb-8 grid gap-3 sm:grid-cols-3">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">Location</dt>
              <dd className="mt-1 text-sm font-medium">{job.location}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">Salary</dt>
              <dd className="mt-1 text-sm font-medium">{job.salary}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">Posted</dt>
              <dd className="mt-1 text-sm font-medium">{formatDate(job.postedAt)}</dd>
            </div>
          </dl>

          <section className="mb-8">
            <h2 className="mb-3 text-lg font-semibold">About the role</h2>
            <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">{job.description}</p>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-lg font-semibold">Requirements</h2>
            <ul className="list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
              {job.requirements.map((req) => (
                <li key={req}>{req}</li>
              ))}
            </ul>
          </section>

          {job.applyUrl && (
            <a
              href={job.applyUrl}
              className="inline-flex rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-500"
            >
              Apply now
            </a>
          )}
        </article>
      </main>
    </>
  );
}
