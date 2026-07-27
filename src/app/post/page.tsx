import { Header } from "@/components/Header";
import { PostJobForm } from "@/components/PostJobForm";

export default function PostJobPage() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-2xl flex-1 px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-50">
            Post a job listing
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Reach talented developers across India. Fill in the details below to publish
            your opening on TalentBoard.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <PostJobForm />
        </div>
      </main>
    </>
  );
}
