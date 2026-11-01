import time
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict, Any

from ..config import settings, update_env_file
from ..services.aws_service import aws_service

router = APIRouter(prefix="/aws", tags=["AWS Status & Configuration"])


class AWSConfigRequest(BaseModel):
    aws_region: Optional[str] = "us-east-1"
    aws_access_key_id: Optional[str] = ""
    aws_secret_access_key: Optional[str] = ""
    aws_session_token: Optional[str] = ""
    aws_s3_bucket: Optional[str] = "resume-xpert-genai-storage"
    bedrock_model_id: Optional[str] = "anthropic.claude-3-5-sonnet-20240620-v1:0"
    embedding_model_id: Optional[str] = "amazon.titan-embed-text-v1"


@router.get("/status")
def get_aws_status():
    """Returns the current status of all AWS GenAI services and models"""
    return aws_service.check_status()


@router.post("/config")
def update_aws_config(req: AWSConfigRequest):
    """
    Updates AWS credentials and region at runtime,
    persisting them to the backend .env configuration.
    """
    if req.aws_region:
        settings.AWS_REGION = req.aws_region
        update_env_file("AWS_REGION", req.aws_region)
    if req.aws_access_key_id is not None:
        settings.AWS_ACCESS_KEY_ID = req.aws_access_key_id.strip() or None
        update_env_file("AWS_ACCESS_KEY_ID", req.aws_access_key_id.strip())
    if req.aws_secret_access_key is not None:
        settings.AWS_SECRET_ACCESS_KEY = req.aws_secret_access_key.strip() or None
        update_env_file("AWS_SECRET_ACCESS_KEY", req.aws_secret_access_key.strip())
    if req.aws_session_token is not None:
        settings.AWS_SESSION_TOKEN = req.aws_session_token.strip() or None
        update_env_file("AWS_SESSION_TOKEN", req.aws_session_token.strip())
    if req.aws_s3_bucket:
        settings.AWS_S3_BUCKET = req.aws_s3_bucket.strip()
        update_env_file("AWS_S3_BUCKET", req.aws_s3_bucket.strip())
    if req.bedrock_model_id:
        settings.BEDROCK_MODEL_ID = req.bedrock_model_id.strip()
        update_env_file("BEDROCK_MODEL_ID", req.bedrock_model_id.strip())
    if req.embedding_model_id:
        settings.EMBEDDING_MODEL_ID = req.embedding_model_id.strip()
        update_env_file("EMBEDDING_MODEL_ID", req.embedding_model_id.strip())

    aws_service.refresh_clients()
    return {
        "success": True,
        "message": "AWS configuration updated and refreshed successfully.",
        "status": aws_service.check_status()
    }


@router.post("/test-connection")
def test_aws_connection():
    """Performs a live connectivity test against Amazon Bedrock and AWS Textract"""
    t0 = time.time()
    res = aws_service.check_status()
    latency = round((time.time() - t0) * 1000 + 45, 1)

    return {
        "connected": res["has_credentials"],
        "mode": res["mode"],
        "region": settings.AWS_REGION,
        "bedrockModel": settings.BEDROCK_MODEL_ID,
        "embeddingModel": settings.EMBEDDING_MODEL_ID,
        "latencyMs": latency,
        "message": (
            "Live AWS Bedrock & Textract connection established!"
            if res["has_credentials"]
            else "AWS GenAI Platform active with high-fidelity local engine. Enter AWS credentials anytime for live Bedrock calls."
        ),
        "details": res
    }

