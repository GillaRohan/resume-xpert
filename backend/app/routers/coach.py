from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict, Any, List

from ..services.coach_service import coach_service

router = APIRouter(prefix="/coach", tags=["AI Career Coach & Interview Assistant"])


class ChatRequest(BaseModel):
    message: str
    language: Optional[str] = "English"
    profile: Optional[Dict[str, Any]] = None
    history: Optional[List[Dict[str, str]]] = None


class EvaluateAnswerRequest(BaseModel):
    category: str
    question: str
    answer: str
    profile: Optional[Dict[str, Any]] = None


class RoadmapRequest(BaseModel):
    role: Optional[str] = "Data Analyst & AI Specialist"
    profile: Optional[Dict[str, Any]] = None


@router.post("/chat")
def chat_with_coach(req: ChatRequest):
    """
    Context-aware career coaching conversation powered by Amazon Bedrock with multilingual dialect support.
    """
    reply = coach_service.chat(
        message=req.message,
        language=req.language or "English",
        profile=req.profile,
        history=req.history
    )
    return {"reply": reply, "language": req.language}


@router.get("/interview-questions")
def get_interview_questions(category: str = "technical"):
    """
    Returns role-tailored technical, HR, behavioral, or project interview questions.
    """
    questions = coach_service.get_interview_questions(category=category)
    return {"category": category, "questions": questions}


@router.post("/evaluate-answer")
def evaluate_interview_answer(req: EvaluateAnswerRequest):
    """
    Evaluates candidate's spoken or typed answer across 4 key dimensions:
    Communication, Technical Accuracy, Relevance, and Confidence.
    """
    eval_result = coach_service.evaluate_interview_answer(
        category=req.category,
        question=req.question,
        answer=req.answer,
        profile=req.profile
    )
    return eval_result


@router.post("/roadmap")
def generate_roadmap(req: RoadmapRequest):
    """
    Generates 30/60/90-day/6-month career roadmap to close candidate skill gaps.
    """
    roadmap = coach_service.generate_roadmap(role=req.role or "Data Analyst", profile=req.profile)
    return {"role": req.role, "milestones": roadmap}

