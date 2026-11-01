@echo off
title Resume Xpert -- AWS Generative AI Platform
color 0b

echo =========================================================================
echo    RESUME XPERT -- AWS GENERATIVE AI CAREER PLATFORM
echo =========================================================================
echo.
echo  [1/2] Launching Python FastAPI Backend Server (Port 8000)...
start "Resume Xpert - Backend API (Port 8000)" cmd /k "python backend/run.py"

echo  [2/2] Launching Vite React Frontend Web Application (Port 3000)...
start "Resume Xpert - Frontend UI (Port 3000)" cmd /k "npm run dev"

echo.
echo =========================================================================
echo  SERVERS ARE RUNNING PERSISTENTLY IN SEPARATE WINDOWS:
echo    - Frontend Web App:       http://localhost:3000
echo    - Backend API & Swagger:  http://localhost:8000/docs
echo    - Live Production Vercel: https://resume-xpert-nine.vercel.app
echo =========================================================================
echo.
echo Press any key to open the web app in your browser...
pause >nul
start http://localhost:3000
