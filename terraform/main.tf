terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.40"
    }
  }
}

variable "aws_region" {
  type        = string
  default     = "us-east-1"
  description = "Target AWS deployment region for Bedrock & Textract"
}

variable "environment" {
  type        = string
  default     = "production"
  description = "Environment identifier"
}

provider "aws" {
  region = var.aws_region
}

# KMS Key for Document Encryption
resource "aws_kms_key" "resume_storage_key" {
  description             = "KMS Customer Key for Resume Xpert Documents"
  deletion_window_in_days = 30
  enable_key_rotation     = true

  tags = {
    Project     = "ResumeXpert"
    Environment = var.environment
  }
}

# S3 Bucket with SSE-KMS
resource "aws_s3_bucket" "resume_bucket" {
  bucket_prefix = "resume-xpert-genai-"
  force_destroy = false

  tags = {
    Project     = "ResumeXpert"
    Environment = var.environment
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_encryption" {
  bucket = aws_s3_bucket.resume_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.resume_storage_key.arn
      sse_algorithm     = "aws:kms"
    }
    bucket_key_enabled = true
  }
}

resource "aws_s3_bucket_public_access_block" "public_block" {
  bucket = aws_s3_bucket.resume_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# IAM Role for Bedrock, Textract, and S3
resource "aws_iam_role" "backend_role" {
  name = "ResumeXpert-Backend-Role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = ["lambda.amazonaws.com", "ecs-tasks.amazonaws.com"]
        }
      }
    ]
  })
}

resource "aws_iam_policy" "genai_policy" {
  name        = "ResumeXpert-BedrockTextract-Policy"
  description = "Permissions for Bedrock foundation models, Textract OCR, and encrypted S3 access"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid      = "BedrockAccess"
        Effect   = "Allow"
        Action   = [
          "bedrock:InvokeModel",
          "bedrock:InvokeModelWithResponseStream",
          "bedrock:ListFoundationModels"
        ]
        Resource = "*"
      },
      {
        Sid      = "TextractAccess"
        Effect   = "Allow"
        Action   = [
          "textract:DetectDocumentText",
          "textract:AnalyzeDocument"
        ]
        Resource = "*"
      },
      {
        Sid      = "S3Access"
        Effect   = "Allow"
        Action   = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.resume_bucket.arn,
          "${aws_s3_bucket.resume_bucket.arn}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "attach_genai" {
  role       = aws_iam_role.backend_role.name
  policy_arn = aws_iam_policy.genai_policy.arn
}

output "s3_bucket_name" {
  value       = aws_s3_bucket.resume_bucket.id
  description = "Name of the provisioned encrypted S3 bucket"
}

output "iam_role_arn" {
  value       = aws_iam_role.backend_role.arn
  description = "ARN of the IAM role for Bedrock & Textract execution"
}

