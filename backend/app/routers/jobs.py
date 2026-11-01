from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict, Any, List

from ..services.job_service import job_service

router = APIRouter(prefix="/jobs", tags=["Jobs & Semantic Matching"])


class MatchJobsRequest(BaseModel):
    profile: Optional[Dict[str, Any]] = None


class MatchCustomJdRequest(BaseModel):
    jdText: str
    profile: Optional[Dict[str, Any]] = None


class GenerateJobRequest(BaseModel):
    roleTitle: Optional[str] = "Senior Data & Intelligence Engineer"


@router.post("/match")
def match_jobs(req: MatchJobsRequest):
    """
    Computes vector cosine similarity and match metrics for jobs catalog.
    """
    matches = job_service.match_jobs(profile=req.profile)
    return {"matches": matches}


@router.post("/match-custom")
def match_custom_jd(req: MatchCustomJdRequest):
    """
    Evaluates custom pasted job description against candidate vector embeddings.
    """
    result = job_service.match_custom_jd(jd_text=req.jdText, profile=req.profile)
    return result


@router.post("/generate")
def generate_job_description(req: GenerateJobRequest):
    """
    Generates structured AI job requisition with required/preferred skills and responsibilities.
    """
    job_desc = job_service.generate_job_description(role_title=req.roleTitle or "Senior Data & Intelligence Engineer")
    return job_desc

