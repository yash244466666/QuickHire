# AGENT.md — QuickHire Project Context

## Project Overview
QuickHire is a full-stack job board application built as a monorepo.

| Layer     | Stack                                          | Location       |
|-----------|------------------------------------------------|----------------|
| Frontend  | Next.js 14 (App Router) + Tailwind CSS         | `frontend/`    |
| Backend   | Node.js + Express + Prisma 7.4.2               | `backend/`     |
| Database  | PostgreSQL 16                                  | Docker         |
| API Docs  | Swagger UI at `http://localhost:4001/api/docs` | auto-generated |

---

## Repo Structure

```
QuickHire/
├── AGENT.md                  ← this file (AI context)
├── README.md                 ← human-facing docs
├── .gitignore
├── package.json              ← root workspace (npm workspaces)
├── frontend/                 ← Next.js app
│   ├── src/
│   │   ├── app/
│   │   │   ├── (public)/             ← public-facing routes
│   │   │   │   ├── page.tsx          ← Landing page (/)
│   │   │   │   ├── jobs/
│   │   │   │   │   ├── page.tsx      ← Job Listings (/jobs)
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx  ← Job Detail (/jobs/:id)
│   │   │   ├── admin/
│   │   │   │   ├── layout.tsx        ← Admin sidebar layout
│   │   │   │   ├── page.tsx          ← Admin Dashboard
│   │   │   │   └── jobs/
│   │   │   │       └── page.tsx      ← Admin Job Management
│   │   │   ├── layout.tsx            ← Root layout
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── AdminSidebar.tsx
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   └── Modal.tsx
│   │   │   ├── jobs/
│   │   │   │   ├── JobCard.tsx
│   │   │   │   ├── JobList.tsx
│   │   │   │   ├── JobFilters.tsx
│   │   │   │   └── ApplyForm.tsx
│   │   │   ├── home/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── CompanySection.tsx
│   │   │   │   ├── CategorySection.tsx
│   │   │   │   ├── FeaturedJobsSection.tsx
│   │   │   │   ├── LatestJobsSection.tsx
│   │   │   │   └── CTASection.tsx
│   │   │   └── admin/
│   │   │       ├── JobTable.tsx
│   │   │       ├── AddJobForm.tsx
│   │   │       └── StatsCard.tsx
│   │   ├── lib/
│   │   │   ├── api.ts            ← API client helpers (fetch wrappers)
│   │   │   └── types.ts          ← Shared TypeScript types
│   │   └── hooks/
│   │       ├── useJobs.ts
│   │       └── useDebounce.ts
│   ├── public/
│   │   └── images/
│   ├── tailwind.config.ts
│   ├── next.config.mjs
│   ├── tsconfig.json
│   └── package.json
│
└── backend/                  ← Express API
    ├── src/
    │   ├── server.ts             ← Entry point
    │   ├── routes/
    │   │   ├── jobs.ts           ← /api/jobs routes
    │   │   └── applications.ts   ← /api/applications routes
    │   ├── controllers/
    │   │   ├── jobController.ts
    │   │   └── applicationController.ts
    │   ├── middleware/
    │   │   ├── errorHandler.ts
    │   │   └── validate.ts
    │   ├── validators/
    │   │   ├── jobValidators.ts
    │   │   └── applicationValidators.ts
    │   └── lib/
    │       └── prisma.ts         ← Prisma client singleton
    ├── prisma/
    │   ├── schema.prisma         ← DB schema
    │   └── seed.ts               ← Seed data
    ├── .env.example
    ├── tsconfig.json
    └── package.json
```

---

## Design System (from Figma: PWYovqdcSczquXZKbRLOKC)

### Color Palette
```
Brand Primary:    #4640DE   (Brands/Primary — buttons, highlights, active states)
Brand Primary 25: #F1F0FF   (light primary tint for active category bg)
White:            #FFFFFF   (Neutrals/0 — card/page backgrounds)
Light Bg:         #F8F8FD   (Neutrals/10 — section backgrounds, inputs)
Border:           #D6DDEB   (Neutrals/20 — borders, dividers)
Text Muted:       #7C8493   (Neutrals/60 — placeholder, subtle text)
Text Secondary:   #515B6F   (Neutrals/80 — body text)
Text Primary:     #25324B   (Neutrals/100 — headings, primary text)
Black:            #202430   (footer background)
Red:              #FF6550   (labels, error states)
Green:            #56CDAD   (success, green labels)
Yellow:           #FFB836   (warning, yellow labels)
Purple:           #615CF4   (purple labels)
```

### Typography
```
Font Family: Epilogue (Google Fonts) or Inter as fallback
H1:  56px / Bold    (Heading/H1)
H2:  40px / SemiBold (Heading/H2)
H3:  32px / SemiBold
H4:  24px / SemiBold (Title/Large)
Body XL: 18px / Regular
Body L:  16px / Regular
Body M:  14px / Regular (Body/Normal)
Body S:  12px / Regular
Button L: 16px / Bold
Button M: 14px / Bold
```

### Key Pages & Sections

#### 1. Landing Page (`/`)
- **Navbar**: Logo "QuickHire" | Find Jobs | Browse Companies | Login button | Sign Up button (primary)
- **Hero Section**: 
  - Title: "Discover more than 5000+ Jobs"
  - Subtitle: "Great platform for the job seeker that searching for new career heights and passionate about startups."
  - Search bar: [🔍 Job title or keyword] | [📍 Florence, Italy ▼] | [Search my job]
  - Popular: "Popular: UI Designer, UX Researcher, Android, Admin"
  - Background: Light gray with decorative image
- **Companies Section**: "Companies we helped grow" + logos row (Nomad, Dropbox, Revolut, Canva, Terraform, ClassPass, Pitch, Blinkist, Packer, GoDaddy, Twitter, Netlify, Maze, Udacity, Webflow)
- **Category Section**: "Explore by category" + 8 category cards (Design, Sales, Marketing, Finance, Engineering, Business, HR, Tech)
- **CTA Section**: Two-column CTA for job seekers and employers
- **Featured Jobs Section**: Job cards with company logo, title, tags, type badges
- **Latest Job Openings**: Full-width job list with filters
- **Footer**: Dark background, newsletter, links, social icons

#### 2. Job Listings Page (`/jobs`)
- Search + filter sidebar (category, location, job type, experience)
- Job cards grid/list
- Pagination

#### 3. Job Detail Page (`/jobs/[id]`)
- Full job description
- Company info
- Side panel with "Apply Now" button → opens application form modal
- Application form (name, email, resume URL, cover note)

#### 4. Admin Panel (`/admin`)
- Sidebar: Home, Job Listing, Applicants, Settings
- Dashboard: stats cards (total jobs, applications, active jobs)
- Job management table: create/delete jobs
- Add Job form (title, company, location, category, description, job type)

---

## API Contract

### Jobs
| Method | Endpoint         | Description              | Auth  |
|--------|------------------|--------------------------|-------|
| GET    | /api/jobs        | List all jobs (+ filters/search query params) | None |
| GET    | /api/jobs/:id    | Get single job           | None  |
| POST   | /api/jobs        | Create job               | Admin |
| DELETE | /api/jobs/:id    | Delete job               | Admin |

### Applications
| Method | Endpoint              | Description           | Auth  |
|--------|-----------------------|-----------------------|-------|
| POST   | /api/applications     | Submit application    | None  |
| GET    | /api/applications     | List all applications (admin) | Admin |

### Query params for GET /api/jobs
- `?search=` — title/company/description search
- `?category=` — filter by category
- `?location=` — filter by location
- `?type=` — filter by job type (Full-Time, Part-Time, Remote, etc.)
- `?page=` / `?limit=` — pagination

---

## Database Schema

```prisma
model Job {
  id          Int           @id @default(autoincrement())
  title       String
  company     String
  location    String
  category    String
  type        String        @default("Full-Time")
  description String
  logo        String?       // company logo URL
  salary      String?       // e.g. "80k-120k"
  createdAt   DateTime      @default(now())
  applications Application[]
}

model Application {
  id          Int      @id @default(autoincrement())
  jobId       Int
  job         Job      @relation(fields: [jobId], references: [id], onDelete: Cascade)
  name        String
  email       String
  resumeLink  String
  coverNote   String?
  createdAt   DateTime @default(now())
}
```

---

## Environment Variables

### Backend (`backend/.env`)
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/quickhire"
PORT=4001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:4001
```

---

## Development Workflow

### Start everything
```bash
# Terminal 1 — Backend
cd backend && npm run dev    # runs on :4001 | Swagger: http://localhost:4001/api/docs

# Terminal 2 — Frontend  
cd frontend && npm run dev   # runs on :3000
```

### Database
```bash
cd backend
npx prisma migrate dev --name init
npx ts-node --project prisma/tsconfig.json prisma/seed.ts  # seeds 12 jobs
npx prisma studio            # visual DB browser
```

---

## Implementation Phases

### Phase 1 — Project Scaffolding ✅
- [x] Monorepo structure
- [x] AGENT.md
- [x] Backend: Express + Prisma + TypeScript
- [x] Frontend: Next.js 14 + Tailwind CSS + TypeScript

### Phase 2 — Backend API
- [ ] Prisma schema & migrations
- [ ] Seed data (10+ sample jobs)
- [ ] GET /api/jobs (with filters)
- [ ] GET /api/jobs/:id
- [ ] POST /api/jobs (validation)
- [ ] DELETE /api/jobs/:id
- [ ] POST /api/applications (validation)
- [ ] GET /api/applications (admin)
- [ ] Error handling middleware
- [ ] CORS setup

### Phase 3 — Frontend Core
- [ ] Tailwind config with design tokens
- [ ] Reusable UI components (Button, Badge, Input, Modal)
- [ ] Navbar + Footer
- [ ] Landing page (all sections)
- [ ] Job Listings page (/jobs)
- [ ] Job Detail page (/jobs/[id])
- [ ] Apply form modal

### Phase 4 — Admin Panel
- [ ] Admin layout with sidebar
- [ ] Jobs table (list + delete)
- [ ] Add job form
- [ ] Stats cards

### Phase 5 — Polish
- [ ] Responsive mobile layout
- [ ] Loading states + skeletons
- [ ] Error states
- [ ] Form validation feedback
- [ ] README.md

---

## Key Conventions

- **API responses** always follow: `{ success: true, data: ... }` or `{ success: false, error: "..." }`
- **Components** are PascalCase functional components with TypeScript props interfaces
- **API calls** go through `frontend/src/lib/api.ts` helper functions (never raw fetch in components)
- **No auth system** — admin panel is accessible at `/admin` directly (no login required per spec)
- **Tailwind** custom colors are defined in `tailwind.config.ts` matching the design tokens above
- **Prisma** client is a singleton in `backend/src/lib/prisma.ts`
- All backend routes are prefixed with `/api`
