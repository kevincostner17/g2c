# TalentBoard

**TalentBoard** is a modern tech jobs marketplace built as a technical assessment project. It connects job seekers with companies across India through searchable listings, detailed job pages, and an employer posting flow.

**Live demo:** _Add your Vercel URL after deployment_

---

## Business Value

| Problem | Solution |
|---------|----------|
| Job seekers struggle to find relevant tech roles in one place | Centralized board with search, filters, and detailed listings |
| Employers need a fast way to publish openings | Simple "Post a Job" form with instant listing |
| Fragmented job data across platforms | Unified API with consistent job schema |

---

## Features

- **Browse jobs** — Grid view with title, company, location, salary, and type
- **Search & filter** — By keyword, job type (full-time, remote, contract, etc.), and location
- **Job detail pages** — Full description, requirements, and apply link
- **Post a job** — Employers can publish new listings via a validated form
- **REST API** — `GET /api/jobs`, `POST /api/jobs`, `GET /api/jobs/[id]`
- **Responsive UI** — Mobile-friendly design with Tailwind CSS
- **CI/CD** — GitHub Actions pipeline for lint, typecheck, build, and Vercel deploy

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Deployment | [Vercel](https://vercel.com/) |
| CI/CD | GitHub Actions |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/g2c.git
cd g2c
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript compiler check |

---

## Project Structure

```
g2c/
├── .github/workflows/
│   └── ci-cd.yml          # CI/CD pipeline
├── src/
│   ├── app/
│   │   ├── api/jobs/      # REST API routes
│   │   ├── jobs/[id]/     # Job detail page
│   │   ├── post/          # Post job page
│   │   ├── layout.tsx
│   │   └── page.tsx       # Home / job listings
│   ├── components/        # Reusable UI components
│   ├── data/              # Seed job data
│   ├── lib/               # Business logic
│   └── types/             # TypeScript interfaces
├── package.json
└── README.md
```

---

## API Reference

### `GET /api/jobs`

List jobs with optional filters.

**Query parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `q` | string | Search title, company, description |
| `type` | string | Job type filter (`full-time`, `remote`, etc.) |
| `location` | string | Location substring match |

**Example:**

```bash
curl "http://localhost:3000/api/jobs?q=react&type=remote"
```

### `POST /api/jobs`

Create a new job listing.

**Request body:**

```json
{
  "title": "Frontend Developer",
  "company": "Acme Corp",
  "location": "Hyderabad, India",
  "type": "full-time",
  "salary": "₹12–18 LPA",
  "description": "Build modern web apps...",
  "requirements": ["3+ years React", "TypeScript"],
  "applyUrl": "mailto:jobs@acme.example"
}
```

### `GET /api/jobs/[id]`

Fetch a single job by ID.

---

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci-cd.yml`) runs on every push and pull request to `main`:

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   Push/PR   │────▶│ Quality Check│────▶│ Deploy (main)   │
│  to main    │     │ lint+type+   │     │ Vercel prod     │
└─────────────┘     │ build        │     └─────────────────┘
                    └──────────────┘
```

**Quality check job:**
1. Checkout code
2. Install dependencies (`npm ci`)
3. Run ESLint
4. Run TypeScript check
5. Build the app

**Deploy job** (main branch only, after quality check passes):
1. Install Vercel CLI
2. Pull Vercel project settings
3. Build for production
4. Deploy prebuilt output to Vercel

---

## Deployment to Vercel

### Step 1: Create a GitHub repository

```bash
git remote add origin https://github.com/YOUR_USERNAME/g2c.git
git push -u origin main
```

### Step 2: Import project in Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Deploy once manually to get project IDs

### Step 3: Configure GitHub Secrets

In your GitHub repo, go to **Settings → Secrets and variables → Actions** and add:

| Secret | How to get it |
|--------|---------------|
| `VERCEL_TOKEN` | [Vercel Account Settings → Tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Run `vercel link` locally, then check `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Same file as above |

### Step 4: Push to main

Every push to `main` triggers the pipeline and deploys automatically.

---

## Architecture Notes

- **Data layer:** Seed jobs are stored in `src/data/seed-jobs.ts`. User-posted jobs are held in an in-memory store for demo purposes. In production, this would be backed by PostgreSQL, MongoDB, or Vercel Postgres/KV.
- **Server components:** The home and detail pages use React Server Components for fast initial loads.
- **Client components:** Search filters and the post form use client-side interactivity where needed.

---

## Future Enhancements

- User authentication (employer accounts)
- Persistent database (PostgreSQL / Supabase)
- Email notifications for new applications
- Admin dashboard for job moderation
- Pagination and infinite scroll

---

## Author

Built as part of the **Software Developer (Onsite, Hyderabad)** technical assessment.

**Assessment checklist:**
- [x] Build a business-value web app using AI
- [x] Push code to Git
- [x] CI/CD pipeline on Git (GitHub Actions)
- [x] Deploy to Vercel via CI/CD
- [x] Documentation

---

## License

MIT
