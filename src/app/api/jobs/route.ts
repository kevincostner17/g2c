import { NextRequest, NextResponse } from "next/server";
import { createJob, getJobs } from "@/lib/jobs";
import { CreateJobInput, JobType } from "@/types/job";

const validTypes: JobType[] = [
  "full-time",
  "part-time",
  "contract",
  "internship",
  "remote",
];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const jobs = getJobs({
    query: searchParams.get("q") ?? undefined,
    type: (searchParams.get("type") as JobType | "all") ?? "all",
    location: searchParams.get("location") ?? undefined,
  });

  return NextResponse.json(jobs);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateJobInput;

    if (
      !body.title?.trim() ||
      !body.company?.trim() ||
      !body.location?.trim() ||
      !body.salary?.trim() ||
      !body.description?.trim()
    ) {
      return NextResponse.json(
        { error: "All required fields must be filled." },
        { status: 400 }
      );
    }

    if (!validTypes.includes(body.type)) {
      return NextResponse.json({ error: "Invalid job type." }, { status: 400 });
    }

    if (!Array.isArray(body.requirements) || body.requirements.length === 0) {
      return NextResponse.json(
        { error: "At least one requirement is required." },
        { status: 400 }
      );
    }

    const job = createJob({
      title: body.title.trim(),
      company: body.company.trim(),
      location: body.location.trim(),
      type: body.type,
      salary: body.salary.trim(),
      description: body.description.trim(),
      requirements: body.requirements.map((r) => r.trim()).filter(Boolean),
      applyUrl: body.applyUrl?.trim() || undefined,
    });

    return NextResponse.json(job, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
