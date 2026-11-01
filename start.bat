@echo off
echo ======================================================================
echo   Resume Xpert - AWS Generative AI Full Stack Platform
echo ======================================================================
echo.
echo Starting FastAPI Python Backend (Port 8000)...
start "Resume Xpert Backend" cmd /k "python backend/run.py"
echo.
echo Starting Vite React Frontend (Port 3000)...
start "Resume Xpert Frontend" cmd /k "npm run dev"
echo.
echo Both servers are launching!
echo Backend:  http://127.0.0.1:8000
echo Swagger:  http://127.0.0.1:8000/docs
echo Frontend: http://localhost:3000
echo.
pause

