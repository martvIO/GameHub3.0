from datetime import datetime, timedelta
import logging
from fastapi import FastAPI, HTTPException, Depends, Header
from pydantic import BaseModel, EmailStr
from firebase_admin import credentials, auth, db, initialize_app
from jose import JWTError, jwt

# Initialize Firebase Admin SDK with Realtime Database URL
cred = credentials.Certificate(r"C:\Users\martv\test\GameHub3.0\api\firebase_admin.json")
firebase_app = initialize_app(cred, {
    "databaseURL": "https://database-b81ee-default-rtdb.firebaseio.com"  # Replace with your Realtime Database URL
})


# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# FastAPI app
app = FastAPI()

# JWT secret and settings
JWT_SECRET = "ydawdawdawdawwaq"
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_MINUTES = 60

# Pydantic models
class SignupRequest(BaseModel):
    username: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# Helper functions
def create_jwt_token(email: str):
    """Generate a JWT token for a user."""
    expiration = datetime.utcnow() + timedelta(minutes=JWT_EXPIRATION_MINUTES)
    payload = {"sub": email, "exp": expiration}
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    logger.info(f"JWT token created for {email}")
    return token

def verify_jwt_token(token: str):
    """Verify a JWT token."""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        logger.info(f"Token verified for {payload['sub']}")
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        logger.warning("Token expired")
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        logger.error("Invalid token")
        raise HTTPException(status_code=401, detail="Invalid token")

# Endpoints
@app.post("/signup")
async def signup(user: SignupRequest):
    """
    Signup a new user.
    """
    ref = db.reference("/users")
    users = ref.get() or {}

    # Check if email already exists
    if any(u.get("email") == user.email for u in users.values()):
        logger.warning(f"Signup failed: Email {user.email} already exists")
        raise HTTPException(status_code=400, detail="Email already exists")

    # Save user in Firebase (excluding the password)
    user_data = {"username": user.username, "email": user.email, "password": user.password}
    new_user_ref = ref.push(user_data)

    logger.info(f"New user created with ID {new_user_ref.key}")
    return {"message": "User registered successfully", "user_id": new_user_ref.key}

@app.post("/login")
async def login(credentials: LoginRequest):
    """
    Login a user.
    """
    ref = db.reference("/users")
    users = ref.get() or {}

    # Validate email and password
    user = next((u for u in users.values() if u["email"] == credentials.email), None)
    if not user or user["password"] != credentials.password:
        logger.warning(f"Login failed for email {credentials.email}")
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Generate JWT token
    token = create_jwt_token(credentials.email)
    logger.info(f"User {credentials.email} logged in successfully")
    return {"message": "Login successful", "token": token}

@app.get("/get_user")
async def get_user(authorization: str = Header(...)):
    """
    Get user information (excluding the password).
    """
    email = verify_jwt_token(authorization.split(" ")[1])
    
    ref = db.reference("/users")
    users = ref.get() or {}

    user = next((u for u in users.values() if u["email"] == email), None)
    if not user:
        logger.error(f"User not found for email {email}")
        raise HTTPException(status_code=404, detail="User not found")

    # Remove password from user data
    user.pop("password", None)
    logger.info(f"User information retrieved for {email}")
    return user
