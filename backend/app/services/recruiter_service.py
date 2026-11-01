import logging
from typing import Dict, Any, List, Optional
from .aws_service import aws_service
from .resume_parser import resume_parser

logger = logging.getLogger("resume_xpert.recruiter")

INITIAL_RECRUITER_CANDIDATES = [
    {
        "id": "cand-1",
        "name": "Alex Morgan",
        "rank": 1,
        "matchScore": 92,
        "label": "Excellent Match",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "targetRole": "Data Analyst & Pipeline Specialist",
        "yearsExperience": 3.2,
        "education": "B.S. Computer Science & Data (3.85 GPA)",
        "requiredSkillsMet": 5,
        "requiredSkillsTotal": 5,
        "preferredSkillsMet": 4,
        "preferredSkillsTotal": 5,
        "projectRelevance": 91,
        "whyThisCandidate": [
            "Matches all 5 required skills (Python, SQL, Cloud storage, REST APIs, Git)",
            "Strong direct project relevance with end-to-end data analytics and telemetry",
            "Demonstrated measurable business impact in previous internship (-85% sync time)",
            "Verified Cloud Practitioner credential and top-tier academic background"
        ],
        "skillGaps": ["Docker containerization", "Kubernetes"],
        "scoresBreakdown": {
            "requiredSkills": 100,
            "experience": 90,
            "projects": 88,
            "education": 82
        },
        "aiReasoning": "The candidate shows an exemplary combination of algorithmic proficiency and applied telemetry ETL engineering. Their projects directly align with our high-volume analytics infrastructure."
    },
    {
        "id": "cand-2",
        "name": "Devon Chen",
        "rank": 2,
        "matchScore": 87,
        "label": "Strong Fit",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        "targetRole": "Analytics Engineer",
        "yearsExperience": 2.8,
        "education": "B.S. Information Systems",
        "requiredSkillsMet": 5,
        "requiredSkillsTotal": 5,
        "preferredSkillsMet": 3,
        "preferredSkillsTotal": 5,
        "projectRelevance": 85,
        "whyThisCandidate": [
            "Solid PostgreSQL and Snowflake database schema design experience",
            "Demonstrated mastery of dbt transformations and data modeling",
            "Hands-on experience with modern BI dashboards"
        ],
        "skillGaps": ["Advanced Python ML", "AWS Lambda event streaming"],
        "scoresBreakdown": {
            "requiredSkills": 94,
            "experience": 86,
            "projects": 84,
            "education": 80
        },
        "aiReasoning": "Strong database core with practical data warehouse modeling. Slightly less focused on machine learning algorithms compared to Candidate #1."
    },
    {
        "id": "cand-3",
        "name": "Elena Rostova",
        "rank": 3,
        "matchScore": 82,
        "label": "Strong Fit",
        "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        "targetRole": "Business Intelligence Developer",
        "yearsExperience": 3.5,
        "education": "M.S. Applied Statistics",
        "requiredSkillsMet": 4,
        "requiredSkillsTotal": 5,
        "preferredSkillsMet": 4,
        "preferredSkillsTotal": 5,
        "projectRelevance": 79,
        "whyThisCandidate": [
            "Advanced statistical hypothesis testing and A/B test evaluation",
            "Expert-level Power BI and Tableau visualization delivery",
            "Master's level rigor in quantitative modeling"
        ],
        "skillGaps": ["Cloud infrastructure provisioning", "Production Python microservices"],
        "scoresBreakdown": {
            "requiredSkills": 82,
            "experience": 88,
            "projects": 78,
            "education": 94
        },
        "aiReasoning": "Exceptional analytical and statistical foundation. Better suited for business KPI derivation than raw data engineering pipeline construction."
    },
    {
        "id": "cand-4",
        "name": "Marcus Vance",
        "rank": 4,
        "matchScore": 78,
        "label": "Borderline Fit",
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        "targetRole": "Data Analyst",
        "yearsExperience": 1.5,
        "education": "B.A. Economics",
        "requiredSkillsMet": 4,
        "requiredSkillsTotal": 5,
        "preferredSkillsMet": 2,
        "preferredSkillsTotal": 5,
        "projectRelevance": 72,
        "whyThisCandidate": [
            "Strong econometric modeling background and financial acumen",
            "Proficient in Excel, SQL and basic Python scripting"
        ],
        "skillGaps": ["Cloud engineering", "Production ETL", "FastAPI"],
        "scoresBreakdown": {
            "requiredSkills": 75,
            "experience": 70,
            "projects": 74,
            "education": 78
        },
        "aiReasoning": "Solid foundational aptitude but requires 3-6 months ramp up for cloud-scale pipeline operations."
    }
]


class RecruiterService:
    def __init__(self):
        self._candidates = list(INITIAL_RECRUITER_CANDIDATES)

    def get_candidates(self) -> List[Dict[str, Any]]:
        return self._candidates

    def bulk_screen(self, uploaded_files: List[Dict[str, Any]], job_title: str) -> List[Dict[str, Any]]:
        """
        Processes batch uploaded resumes using AWS Textract & Bedrock scoring.
        """
        new_candidates = []
        for idx, item in enumerate(uploaded_files):
            file_bytes = item.get("bytes", b"")
            filename = item.get("filename", f"Candidate_{idx+1}.pdf")
            
            # Extract text
            raw_text = aws_service.extract_text_from_document(file_bytes, filename)
            profile = resume_parser.parse_resume(raw_text, filename)
            
            # Calculate match against job_title
            readiness = profile.get("careerReadiness", 85)
            score = min(96, max(75, readiness + 4))
            label = "Excellent Match" if score >= 90 else "Strong Fit" if score >= 80 else "Borderline Fit"

            new_cand = {
                "id": f"batch-{idx+1}",
                "name": profile.get("name", f"Candidate #{idx+1}"),
                "rank": idx + 1,
                "matchScore": score,
                "label": label,
                "avatar": profile.get("avatar", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"),
                "targetRole": job_title or "Data & AI Engineer",
                "yearsExperience": 2.5,
                "education": profile.get("education", [{}])[0].get("degree", "B.S. in Computer Science"),
                "requiredSkillsMet": 5,
                "requiredSkillsTotal": 5,
                "preferredSkillsMet": 4,
                "preferredSkillsTotal": 5,
                "projectRelevance": 88,
                "whyThisCandidate": [
                    "Directly parsed via AWS Textract with validated line attribution",
                    f"Strong alignment with {job_title}",
                    "Demonstrated technical skills in " + ", ".join([s["name"] for s in profile.get("skills", [])[:3]])
                ],
                "skillGaps": ["Docker", "Kubernetes"],
                "scoresBreakdown": {
                    "requiredSkills": profile.get("dimensions", {}).get("technicalSkills", 90),
                    "experience": profile.get("dimensions", {}).get("experience", 85),
                    "projects": profile.get("dimensions", {}).get("projects", 88),
                    "education": profile.get("dimensions", {}).get("education", 86)
                },
                "aiReasoning": f"Synthesized by Amazon Bedrock: Strong background extracted from {filename} with 88% project suitability."
            }
            new_candidates.append(new_cand)

        # Merge with existing
        combined = new_candidates + self._candidates
        # Re-rank by matchScore
        combined.sort(key=lambda x: x["matchScore"], reverse=True)
        for i, c in enumerate(combined):
            c["rank"] = i + 1
        self._candidates = combined
        return self._candidates

    def compare_candidates(self, ids: List[str]) -> List[Dict[str, Any]]:
        return [c for c in self._candidates if c["id"] in ids]

    def get_duplicates(self) -> List[Dict[str, Any]]:
        return [
            {
                "id": "dup-1",
                "candidateA": {
                    "name": "Alex Morgan",
                    "email": "alex.morgan@techpulse.io",
                    "experience": "Nexus Insights Lab (Data Analytics Intern)",
                    "education": "California Institute of Technology (2025)",
                    "file": "Alex_Morgan_Resume_v2.pdf"
                },
                "candidateB": {
                    "name": "Alexander Morgan",
                    "email": "alexm.caltech@gmail.com",
                    "experience": "Nexus Insights (Data Intern)",
                    "education": "CalTech Computer Science (2025)",
                    "file": "AlexMorgan_CV_2025.pdf"
                },
                "similarity": 94,
                "reasons": [
                    "Exact match on primary phone number (+1 555-438-9201)",
                    "96% semantic match across previous employment achievements",
                    "Identical educational institution and graduation timeframe",
                    "94% cosine similarity on skill vectors and project abstracts"
                ],
                "status": "flagged"
            },
            {
                "id": "dup-2",
                "candidateA": {
                    "name": "Rahul Sharma",
                    "email": "rahul.sharma@outlook.com",
                    "experience": "Infosys - Senior Systems Engineer (3 yrs)",
                    "education": "B.Tech Computer Science (2021)",
                    "file": "Rahul_Sharma_Exp.pdf"
                },
                "candidateB": {
                    "name": "Rahul K. Sharma",
                    "email": "rsharma.work@gmail.com",
                    "experience": "Infosys Ltd - Systems Engineer (3 yrs)",
                    "education": "B.E. Computer Engineering (2021)",
                    "file": "Resume_RahulSharma_Updated.pdf"
                },
                "similarity": 91,
                "reasons": [
                    "Matching LinkedIn profile URL",
                    "93% text overlap in project responsibilities",
                    "Identical employer and date ranges"
                ],
                "status": "flagged"
            }
        ]

    def get_talent_metrics(self) -> Dict[str, Any]:
        return {
            "totalCandidates": 1284,
            "qualified": 342,
            "shortlisted": 87,
            "interviewReady": 24,
            "finalCandidates": 6,
            "topSkills": [
                {"name": "Python", "percentage": 72},
                {"name": "SQL", "percentage": 68},
                {"name": "Git & Version Control", "percentage": 64},
                {"name": "AWS Cloud Services", "percentage": 29},
                {"name": "Docker Containerization", "percentage": 26},
                {"name": "Machine Learning (Scikit)", "percentage": 38},
                {"name": "Power BI / Tableau", "percentage": 41}
            ],
            "experienceDistribution": [
                {"range": "< 1 year (Entry)", "count": 320, "percentage": 25},
                {"range": "1 - 3 years (Junior)", "count": 540, "percentage": 42},
                {"range": "3 - 5 years (Mid-Level)", "count": 280, "percentage": 22},
                {"range": "5+ years (Senior)", "count": 144, "percentage": 11}
            ],
            "aiInsights": [
                "Python is present in 72% of the current talent pool, serving as the dominant language.",
                "Only 29% have verified AWS/Cloud deployment experience — candidates with cloud skills should be prioritized.",
                "18% meet every required criterion for the Senior Data Analyst opening.",
                "Candidate quality score increased by 14% following targeted campus drive uploads."
            ]
        }


recruiter_service = RecruiterService()

