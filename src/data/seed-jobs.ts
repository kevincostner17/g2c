import { Job } from "@/types/job";

export const seedJobs: Job[] = [
  {
    id: "job-001",
    title: "Senior Full Stack Developer",
    company: "TechNova Solutions",
    location: "Hyderabad, India",
    type: "full-time",
    salary: "₹18–25 LPA",
    description:
      "Join our product team to build scalable web applications serving 2M+ users across India. You will own features end-to-end—from API design to polished UI.",
    requirements: [
      "5+ years with React/Next.js and Node.js",
      "Experience with PostgreSQL and REST/GraphQL APIs",
      "Strong understanding of CI/CD and cloud deployment",
    ],
    postedAt: "2026-07-20T09:00:00.000Z",
    applyUrl: "mailto:careers@technova.example",
  },
  {
    id: "job-002",
    title: "Frontend Engineer (React)",
    company: "PixelCraft Studios",
    location: "Remote, India",
    type: "remote",
    salary: "₹12–18 LPA",
    description:
      "Build delightful user interfaces for our SaaS analytics platform. Work closely with designers to ship accessible, performant components.",
    requirements: [
      "3+ years React/TypeScript experience",
      "Proficiency with Tailwind CSS and component libraries",
      "Familiarity with performance optimization and Core Web Vitals",
    ],
    postedAt: "2026-07-22T11:30:00.000Z",
    applyUrl: "mailto:jobs@pixelcraft.example",
  },
  {
    id: "job-003",
    title: "DevOps Engineer",
    company: "CloudBridge Systems",
    location: "Bangalore, India",
    type: "full-time",
    salary: "₹15–22 LPA",
    description:
      "Design and maintain CI/CD pipelines, Kubernetes clusters, and observability stacks for our fintech platform.",
    requirements: [
      "Experience with AWS/GCP, Docker, and Kubernetes",
      "Proficiency in Terraform and GitHub Actions",
      "On-call experience with production systems",
    ],
    postedAt: "2026-07-18T08:00:00.000Z",
    applyUrl: "mailto:hr@cloudbridge.example",
  },
  {
    id: "job-004",
    title: "Software Developer Intern",
    company: "StartupHub India",
    location: "Hyderabad, India",
    type: "internship",
    salary: "₹25,000/month",
    description:
      "6-month internship working on a jobs marketplace MVP. Ideal for final-year CS students passionate about full-stack development.",
    requirements: [
      "Solid fundamentals in JavaScript/TypeScript",
      "Basic knowledge of React and Git",
      "Eagerness to learn and ship quickly",
    ],
    postedAt: "2026-07-25T14:00:00.000Z",
    applyUrl: "mailto:interns@startuphub.example",
  },
  {
    id: "job-005",
    title: "Backend Developer (Node.js)",
    company: "DataPulse Analytics",
    location: "Pune, India",
    type: "contract",
    salary: "₹1,200/hour",
    description:
      "6-month contract to rebuild our data ingestion pipeline and REST APIs. Remote-friendly with weekly sync in IST timezone.",
    requirements: [
      "4+ years Node.js and microservices",
      "Experience with message queues (Redis/RabbitMQ)",
      "Strong SQL and data modeling skills",
    ],
    postedAt: "2026-07-21T10:15:00.000Z",
    applyUrl: "mailto:contracts@datapulse.example",
  },
  {
    id: "job-006",
    title: "Mobile Developer (React Native)",
    company: "HealthFirst Apps",
    location: "Chennai, India",
    type: "part-time",
    salary: "₹8–12 LPA (pro-rata)",
    description:
      "Part-time role building a patient engagement app. 20 hours/week, flexible schedule for experienced React Native developers.",
    requirements: [
      "2+ years React Native development",
      "Published apps on App Store / Play Store",
      "Experience with push notifications and offline sync",
    ],
    postedAt: "2026-07-23T16:45:00.000Z",
    applyUrl: "mailto:mobile@healthfirst.example",
  },
];
