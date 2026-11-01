import time
import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .config import settings
from .routers import aws_status, resumes, coach, jobs, recruiter, bedrock_lab

logger = logging.getLogger("resume_xpert")
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")

app = FastAPI(
    title="Resume Xpert -- AWS Generative AI Backend",
    description="Enterprise Cloud & Generative AI pipeline powering Candidate Career Intelligence and Recruiter Talent Screening with Amazon Bedrock, AWS Textract, and Amazon S3.",
    version="1.0.0",
)

# Enable CORS for Vite frontend and local dev environments
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request performance timing middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = (time.time() - start_time) * 1000
    response.headers["X-Process-Time-Ms"] = str(round(process_time, 2))
    response.headers["X-AWS-Region"] = settings.AWS_REGION
    return response

# Mount API Routers under /api
app.include_router(aws_status.router, prefix="/api")
app.include_router(resumes.router, prefix="/api")
app.include_router(coach.router, prefix="/api")
app.include_router(jobs.router, prefix="/api")
app.include_router(recruiter.router, prefix="/api")
app.include_router(bedrock_lab.router, prefix="/api")


@app.get("/")
def root():
    return {
        "name": "Resume Xpert AWS GenAI Platform",
        "status": "online",
        "version": "1.0.0",
        "awsRegion": settings.AWS_REGION,
        "bedrockModel": settings.BEDROCK_MODEL_ID,
        "hasCredentials": settings.has_aws_credentials,
        "docsUrl": "/docs"
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "timestamp": time.time(),
        "awsConnected": settings.has_aws_credentials,
        "region": settings.AWS_REGION,
        "mode": "live_aws" if settings.has_aws_credentials else "intelligent_engine"
    }
