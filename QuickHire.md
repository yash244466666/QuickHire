# QuickHire – Simple Job Board Application

## 📌 Task Overview

### Project Description
You are required to build a mini job board application using:

- **Frontend:** Next.js (or React.js)
- **Backend:** Node.js/Express
- **Database:** PostgreSQL

The system should allow users to:

- Browse job listings
- Filter/search jobs
- View job details
- Submit applications

A simple admin panel should allow:

- Posting job listings
- Managing (deleting) job listings

This task will help evaluate:

- Frontend UI skills
- Backend API design
- Database structure
- Code organization
- Overall development approach

**Estimated Time:** 6–8 hours  
**Deadline:** ASAP  

---

# 🎨 UI Design Requirement (Mandatory)

You must implement the UI based on the following Figma template:

**Figma Link:**  
https://www.figma.com/design/PWYovqdcSczquXZKbRLOKC/QuickHire?node-id=0-1&p=f

Your implementation should closely follow the design in terms of:

1. Layout structure  
2. Typography  
3. Color scheme  
4. Spacing and alignment  
5. Overall look and feel  

> Minor adaptations are acceptable, but the final result must strongly match the provided design.

---

# 🚀 Core Requirements

## 1️⃣ Frontend (Next.js)

Your frontend must include:

### 🗂 Job Listings Page
- Display all jobs
- Search functionality
- Filter by category and/or location
- Clean, responsive layout

### 📄 Job Detail Page
- Show full job description
- “Apply Now” form including:
  - Name
  - Email
  - Resume link (URL)
  - Cover note

### 🔐 Basic Admin View
- Add new job listings
- Delete job listings

### 📱 Responsive UI
- Must be fully responsive
- Use Tailwind CSS or Bootstrap
- Maintain a clean and professional UX

### ♻️ Reusable Components
- Proper component structure
- Organized folder structure
- Clean naming conventions

---

## 2️⃣ Backend (Node.js)

Build a RESTful API with the following functionality:

### Required Endpoints

#### Jobs
- `GET /api/jobs` → List all jobs  
- `GET /api/jobs/{id}` → Get single job details  
- `POST /api/jobs` → Create a job (Admin)  
- `DELETE /api/jobs/{id}` → Delete a job (Admin)  

#### Applications
- `POST /api/applications` → Submit job application  

---

## 3️⃣ Database (PostgreSQL)

- Use PostgreSQL
- Persist job listings and applications
- Proper model relationships (e.g., Job → Applications)

### Example Models

#### Job
```
id
title
company
location
category
description
created_at
```

#### Application
```
id
job_id
name
email
resume_link
cover_note
created_at
```

---

## 4️⃣ Validation

- Basic input validation on all endpoints
- Required fields must be validated
- Email must be properly formatted
- Resume link must be a valid URL

---

## 5️⃣ Code Quality

- Clean folder structure
- Meaningful naming conventions
- Modular and reusable components
- Organized API structure
- Basic `README.md` file with setup instructions

---

## 6️⃣ Bonus (Optional but Recommended)

- Deployed frontend/backend (e.g., Vercel, Railway, Render)
- Improved admin UI
- Better filtering logic
- Loading states & UX enhancements
- Environment-based configuration
- Clean API response formatting

---

## 7️⃣ Submission Instructions

Push your project to a **public GitHub repository**.

Your repository must include a clear `README.md` that:

- Explains the project
- Shows how to run it locally
- Mentions environment variables (if any)

Record a short **Loom or screen-recorded demo (3–5 minutes)** walking through:

- Job listing
- Job details
- Applying to a job
- Admin creating/deleting a job

A live deployed link is a bonus.

### Please submit with:
- GitHub repository link
- Loom/demo link
- Live link (if available)

---

# ⚠️ Important Notes

- Follow clean coding standards.
- Maintain a logical Git commit history (avoid pushing everything at once).
- Partial progress is acceptable — effort, structure, and problem-solving clarity are valued.
- Even if all features are not completed, submit your work.