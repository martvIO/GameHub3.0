from datetime import datetime, timedelta, timezone
import logging
from fastapi import FastAPI, HTTPException, Header
import firebase_admin
from pydantic import BaseModel, EmailStr
from firebase_admin import credentials, initialize_app, db
from jose import jwt
from passlib.context import CryptContext
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

# Initialize Firebase Admin SDK
def initialize_firebase():
    if not firebase_admin._apps:
        cred = credentials.Certificate("firebase_admin.json")
        initialize_app(cred, {
            "databaseURL": "https://database-b81ee-default-rtdb.firebaseio.com"
        })

initialize_firebase()

# Utility function for Firebase references
def get_firebase_ref(path: str):
    return db.reference(path)

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# FastAPI app
app = FastAPI(debug=True)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# JWT and password hashing configuration
JWT_SECRET = "your_jwt_secret_key"
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_MINUTES = 60
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Pydantic models
class SignupRequest(BaseModel):
    username: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# Helper Functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_jwt_token(email: str) -> str:
    expiration = datetime.now(timezone.utc) + timedelta(minutes=JWT_EXPIRATION_MINUTES)
    payload = {"sub": email, "exp": expiration}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def verify_jwt_token(token: str) -> str:
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Token is invalid")

# Firebase Data Operations
def get_user_by_email(email: str) -> Optional[dict]:
    users_ref = get_firebase_ref("users")
    users = users_ref.get() or {}
    for user_id, user_data in users.items():
        if user_data.get("email") == email:
            return {**user_data, "id": user_id}
    return None

def get_user_by_username(username: str) -> Optional[dict]:
    return get_firebase_ref(f"users/{username}").get()

# Endpoints
@app.post("/signup")
async def signup(user: SignupRequest):
    users_ref = get_firebase_ref("users")

    # Check if username or email already exists
    if get_user_by_username(user.username):
        raise HTTPException(status_code=400, detail="Username already registered")
    if get_user_by_email(user.email):
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password and save user data
    hashed_password = hash_password(user.password)
    user_data = {
        "username": user.username,
        "email": user.email,
        "hashed_password": hashed_password
    }
    users_ref.child(user.username).set(user_data)

    return {"message": "User created successfully!"}

@app.post("/login")
async def login(credentials: LoginRequest):
    user = get_user_by_email(credentials.email)
    if not user or not verify_password(credentials.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Generate and return JWT token
    token = create_jwt_token(credentials.email)
    return {"token": token}

@app.get("/get_user")
async def get_user(authorization: str):
    token = authorization
    print(token)
    email = verify_jwt_token(token)
    print(email)
    user = get_user_by_email(email)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Exclude hashed_password from the response
    user.pop("hashed_password", None)
    return user
