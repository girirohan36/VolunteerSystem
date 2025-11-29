

# Project Volunteer

### **A 3-tier full-stack volunteer management system built in 2 days using FastAPI, React, Supabase, Docker, GCP & agentic AI.**

---

##  Overview

Project Volunteer is a full-stack 3-tier application (**Frontend → API → Database**) that helps manage volunteer registrations, categories, and tasks.
The entire system was designed, built, debugged, and deployed over Thanksgiving break using an **agentic AI workflow**.

<img width="2360" height="1640" alt="IMG_0676" src="https://github.com/user-attachments/assets/e08da4a7-2cbe-4e02-b37e-1166e05e1bf1" />


## Architecture

```
React (Frontend)
      ↓
FastAPI (Backend APIs)
      ↓
Supabase / Postgres (Database)
```

* **Frontend:** React SPA + Tailwind-style utilities
* **Backend:** FastAPI + Pydantic + Supabase Python client
* **Database:** Supabase (Postgres)
* **Cloud:** Docker → Cloud Run (API), GCS (Frontend)
* **Security:** IAM roles + Secret Manager for keys
* **AI Workflow:** Used agentic AI for architecture, scaffolding, debugging, and infra guidance

---

## Tech Stack

**Frontend:**

* React
* Tailwind-style utility classes
* lucide-react
* Recharts

**Backend:**

* FastAPI
* Pydantic
* Supabase Python Client
* Docker

**Database:**

* Supabase
* Postgres

**Cloud:**

* Google Cloud Run
* Google Cloud Storage (GCS)
* Google IAM
* Secret Manager

**AI:**

* Agentic AI workflow for code generation, debugging, architecture & learning

---


## 🧪 Running Locally

### Backend

```bash
cd volunteer-backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd volunteer-frontend
npm install
npm run dev
```

Backend → [http://localhost:8000](http://localhost:8000)
Frontend → [http://localhost:5173](http://localhost:5173)

---

##  Docker

```bash
docker build -t volunteer-api .
docker run -p 8000:8000 volunteer-api
```

---

##  Deployment

### Deploy Backend (Cloud Run)

```bash
gcloud run deploy volunteer-api \
  --image gcr.io/<project-id>/volunteer-api \
  --platform managed \
  --region us-central1
```

### Deploy Frontend (GCS)

```bash
npm run build
gsutil cp -r dist/* gs://<your-bucket-name>/
```

---

##  Agentic AI Workflow

We used an AI-in-the-loop workflow to:

* Break work into tasks
* Propose architecture patterns
* Scaffold routers/services/schemas
* Debug Supabase, IAM, CORS & Cloud Run issues
* Learn infra concepts while building
* Speed up iteration and development


## 👥 Contributors

**Rohan Giri** — Frontend, API integrations, Cloud, Agentic AI
**Manas Mishra** — Backend, Supabase Integration, Cloud Run
