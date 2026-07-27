import Link from "next/link";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <p className="text-6xl font-bold text-indigo-600">404</p>
        <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Job not found
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          This listing may have been removed or the link is incorrect.
        </p>
        <Link
          href="/"
          className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Browse all jobs
        </Link>
      </main>
    </>
  );
}
