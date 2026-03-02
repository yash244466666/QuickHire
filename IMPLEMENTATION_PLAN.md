# QuickHire — Full Implementation Plan

> **Project Status:** Infrastructure complete. Both servers running (`localhost:3000` frontend, `localhost:4001` backend). Database migrated + seeded with 12 jobs. All files scaffolded. This plan covers what needs to be built/fixed/polished from here to submission.

---

## Quick Links
| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:4001 |
| Swagger Docs | http://localhost:4001/api/docs |
| pgAdmin | http://localhost:5050 (admin@quickhire.com / admin) |

---

## Overall Progress Tracker

| Phase | Area | Status |
|---|---|---|
| ✅ Phase 0 | Infrastructure & DevOps | DONE |
| ✅ Phase 1 | Backend API | DONE |
| 🔧 Phase 2 | Frontend — Landing Page | NEEDS VERIFICATION & FIXES |
| 🔧 Phase 3 | Frontend — Jobs Listing Page | NEEDS VERIFICATION & FIXES |
| 🔧 Phase 4 | Frontend — Job Detail Page | NEEDS VERIFICATION & FIXES |
| 🔧 Phase 5 | Frontend — Admin Panel | NEEDS VERIFICATION & FIXES |
| ⬜ Phase 6 | Responsiveness Pass | NOT STARTED |
| ⬜ Phase 7 | UX Polish (skeletons, errors, toasts) | NOT STARTED |
| ⬜ Phase 8 | Submission Prep | NOT STARTED |

---

---

# BACKEND

## Current Backend State — Fully Implemented ✅

All backend work is complete. The API is live, validated, and documented.

### Files Built

| File | Purpose | Status |
|---|---|---|
| `src/server.ts` | Express entry point, CORS, routes, Swagger mount | ✅ Done |
| `src/lib/prisma.ts` | Prisma singleton with `@prisma/adapter-pg` | ✅ Done |
| `src/routes/jobs.ts` | Job route definitions + `@openapi` JSDoc | ✅ Done |
| `src/routes/applications.ts` | Application route definitions + `@openapi` JSDoc | ✅ Done |
| `src/controllers/jobController.ts` | `getJobs`, `getJobById`, `createJob`, `deleteJob` | ✅ Done |
| `src/controllers/applicationController.ts` | `createApplication`, `getApplications` | ✅ Done |
| `src/middleware/errorHandler.ts` | Global error handler | ✅ Done |
| `src/middleware/validate.ts` | express-validator result checker | ✅ Done |
| `src/validators/jobValidators.ts` | Title, company, location, category, description, type, logo URL | ✅ Done |
| `src/validators/applicationValidators.ts` | jobId, name, email (isEmail), resumeLink (isURL), coverNote optional | ✅ Done |
| `src/swagger.ts` | Swagger UI + JSON spec, auto-discovers all `src/routes/**/*` | ✅ Done |
| `prisma/schema.prisma` | Job + Application models, Cascade delete | ✅ Done |
| `prisma/seed.ts` | 12 sample jobs (Nomad, Dropbox, Revolut, Canva, etc.) | ✅ Done |
| `prisma/tsconfig.json` | Separate TS config for prisma folder | ✅ Done |
| `prisma.config.ts` | Prisma 7 config with `datasource.url` | ✅ Done |
| `.env` | DATABASE_URL, PORT=4001, NODE_ENV, FRONTEND_URL | ✅ Done |

---

### API Endpoints Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/health` | None | Health check |
| `GET` | `/api/jobs` | None | List jobs with pagination + filters |
| `GET` | `/api/jobs/:id` | None | Get single job with application count |
| `POST` | `/api/jobs` | None (admin) | Create job — validated |
| `DELETE` | `/api/jobs/:id` | None (admin) | Delete job + cascade applications |
| `GET` | `/api/applications` | None (admin) | List all applications, optional `?jobId=` filter |
| `POST` | `/api/applications` | None | Submit application — validated |

### Query Params for `GET /api/jobs`

| Param | Type | Example | Description |
|---|---|---|---|
| `search` | string | `?search=designer` | Full-text across title, company, description, location |
| `category` | string | `?category=Engineering` | Exact match (case-insensitive) |
| `location` | string | `?location=Remote` | Contains match |
| `type` | string | `?type=Full-Time` | Exact match |
| `page` | number | `?page=2` | Default: 1 |
| `limit` | number | `?limit=10` | Default: 10, max: 50 |

### Response Format
All responses follow:
```json
{ "success": true, "data": { ... } }
{ "success": true, "data": [...], "meta": { "total": 42, "page": 1, "limit": 10, "totalPages": 5 } }
{ "success": false, "error": "Job not found" }
```

---

### Backend Tasks Remaining

| Task | Priority | Details |
|---|---|---|
| ⬜ `GET /api/applications/:id` | Low | Not in spec — skip unless needed |
| ⬜ Rate limiting | Low | Add `express-rate-limit` to prevent API abuse |
| ⬜ Helmet.js security headers | Low | `npm install helmet` + `app.use(helmet())` in server.ts |
| ⬜ Pagination for applications | Low | `GET /api/applications` currently returns all — add `?page=&limit=` |
| ⬜ Job search — full text index | Optional | Add PostgreSQL `GIN` index on job title/description for faster search |

---

---

# FRONTEND

## Design System Reference (Figma: `PWYovqdcSczquXZKbRLOKC`)

> **Always open Figma alongside the browser when building UI.**
> Figma → `https://www.figma.com/design/PWYovqdcSczquXZKbRLOKC/QuickHire?node-id=0-1&p=f`

### Colors (already in `tailwind.config.ts`)
```
primary:        #4640DE   → bg-primary, text-primary, border-primary
primary-25:     #F1F0FF   → bg-primary-25 (active category bg)
neutrals-100:   #25324B   → headings
neutrals-80:    #515B6F   → body text
neutrals-60:    #7C8493   → muted/placeholder
neutrals-20:    #D6DDEB   → borders
neutrals-10:    #F8F8FD   → section backgrounds, inputs
white:          #FFFFFF   → card backgrounds
footer-bg:      #202430   → footer
success:        #56CDAD   → Full-Time badge
warning:        #FFB836   → Part-Time, Internship badge
error:          #FF6550   → red labels
purple:         #615CF4   → purple labels
```

### Typography
```
Font: Epilogue (loaded in layout.tsx via Google Fonts)
H1:  56px bold    → text-[56px] font-bold
H2:  40px semi    → text-[40px] font-semibold
H3:  32px semi    → text-[32px] font-semibold
H4:  24px semi    → text-2xl font-semibold
Body XL: 18px     → text-lg
Body L:  16px     → text-base (text-body-lg)
Body M:  14px     → text-sm (text-body-md)
Body S:  12px     → text-xs
```

---

## Phase 2 — Landing Page `/`

**File:** `frontend/src/app/page.tsx`
**Figma Node:** Landing page (node 0-1)

The page file correctly composes all sections. Each section needs to be individually verified and fixed.

---

### 2.1 — Navbar (`Navbar.tsx`) 🔧

**Current State:** Functional shell exists. Issues:
- "Browse Companies" links to `/admin` — should link to `/jobs`
- Missing Login / Sign Up buttons matching Figma design (outlined Login + filled SignUp)
- QuickHire logo uses a plain square div — Figma has a specific mark

**Tasks:**
- [ ] Fix "Browse Companies" `href` → `/jobs`
- [ ] Replace Admin Panel link label with proper "Login" button (ghost/outlined style)  
- [ ] Replace "Post a Job" with "Sign Up" button (filled primary style)
- [ ] Add "Post a Job →" link pointing to `/admin/jobs`
- [ ] Verify logo mark matches Figma (blue `Q` block)
- [ ] Test mobile hamburger — all links work on close

**Acceptance Criteria:**
```
Desktop: [Logo QuickHire]   [Find Jobs]  [Browse Companies]   [Login]  |  [Sign Up →]
Mobile:  [Logo]                                                              [☰]
         → drawer: Find Jobs / Browse Companies / Login / Sign Up
```

---

### 2.2 — Hero Section (`HeroSection.tsx`) 🔧

**Current State:** Well implemented. Minor issues:
- Background decoration is CSS radial gradient — Figma shows right-side decorative illustration
- "No. 1 Job Search Platform" eyebrow needs styling with a colored dot/pill per Figma
- SVG underline under "5000+" is custom — check it matches Figma exactly

**Tasks:**
- [ ] Verify text content exactly matches Figma: `"Discover more than 5000+ Jobs"`, subtitle, popular tags
- [ ] Add or verify right-side decorative image/illustration (or keep gradient if no asset available)
- [ ] Popular tag links should be styled as pill chips, not plain underlined text
- [ ] Search button label: `"Search my job"` — already correct
- [ ] Background color `bg-neutrals-10` — verify matches Figma

**Acceptance Criteria:**
```
Section bg: #F8F8FD
H1: "Discover more than 5000+ Jobs" (56px bold, "5000+" in #4640DE with underline)
Subtitle: "Great platform for the job seeker..." (18px, muted)
Search bar: white card with shadow, [🔍 Job title] | divider | [📍 City/remote] | [Search my job]
Popular: pill-style links for UI Designer, UX Researcher, Android, Admin
```

---

### 2.3 — Company Section (`CompanySection.tsx`) 🔧

**Current State:** Exists. Needs verification.

**Tasks:**
- [ ] Heading: `"Companies we helped grow"` — verify text and styling
- [ ] 8 company logos in a horizontal row with proper `CompanyLogo` component
- [ ] Companies: Nomad, Dropbox, Revolut, Canva, Terraform, ClassPass, Pitch, Blinkist
- [ ] Logos should use clearbit: `https://logo.clearbit.com/{domain}`
- [ ] Grayscale filter on logos, color on hover — verify this is implemented
- [ ] Responsive: logos wrap on mobile

**Acceptance Criteria:**
```
Section bg: white
Heading center-aligned: "Companies we helped grow" (muted color, not bold)
Row of 8 logos: grayscale, hover → color, equal spacing
```

---

### 2.4 — Category Section (`CategorySection.tsx`) 🔧

**Current State:** Implemented with hardcoded job counts and emoji icons. Issues:
- Job counts should come from the API, not hardcoded numbers
- Icons are emojis — Figma likely uses SVG icons (check Figma)
- Active card is hardcoded to "Marketing" — should be no default active state

**Tasks:**
- [ ] Fetch real job counts per category from `GET /api/jobs?category=X&limit=1` (use `meta.total`)  
  — OR — keep hardcoded counts if they match Figma (acceptable for MVP)
- [ ] Remove hardcoded `active: true` on Marketing — no card should be pre-selected
- [ ] Replace emoji icons with proper SVG icons matching Figma (or keep emojis if acceptable)
- [ ] Verify 4-column grid on desktop, 2-column on mobile
- [ ] Card hover: `border-primary bg-primary-25` (not full primary bg on hover)
- [ ] "Show all jobs →" link top-right

**Category Cards (8):**
```
Design     | 🎨 | /jobs?category=Design
Sales      | 📊 | /jobs?category=Sales
Marketing  | 📣 | /jobs?category=Marketing
Finance    | 💰 | /jobs?category=Finance
Engineering| ⚙️  | /jobs?category=Engineering
Business   | 💼 | /jobs?category=Business
HR         | 👥 | /jobs?category=HR
Tech       | 💻 | /jobs?category=Tech
```

**Acceptance Criteria:**
```
8 cards in 4-col grid
Default: white bg, neutrals-20 border
Hover: bg-primary-25 border-primary
Active (clicked): bg-primary border-primary, white text
"X jobs available" with arrow icon in each card
```

---

### 2.5 — CTA Section (`CTASection.tsx`) 🔧

**Current State:** Exists. Needs verification against Figma.

**Tasks:**
- [ ] Left panel (Job Seekers): purple/primary bg `#4640DE`, white text
  - Title: `"We're Hiring Talented People Like You"`
  - Subtitle copy from Figma
  - Button: `"Search a Job →"` → `/jobs`
- [ ] Right panel (Companies): dark bg `#202430`, white text
  - Title: `"Post Your Jobs and Find the Best Candidates"`
  - Subtitle copy from Figma
  - Button: `"Post a Job →"` → `/admin/jobs`
- [ ] Decorative person illustrations (use solid bg color if no illustration assets)
- [ ] Verify equal 50/50 split on desktop, stacked on mobile

---

### 2.6 — Featured Jobs Section (`FeaturedJobsSection.tsx`) 🔧

**Current State:** Server component that fetches jobs. Needs UI verification.

**Tasks:**
- [ ] Section heading: `"Latest Jobs Open"` with `"Show all jobs →"` link
- [ ] Fetches `GET /api/jobs?limit=8` — verify API call uses correct base URL
- [ ] Uses `JobCard` grid variant — verify card matches Figma
- [ ] 4-column grid on desktop, 2-col on tablet, 1-col on mobile
- [ ] Handle loading state (this is a server component — add suspense boundary in parent)
- [ ] Handle error state if API is down

---

### 2.7 — Latest Jobs Section (`LatestJobsSection.tsx`) 🔧

**Current State:** Server component. Needs verification.

**Tasks:**
- [ ] Fetches `GET /api/jobs?limit=6` with list variant `JobCard`
- [ ] "View All →" button at bottom → `/jobs`
- [ ] List variant cards: full-width, horizontal layout
- [ ] Verify section heading matches Figma

---

### 2.8 — Footer (`Footer.tsx`) 🔧

**Current State:** Exists. Needs full verification.

**Tasks:**
- [ ] Background: `#202430` (footer-bg)
- [ ] Logo: white version of QuickHire mark
- [ ] Tagline text
- [ ] Newsletter input + subscribe button
- [ ] 3-column link grid:
  - About: About Us, Articles, Careers, Contact
  - Company: Services, Pricing, FAQ
  - Resources: Blog, Newsletter, Events
- [ ] Social icons: LinkedIn, Facebook, Twitter/X, Instagram
- [ ] Bottom bar: copyright + legal links
- [ ] Fully responsive

---

## Phase 3 — Job Listings Page `/jobs`

**File:** `frontend/src/app/jobs/page.tsx`
**Component:** `frontend/src/components/jobs/JobFilters.tsx`, `JobCard.tsx`

**Current State:** Implemented as client component with search/filter/pagination/view toggle.

### Issues to Fix / Verify:

**3.1 — Page Layout**
- [ ] Left sidebar (filters) — verify Figma layout: sidebar is fixed-width left column on desktop
- [ ] Right content area — job count header + grid/list + pagination
- [ ] Page heading: `"All Jobs"` with count `"Showing 1–10 of 42 jobs"`
- [ ] View toggle (grid/list icons) positioned top-right of results

**3.2 — Search Bar at Top**
- [ ] Matches same style as hero search bar (white card, icon, border)
- [ ] Search and location inputs side-by-side
- [ ] Debounced input (already in `useDebounce.ts`) — verify 400ms

**3.3 — Filter Sidebar (`JobFilters.tsx`)**
- [ ] Section: "Type of Employment" — checkboxes (Full-Time, Part-Time, Remote, Internship, Contract)  
  **Note:** Current impl uses radio buttons — Figma shows **checkboxes** (multi-select)
- [ ] Section: "Categories" — checkboxes for each category
- [ ] Section: "Job Level" — checkboxes (Entry, Mid, Senior) — check if in Figma
- [ ] Filter counts in brackets: `Full-Time (242)`
- [ ] "Reset Filters" link button at top of sidebar
- [ ] Active filter count badge on mobile filter toggle

**3.4 — Job Card (`JobCard.tsx`) — List Variant**
- [ ] Company logo (40x40 rounded, with fallback)
- [ ] Job title (bold, links to `/jobs/[id]`)
- [ ] Company name + location (with MapPin icon)
- [ ] Tags row: category badge, type badge (colored by type)
- [ ] Posted date
- [ ] Apply button or arrow link on right
- [ ] Hover state: card gets border/shadow

**3.5 — Job Card (`JobCard.tsx`) — Grid Variant**
- [ ] Company logo at top
- [ ] Job title + company
- [ ] Location + tags
- [ ] Type badge bottom-right

**3.6 — Pagination**
- [ ] Previous / Next buttons
- [ ] Page number buttons (up to 5 pages shown)
- [ ] Current page highlighted
- [ ] Disabled state when on first/last page

**3.7 — Empty State**
- [ ] "No jobs found" message + illustration when filters return 0 results
- [ ] "Clear filters" button in empty state

**3.8 — Loading Skeleton**
- [ ] While `loading === true`, show 6 skeleton cards in place of real cards
- [ ] Skeleton should match the card dimensions (animated pulse)

**3.9 — URL Sync**
- [ ] All filter changes update URL query params (`?search=&category=&type=&page=`)
- [ ] Sharing/refreshing the URL restores the same filter state

---

## Phase 4 — Job Detail Page `/jobs/[id]`

**File:** `frontend/src/app/jobs/[id]/page.tsx`
**Components:** `ApplyButton.tsx`, `ApplyForm.tsx`

**Current State:** Server component exists. Needs layout and UX verification.

### Tasks:

**4.1 — Page Layout**
- [ ] Breadcrumb: `Home  /  Find Jobs  /  {Job Title}` at top
- [ ] Two-column layout: left 65% content, right 35% sticky sidebar
- [ ] On mobile: sidebar stacks below content

**4.2 — Job Header**
- [ ] Company logo (64x64)
- [ ] Job title (H2, bold)
- [ ] Company name + location (with icons)
- [ ] Posted date: `"Posted X days ago"` (calculate from `createdAt`)
- [ ] Type badge (Full-Time / Remote / etc.) — colored
- [ ] Category badge

**4.3 — Job Description**
- [ ] Render description as formatted text
- [ ] Description uses `\n\n` for paragraphs and `**text**` for bold — render properly
- [ ] Consider using `react-markdown` or `dangerouslySetInnerHTML` with basic parser
- [ ] **Responsibilities** and **Requirements** sub-sections should be visually distinct

**4.4 — Right Sidebar**
- [ ] Sticky positioning: `sticky top-24`
- [ ] Company info card: logo, name, link
- [ ] "Apply for this Job" primary button — full width
- [ ] Job summary info: location, type, salary (if present)
- [ ] "Share this job" links (Twitter, LinkedIn, copy link)

**4.5 — Apply Modal (`ApplyForm.tsx`)**
- [ ] Triggered by "Apply for this Job" button (`ApplyButton.tsx` wrapper)
- [ ] Modal overlay: dark backdrop, centered card
- [ ] Form fields:
  - Full name (required)
  - Email address (required, validated)
  - Resume URL (required, must be valid URL)
  - Cover note (optional, textarea)
- [ ] Submit button: "Submit Application" (primary, full width)
- [ ] Loading state on submit (disable button + spinner)
- [ ] **Success state:** Replace form with: ✅ "Application Submitted! We'll be in touch."
- [ ] **Error state:** Show API validation errors inline per field
- [ ] Close X button + click-outside to dismiss

**4.6 — Related Jobs**
- [ ] Optional: "More Jobs at {Company}" section below description
- [ ] Fetch `GET /api/jobs?company={company}&limit=3` — exclude current job

---

## Phase 5 — Admin Panel `/admin`

**Files:**
- `frontend/src/app/admin/layout.tsx`
- `frontend/src/app/admin/page.tsx` (dashboard)
- `frontend/src/app/admin/jobs/page.tsx`
- `frontend/src/app/admin/applicants/page.tsx`
- `frontend/src/app/admin/settings/page.tsx`
- `frontend/src/components/layout/AdminSidebar.tsx`

**Current State:** All pages exist as client components. Need full verification and functional testing.

### 5.1 — Admin Layout + Sidebar (`AdminSidebar.tsx`)

**Tasks:**
- [ ] Sidebar width: fixed `w-64` on desktop
- [ ] Logo at top of sidebar: QuickHire mark + label
- [ ] Nav items with icons:
  - Dashboard (Home icon) → `/admin`
  - Job Listing (Briefcase icon) → `/admin/jobs`
  - Applicants (Users icon) → `/admin/applicants`
  - Settings (Settings icon) → `/admin/settings`
- [ ] Active state: `bg-primary-25 text-primary border-l-4 border-primary`
- [ ] Bottom items: Help, Sign Out (→ `/`)
- [ ] Mobile: sidebar hidden, top bar with hamburger instead
- [ ] Top bar: "Admin Panel" title + user avatar placeholder

### 5.2 — Admin Dashboard `/admin` (Stats Page)

**Tasks:**
- [ ] Page title: "Dashboard" heading
- [ ] 4 stat cards:
  - **Total Jobs** — count from `GET /api/jobs?limit=1` (`meta.total`)
  - **Total Applications** — count from `GET /api/applications`
  - **Active Jobs** — same as Total Jobs for now
  - **Companies** — count of distinct companies (approximate)
- [ ] Each card: icon, number (large), label, optional trend indicator
- [ ] Quick action buttons: "Post New Job →" / "View Applicants →"
- [ ] Recent jobs table (5 most recent) with link to `/admin/jobs`

### 5.3 — Admin Jobs Page `/admin/jobs`

**Tasks:**

**Jobs Table:**
- [ ] Columns: Logo | Title | Company | Location | Category | Type | Posted | Actions
- [ ] Delete button per row — opens confirmation dialog before deleting
- [ ] Confirmation dialog: "Are you sure you want to delete '{title}'?" with Cancel / Delete buttons
- [ ] After delete: remove row from table without full page reload
- [ ] Loading skeleton while fetching
- [ ] Empty state if no jobs

**Create Job Form (Modal or Inline):**
- [ ] "Post a New Job" button → opens modal
- [ ] Fields:
  | Field | Type | Validation |
  |---|---|---|
  | Job Title | text input | required |
  | Company Name | text input | required |
  | Location | text input | required |
  | Category | select dropdown | required, one of 8 categories |
  | Job Type | select dropdown | required, one of: Full-Time / Part-Time / Remote / Contract / Internship |
  | Description | textarea (tall) | required, min 20 chars |
  | Company Logo URL | text input | optional, must be valid URL if provided |
  | Salary Range | text input | optional, e.g. "80k-120k" |
- [ ] Submit → `POST /api/jobs` → on success, add new job to table top
- [ ] Show field-level validation errors from API response
- [ ] Loading state while submitting

### 5.4 — Admin Applicants Page `/admin/applicants`

**Tasks:**
- [ ] Fetch from `GET /api/applications`
- [ ] Table columns: Name | Email | Job Title | Company | Resume | Cover Note | Date
- [ ] Resume column: clickable "View Resume →" link (opens in new tab)
- [ ] Cover note: truncated with "Read more" expand
- [ ] Filter by job: dropdown to select a job and filter applicants
- [ ] Empty state if no applications yet
- [ ] Loading skeleton

### 5.5 — Admin Settings Page `/admin/settings`

**Tasks:**
- [ ] Stub page is acceptable per spec — just needs to look clean
- [ ] Title: "Settings"
- [ ] Placeholder sections: Profile, Notifications, API Keys (all non-functional)

---

## Phase 6 — Responsiveness Pass

**Breakpoints used:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Tasks (all pages):

| Page | Mobile Fix |
|---|---|
| Landing Page | Navbar hamburger, hero stacks, categories 2-col, CTA stacks |
| Jobs Page | Filter sidebar becomes a drawer/sheet triggered by "Filters" button |
| Job Detail | Sidebar moves below content, apply button becomes floating bottom bar |
| Admin | Sidebar collapses, top hamburger bar |

### Component-level responsive checklist:
- [ ] `Navbar.tsx` — hamburger menu works, links close drawer on click
- [ ] `HeroSection.tsx` — text scales down, search bar stacks vertically on mobile
- [ ] `CategorySection.tsx` — 4 cols → 2 cols → 2 cols
- [ ] `JobCard.tsx` — list variant stacks info on mobile
- [ ] `ApplyForm.tsx` — modal is full-screen on mobile
- [ ] `AdminSidebar.tsx` — hidden on mobile, toggled by header button

---

## Phase 7 — UX Polish

### 7.1 Loading States
- [ ] `FeaturedJobsSection.tsx` + `LatestJobsSection.tsx` — wrap in `<Suspense>` with skeleton fallback
- [ ] `/jobs` page — skeleton grid while API loads
- [ ] `/jobs/[id]` page — skeleton layout while job loads
- [ ] Admin tables — skeleton rows while data loads
- [ ] All API-triggering buttons — show spinner + disabled state while in-flight

**Skeleton pattern to use:**
```tsx
<div className="animate-pulse bg-neutrals-20 rounded-md h-6 w-3/4" />
```

### 7.2 Toast Notifications
- [ ] Install `react-hot-toast`: `npm install react-hot-toast --workspace=frontend`
- [ ] Add `<Toaster />` to root `layout.tsx`
- [ ] Fire toasts on:
  - ✅ Application submitted successfully
  - ✅ Job created successfully (admin)
  - ✅ Job deleted successfully (admin)
  - ❌ Any API error (generic: "Something went wrong. Please try again.")

### 7.3 Error States
- [ ] Create `frontend/src/app/not-found.tsx` — custom 404 page
- [ ] Create `frontend/src/app/error.tsx` — global error boundary
- [ ] Each API-dependent section should show a retry button on error
- [ ] `/jobs/[id]` — if job not found, redirect to `notFound()` (already in code, verify)

### 7.4 Form UX
- [ ] All required fields show `*` indicator
- [ ] Validation errors appear **inline** below each field, not as an alert
- [ ] Success messages replace the form (don't just close the modal)
- [ ] Tab order is logical on all forms

---

## Phase 8 — Submission Prep

### 8.1 Git History
- [ ] One commit per meaningful unit: `feat: add hero section`, `fix: job card mobile layout`, etc.
- [ ] Avoid: one giant commit with all files
- [ ] Use conventional commits: `feat:`, `fix:`, `chore:`, `style:`

### 8.2 README.md
Must clearly explain:
- [ ] Project overview + tech stack
- [ ] Prerequisites (Node 18+, Docker)
- [ ] Setup steps (clone → docker compose up → npm install → migrate → seed → npm run dev)
- [ ] All environment variables
- [ ] API endpoints summary
- [ ] Link to Swagger docs

### 8.3 Environment Variables Documentation
```
backend/.env:
  DATABASE_URL   PostgreSQL connection string
  PORT           API server port (default 4001)
  NODE_ENV       development | production
  FRONTEND_URL   CORS allowed origin

frontend/.env.local:
  NEXT_PUBLIC_API_URL   Full backend URL (e.g. http://localhost:4001)
```

### 8.4 Loom Demo Script (3–5 minutes)
Record a walkthrough covering:
1. **(0:00–0:30)** Landing page — hero, categories, featured jobs
2. **(0:30–1:30)** Job listings page — search by keyword, filter by category, switch grid/list
3. **(1:30–2:30)** Job detail page — description, apply form, fill + submit application
4. **(2:30–3:30)** Admin panel — view dashboard, create a new job (fills all fields, submits)
5. **(3:30–4:00)** Admin — delete a job, view applicants table
6. **(4:00–4:30)** API docs at `/api/docs` (bonus — shows backend quality)

### 8.5 Final Checklist Before Submission
- [ ] No `console.log` left in production code
- [ ] No hardcoded localhost URLs (use `process.env.NEXT_PUBLIC_API_URL`)
- [ ] All TypeScript errors resolved (`npx tsc --noEmit`)
- [ ] All pages load without errors in browser console
- [ ] Mobile layout verified at 375px width (iPhone SE size)
- [ ] Swagger docs accessible at `/api/docs`
- [ ] README is clear and complete
- [ ] GitHub repo is public
- [ ] Git commit history is clean (not a single commit)

---

## Build Order Recommendation

```
Day 1 — Landing Page Polish (Phase 2)
  Morning:
    ├── Fix Navbar (links, Login/SignUp buttons)
    ├── Verify/fix Hero Section against Figma
    └── Fix Company Section logos

  Afternoon:
    ├── Fix Category Section (remove hardcoded active, add real job counts)
    ├── Verify CTA Section
    └── Verify/fix Footer

Day 2 — Jobs & Detail Pages (Phase 3–4)
  Morning:
    ├── Fix JobCard component (list + grid variants)
    ├── Fix filter sidebar (checkboxes, filter counts)
    └── Fix pagination UI

  Afternoon:
    ├── Fix Job Detail page layout (2-col, sticky sidebar)
    ├── Fix ApplyForm modal (success state, validation errors, close behavior)
    └── Verify all apply form fields + API integration

Day 3 — Admin Panel (Phase 5)
  Morning:
    ├── Fix AdminSidebar active states + mobile
    ├── Fix Admin Dashboard stats (real data from API)
    └── Fix Admin Jobs table (delete confirmation, loading skeleton)

  Afternoon:
    ├── Fix Create Job modal (all fields, validation, success)
    ├── Fix Applicants table (job filter, resume link)
    └── Admin Settings stub

Day 4 — Polish + Submission (Phase 6–8)
  Morning:
    ├── Responsiveness pass on all pages (375px → 1280px)
    ├── Add react-hot-toast + wire up toasts
    └── Add loading skeletons (Suspense boundaries)

  Afternoon:
    ├── Add custom 404 + error pages
    ├── Clean up TypeScript errors
    ├── Update README
    └── Record Loom demo
```

---

## Component Dependency Map

```
page.tsx (Landing)
├── Navbar.tsx
├── HeroSection.tsx
├── CompanySection.tsx
│   └── CompanyLogo.tsx
├── CategorySection.tsx
├── CTASection.tsx
├── FeaturedJobsSection.tsx
│   └── JobCard.tsx (grid)
│       └── Badge.tsx
│       └── CompanyLogo.tsx
├── LatestJobsSection.tsx
│   └── JobCard.tsx (list)
└── Footer.tsx

/jobs/page.tsx
├── Navbar.tsx
├── JobFilters.tsx
├── JobCard.tsx (list or grid)
│   └── Badge.tsx
│   └── CompanyLogo.tsx
└── Footer.tsx

/jobs/[id]/page.tsx
├── Navbar.tsx
├── Badge.tsx
├── CompanyLogo.tsx
├── ApplyButton.tsx
│   └── ApplyForm.tsx
└── Footer.tsx

/admin/layout.tsx
└── AdminSidebar.tsx

/admin/page.tsx (dashboard)
/admin/jobs/page.tsx
/admin/applicants/page.tsx
/admin/settings/page.tsx
```

---

## Known Issues to Fix

| Issue | File | Priority |
|---|---|---|
| "Browse Companies" nav link goes to `/admin` | `Navbar.tsx` | High |
| Category job counts are hardcoded | `CategorySection.tsx` | Medium |
| No toast notifications anywhere | Global | Medium |
| No custom 404 page | `app/not-found.tsx` | Medium |
| Filter sidebar uses radio buttons | `JobFilters.tsx` | Medium — Figma shows checkboxes |
| Admin stats are not fetching real data | `admin/page.tsx` | High |
| Delete job has no confirmation dialog | `admin/jobs/page.tsx` | High |
| Apply form success state needs verification | `ApplyForm.tsx` | High |
| Loading skeletons missing on server components | Multiple | Medium |
| No `Suspense` boundaries on server components | `page.tsx`, layout files | Medium |
