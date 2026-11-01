# RESUME XPERT
### AWS Generative AI Career & Recruitment Intelligence Platform

> **"Your Resume. Your Potential. Your Next Opportunity -- Powered by AWS GenAI."**

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Production-black?logo=vercel)](https://resume-xpert-nine.vercel.app)
[![AWS Bedrock](https://img.shields.io/badge/AWS-Amazon%20Bedrock-orange?logo=amazon-aws)](https://resume-xpert-nine.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/GillaRohan/resume-xpert)

---

## 🚀 Live Production Links
- **Live Vercel Application:** [https://resume-xpert-nine.vercel.app](https://resume-xpert-nine.vercel.app)
- **Direct Deployment URL:** [https://resume-xpert-g7dwlsbet-gillarohan.vercel.app](https://resume-xpert-g7dwlsbet-gillarohan.vercel.app)
- **Local Dev Server:** `http://localhost:3000`
- **Local Backend API & Swagger Docs:** `http://localhost:8000/docs`

---

## 🌟 Executive Overview
**Resume Xpert** is an end-to-end, enterprise-grade AI career and talent intelligence operating system engineered for ambitious job candidates and high-velocity recruitment teams. 

The platform is integrated with a **production-ready Python FastAPI backend** and a cinematic **React + Vite frontend**, powered by **Amazon Bedrock (Claude 3.5 Sonnet / Titan)**, **AWS Textract**, **Amazon S3**, and **Titan Vector Embeddings**.

Built specifically for:
- 🎓 **College Capstone Projects & Placement Reviews**
- 🚀 **AWS AI Hackathons & Startup Showcases**
- 💼 **Recruiter Screenings & Automated Talent Shortlisting**

---

## ☁️ AWS Generative AI Architecture

```
                  ┌────────────────────────────────────────┐
                  │          Vite + React Frontend         │
                  │        (Port 3000 / Proxy /api)        │
                  └──────────────────┬─────────────────────┘
                                     │ REST HTTP / JSON
                                     ▼
                  ┌────────────────────────────────────────┐
                  │      FastAPI Python Server (Port 8000) │
                  │       (Boto3 / PyPDF / Scikit-Learn)   │
                  └───────┬──────────┬──────────┬──────────┘
                          │          │          │
         ┌────────────────┘          │          └────────────────┐
         ▼                           ▼                           ▼
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────────┐
│   AWS Textract   │       │  Amazon Bedrock  │       │   Amazon Bedrock     │
│   Document OCR   │       │ Claude 3.5 Sonnet│       │  Titan Embeddings    │
│  & S3 Ingestion  │       │  & Titan Text    │       │  1536-dim Vector RAG │
└──────────────────┘       └──────────────────┘       └──────────────────────┘
```

### 1. Document Ingestion & OCR: AWS Textract + Amazon S3
- Candidate resumes (PDF, DOCX, TXT) are ingested and parsed.
- AWS Textract extracts structured text, tabular metrics, and multi-column formatting, with PyPDF local fallback.

### 2. LLM Feature Extraction: Amazon Bedrock (Anthropic Claude 3.5 Sonnet)
- Extracts candidate skills, education, work experience, projects, and certifications into a validated schema.
- Assigns explicit line-level provenance ("Line 55: Text Match") and inferred capabilities.
- Calculates an explainable 5-dimensional Career Readiness index (Technical, Experience, Projects, Education, Certifications).

### 3. Vector Embeddings & RAG: Amazon Bedrock Titan Embeddings (`amazon.titan-embed-text-v1`)
- Generates 1536-dimensional vector embeddings for candidate Skill DNA.
- Computes cosine similarity between candidate profile vectors and job requisitions.
- Detects duplicate candidate applications using vector fingerprinting.

### 4. Responsible AI & Guardrails: Amazon Bedrock Guardrails
- DEI Blind Screening mode redacts candidate PII (name, photo, contact) to eliminate cognitive bias.
- Enforces Human-in-the-Loop policies for recruitment shortlisting.

---

## ⚡ Key Modules & Experiences

### 1. Candidate Workspace
- **Overview Dashboard**: Circular **Career Readiness** gauge, Resume Health, Top Job Fit (92%), and Skill Strength.
- **Resume Analyzer**: Real-time PDF/DOCX file upload, line evidence provenance, and AI resume improvement recommendations.
- **Career & Job Matcher**: Live vector matching against catalog jobs + instant custom job description analyzer.
- **Skill Gap Intelligence**: Skill bridge matrix (`Current Skills → Skill Gaps → Learning Goal → Real Project → Job Ready`).
- **Learning Roadmap**: Interactive timeline filterable by 30 Days, 60 Days, 90 Days, and 6 Months.
- **Xpert AI Coach**: Context-aware assistant powered by Amazon Bedrock with multilingual support (**English, Hindi, Telugu, Tamil, Kannada**).
- **Mock Interview Coach**: Technical, HR, Behavioral, and Project question drills with AI debrief across 4 dimensions (**Communication, Tech Accuracy, Relevance, Confidence**).

### 2. Recruiter Hub
- **Command Center**: Recruitment funnel pipeline (1,284 applications → 342 qualified → 87 shortlisted → 6 finalists).
- **Bulk Upload**: Batch resume ingestion with real-time 6-stage AWS processing telemetry.
- **Candidate Ranking**: AI screening ranking with required/preferred skills breakdown and *"Why This Candidate?"* reasoning.
- **Candidate Comparison**: Side-by-side benchmark of top applicants with overall leader trophy.
- **Explainable AI (XAI)**: SHAP-style attribution weights and feature explanations.
- **Duplicate Detection**: Vector fingerprinting detecting duplicate applications and resume variations.
- **AI Job Description Generator**: Single-click requisition creator powered by Amazon Bedrock.

---

## 🛠️ Tech Stack & Directory Structure

- **Backend**: Python 3.10+ / FastAPI, Uvicorn, Boto3 (AWS SDK), Pydantic v2, PyPDF, Scikit-learn, Requests, Dotenv.
- **Frontend**: React 18, Vite 5, TypeScript, Tailwind CSS, Lucide Icons.
- **Cloud & AI**: Amazon Bedrock, AWS Textract, Amazon S3, Titan Vector Embeddings.

```
aws_project/
├── backend/                        # Python FastAPI Backend
│   ├── app/
│   │   ├── config.py               # AWS & environment configuration
│   │   ├── main.py                 # FastAPI application & CORS routing
│   │   ├── services/
│   │   │   ├── aws_service.py      # Boto3 Bedrock, Textract, S3 & vector service
│   │   │   ├── resume_parser.py    # NER extraction & career readiness scoring
│   │   │   ├── coach_service.py    # AI Coach & mock interview evaluation
│   │   │   ├── job_service.py      # Vector cosine job matching & AI JD generator
│   │   │   └── recruiter_service.py# Bulk screening, comparison & duplicate detection
│   │   └── routers/
│   │       ├── aws_status.py       # GET /api/aws/status & POST /api/aws/config
│   │       ├── resumes.py          # POST /api/resumes/analyze
│   │       ├── coach.py            # POST /api/coach/chat & evaluate-answer
│   │       ├── jobs.py             # POST /api/jobs/match & match-custom
│   │       └── recruiter.py        # POST /api/recruiter/bulk-screen
│   ├── .env.example                # AWS credentials template
│   ├── requirements.txt            # Python dependencies
│   └── run.py                      # Standalone backend server launcher
├── src/                            # React 18 + TypeScript Frontend
│   ├── components/                 # Candidate, Recruiter & Common Views
│   ├── services/
│   │   ├── api.ts                  # Unified API client with resilient fallbacks
│   │   └── mockApi.ts              # Compatibility adapter
│   └── context/                    # AppContext global state
├── scripts/
│   └── start-all.js                # One-click dual server launcher
├── start.bat                       # Windows double-click start script
├── package.json
└── vite.config.ts                  # Proxy configured for /api -> port 8000
```

---

## 🚀 Running the Project

### Option A: One-Click Windows Launch
Double-click `start.bat` in the project root folder. It starts both the FastAPI backend and the Vite frontend in separate terminal windows!

### Option B: Using npm
```bash
# 1. Install frontend dependencies
npm install

# 2. Run both Backend (Port 8000) and Frontend (Port 3000) concurrently:
npm run start:all
```

### Option C: Run Separately
```bash
# Terminal 1 - Backend
python backend/run.py
# (Listening on http://127.0.0.1:8000 - Interactive Swagger Docs: http://127.0.0.1:8000/docs)

# Terminal 2 - Frontend
npm run dev
# (Listening on http://localhost:3000)
```

---

## 🔑 AWS Credentials Configuration

You can configure AWS credentials in either of two ways:

1. **Directly in the Web Interface**:
   - Click the **"AWS GenAI Live"** pill in the top navigation bar.
   - Switch to the **"Live AWS Connection & Settings"** tab.
   - Enter your AWS Region, Access Key ID, and Secret Access Key, then click **"Save Settings"**.
   - Click **"Test AWS Connection"** to verify live connectivity with Amazon Bedrock!

2. **In the `.env` file**:
   - Edit `backend/.env` with your AWS credentials:
     ```env
     AWS_REGION=us-east-1
     AWS_ACCESS_KEY_ID=your_access_key_here
     AWS_SECRET_ACCESS_KEY=your_secret_key_here
     AWS_S3_BUCKET=resume-xpert-genai-storage
     BEDROCK_MODEL_ID=anthropic.claude-3-5-sonnet-20240620-v1:0
     ```

> **Note**: If AWS credentials are left blank or offline, the platform automatically engages its built-in intelligent GenAI engine so all features (resume parsing, coaching, job matching, bulk screening) remain 100% functional for offline presentations and local demonstrations.
