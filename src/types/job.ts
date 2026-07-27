export type JobType = "full-time" | "part-time" | "contract" | "internship" | "remote";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  salary: string;
  description: string;
  requirements: string[];
  postedAt: string;
  applyUrl?: string;
}

export interface CreateJobInput {
  title: string;
  company: string;
  location: string;
  type: JobType;
  salary: string;
  description: string;
  requirements: string[];
  applyUrl?: string;
}

export interface JobFilters {
  query?: string;
  type?: JobType | "all";
  location?: string;
}
