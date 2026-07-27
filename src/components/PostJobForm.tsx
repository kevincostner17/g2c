"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { JobType } from "@/types/job";

const jobTypes: JobType[] = [
  "full-time",
  "part-time",
  "contract",
  "internship",
  "remote",
];

export function PostJobForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const requirementsRaw = (formData.get("requirements") as string) ?? "";

    const payload = {
      title: (formData.get("title") as string).trim(),
      company: (formData.get("company") as string).trim(),
      location: (formData.get("location") as string).trim(),
      type: formData.get("type") as JobType,
      salary: (formData.get("salary") as string).trim(),
      description: (formData.get("description") as string).trim(),
      requirements: requirementsRaw
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      applyUrl: (formData.get("applyUrl") as string).trim() || undefined,
    };

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Failed to post job");
      }

      const job = await response.json();
      router.push(`/jobs/${job.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none ring-indigo-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Job title *</span>
          <input name="title" required className={inputClass} placeholder="Senior Developer" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Company *</span>
          <input name="company" required className={inputClass} placeholder="Acme Corp" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Location *</span>
          <input name="location" required className={inputClass} placeholder="Hyderabad, India" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Job type *</span>
          <select name="type" required className={inputClass} defaultValue="full-time">
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1).replace("-", " ")}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-sm font-medium">Salary range *</span>
          <input name="salary" required className={inputClass} placeholder="₹12–18 LPA" />
        </label>
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-sm font-medium">Apply URL (optional)</span>
          <input name="applyUrl" type="url" className={inputClass} placeholder="https://..." />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Description *</span>
        <textarea
          name="description"
          required
          rows={5}
          className={inputClass}
          placeholder="Describe the role, team, and impact..."
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Requirements (one per line) *</span>
        <textarea
          name="requirements"
          required
          rows={4}
          className={inputClass}
          placeholder={"3+ years React experience\nTypeScript proficiency\nGit workflow knowledge"}
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Publishing..." : "Publish job listing"}
      </button>
    </form>
  );
}
