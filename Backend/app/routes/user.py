# User-related routes (signup, login, get_user)
from fastapi import APIRouter, HTTPException, Header
from models import SignupRequest, LoginRequest
from firebase import get_firebase_ref, get_user_by_email, get_user_by_username
from auth import hash_password, verify_password, create_jwt_token, verify_jwt_token

router = APIRouter()

@router.post("/signup")
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

@router.post("/login")
async def login(credentials: LoginRequest):
    user = get_user_by_email(credentials.email)
    if not user or not verify_password(credentials.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Generate and return JWT token
    token = create_jwt_token(credentials.email)
    return {"token": token}

@router.get("/get_user")
async def get_user(authorization: str = Header(...)):
    email = verify_jwt_token(authorization)
    user = get_user_by_email(email)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Exclude hashed_password from the response
    user.pop("hashed_password", None)
    return user
