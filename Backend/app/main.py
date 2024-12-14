# Entry point for the FastAPI app
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import user  # Import routes

# FastAPI app instance
app = FastAPI(debug=True)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include user routes
app.include_router(user.router)

