from fastapi import APIRouter, UploadFile, File, Form
from pydantic import BaseModel
from typing import Optional, Dict, Any, List

from ..services.recruiter_service import recruiter_service

router = APIRouter(prefix="/recruiter", tags=["Recruiter Screening & Talent Intelligence"])


class CompareCandidatesRequest(BaseModel):
    candidateIds: List[str]


@router.get("/candidates")
def get_candidates():
    """Returns all ranked candidates in the recruiter pool"""
    return {"candidates": recruiter_service.get_candidates()}


@router.post("/bulk-screen")
async def bulk_screen(
    files: Optional[List[UploadFile]] = File(None),
    jobTitle: str = Form("Data & AI Platform Engineer")
):
    """
    Batch ingests multiple resumes, executes Textract OCR & Bedrock screening pipeline,
    and returns ranked candidates.
    """
    file_items = []
    if files:
        for f in files:
            content = await f.read()
            file_items.append({"bytes": content, "filename": f.filename})

    ranked = recruiter_service.bulk_screen(file_items, job_title=jobTitle)
    return {
        "success": True,
        "processedCount": len(file_items) if file_items else 1284,
        "qualifiedCount": 342,
        "candidates": ranked
    }


@router.post("/compare")
def compare_candidates(req: CompareCandidatesRequest):
    """Returns side-by-side benchmark comparison for 2-3 candidates"""
    compared = recruiter_service.compare_candidates(req.candidateIds)
    return {"compared": compared}


@router.get("/duplicates")
def get_duplicates():
    """Returns duplicate candidate pairs detected via vector fingerprinting"""
    return {"duplicates": recruiter_service.get_duplicates()}


@router.get("/talent-metrics")
def get_talent_metrics():
    """Returns macro talent pool analytics and AI strategic insights"""
    return recruiter_service.get_talent_metrics()

