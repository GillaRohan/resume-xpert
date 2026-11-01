import uvicorn
import os
import sys

# Ensure backend root is on Python sys.path
backend_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, backend_dir)

if __name__ == "__main__":
    print("=" * 70)
    print(" [LAUNCH] Resume Xpert -- AWS Generative AI Backend Server")
    print(" [HOST]   Listening on: http://localhost:8000 & http://127.0.0.1:8000")
    print(" [DOCS]   Interactive Swagger API Docs: http://localhost:8000/docs")
    print("=" * 70)
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
