@echo off
REM Open a new terminal for the backend server
start powershell -NoExit -Command "cd backend\app; .\..\..\.venv\Scripts\Activate.ps1; uvicorn main:app --reload"

REM Open a new terminal for the frontend server
start powershell -NoExit -Command "cd GameHub; npm run dev"
