import os
import sys

# Ensure backend root is on Python sys.path for Vercel Serverless environment
curr_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.dirname(curr_dir)
backend_dir = os.path.join(root_dir, "backend")

if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from app.main import app

# Vercel ASGI entry point
# Exposed directly for Vercel Python runtime
