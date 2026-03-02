# QuickHire 🚀

A full-stack job board application built with **Next.js 14**, **Node.js/Express**, and **PostgreSQL**.

> UI based on the [Figma design](https://www.figma.com/design/PWYovqdcSczquXZKbRLOKC/QuickHire)

---

## ✨ Features

- 🗂 **Job Listings** — Browse, search, and filter jobs by category, location, and type  
- 📄 **Job Detail** — Full job description with application form (modal)  
- 📝 **Apply Now** — Submit name, email, resume link, and cover note  
- 🔐 **Admin Panel** — Post job listings, delete jobs, view all applications  
- 📱 **Responsive** — Works on desktop and mobile  
- ⚡ **Fast** — Next.js 14 App Router with server components

---

## 🛠 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | Next.js 14, TypeScript, Tailwind CSS |
| Backend    | Node.js, Express, TypeScript        |
| ORM        | Prisma                              |
| Database   | PostgreSQL                          |

---

## 📁 Project Structure

```
QuickHire/
├── frontend/            ← Next.js 14 app
├── backend/             ← Express API
├── docker-compose.yml   ← PostgreSQL + pgAdmin
├── pgadmin-servers.json ← pgAdmin auto-connection config
├── AGENT.md             ← AI context & full project plan
└── README.md            ← this file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- npm 9+

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/quickhire.git
cd quickhire
```

### 2. Start the database

```bash
docker compose up -d
```

| Service    | URL                   | Credentials                              |
|------------|-----------------------|------------------------------------------|
| PostgreSQL | `localhost:5432`      | user: `postgres` / password: `postgres`  |
| pgAdmin 4  | http://localhost:5050 | email: `admin@quickhire.com` / pw: `admin` |

pgAdmin opens with the QuickHire server already connected — no manual setup needed.

### 3. Install dependencies

```bash
# From repo root — installs frontend + backend workspaces
npm install
```

### 4. Run Prisma migration & seed

```bash
cd backend
npx prisma migrate dev --name init
npx ts-node prisma/seed.ts   # seeds 12 sample jobs
cd ..
```

### 5. Start development servers

```bash
# From repo root — starts both concurrently
npm run dev

# Or separately:
# Backend  → http://localhost:4000
cd backend && npm run dev

# Frontend → http://localhost:3000
cd frontend && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🐳 Docker Commands

```bash
# Start services in background
docker compose up -d

# Stop services (data is preserved)
docker compose stop

# Stop and wipe all data (fresh start)
docker compose down -v

# View postgres logs
docker compose logs -f postgres
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

| Variable        | Description                          | Example                                           |
|-----------------|--------------------------------------|---------------------------------------------------|
| `DATABASE_URL`  | PostgreSQL connection string         | `postgresql://postgres:pass@localhost:5432/quickhire` |
| `PORT`          | API server port                      | `4000`                                            |
| `NODE_ENV`      | Environment                          | `development`                                     |
| `FRONTEND_URL`  | Frontend URL (for CORS)              | `http://localhost:3000`                            |

### Frontend (`frontend/.env.local`)

| Variable              | Description        | Example                      |
|-----------------------|--------------------|------------------------------|
| `NEXT_PUBLIC_API_URL` | Backend API URL    | `http://localhost:4000`      |

---

## 📡 API Endpoints

| Method | Endpoint                | Description              |
|--------|-------------------------|--------------------------|
| GET    | `/api/jobs`             | List all jobs (filterable) |
| GET    | `/api/jobs/:id`         | Get job details          |
| POST   | `/api/jobs`             | Create a job (admin)     |
| DELETE | `/api/jobs/:id`         | Delete a job (admin)     |
| POST   | `/api/applications`     | Submit application       |
| GET    | `/api/applications`     | List all applications    |

### Query Params for `GET /api/jobs`

- `?search=` — full-text search (title, company, description)  
- `?category=` — filter by category  
- `?location=` — filter by location  
- `?type=` — job type (Full-Time, Part-Time, Remote, etc.)  
- `?page=` / `?limit=` — pagination

---

## 🗄 Database Schema

```sql
-- Jobs table
id, title, company, location, category, type, description, logo, salary, created_at

-- Applications table
id, job_id (FK → jobs), name, email, resume_link, cover_note, created_at
```

---

## 🎨 Design System

Based on the Figma design. Key colors:

- **Primary**: `#4640DE`
- **Text Dark**: `#25324B`  
- **Text Light**: `#7C8493`
- **Border**: `#D6DDEB`
- **Background**: `#F8F8FD`

Font: **Epilogue** (Google Fonts)

---

## 📖 Pages

| Route               | Description              |
|---------------------|--------------------------|
| `/`                 | Landing page             |
| `/jobs`             | Job listings with search/filter |
| `/jobs/:id`         | Job detail + apply form  |
| `/admin`            | Admin dashboard          |
| `/admin/jobs`       | Manage job listings      |
| `/admin/applicants` | View all applications    |
