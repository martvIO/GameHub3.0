# Firebase initialization and operations
import firebase_admin
from firebase_admin import credentials, initialize_app, db
from typing import Optional
from app.utils import get_env_variable

firebase_database_url = get_env_variable("FIREBASE_DATABASE_URL")
firebase_admin_cert = get_env_variable("FIREBASE_CREDENTIALS")

def initialize_firebase():
    if not firebase_admin._apps:
        cred = credentials.Certificate(firebase_admin_cert)
        initialize_app(cred, {
            "databaseURL": firebase_database_url
        })

initialize_firebase()

def get_firebase_ref(path: str):
    return db.reference(path)

def get_user_by_email(email: str) -> Optional[dict]:
    users_ref = get_firebase_ref("users")
    users = users_ref.get() or {}
    for user_id, user_data in users.items():
        if user_data.get("email") == email:
            return {**user_data, "id": user_id}
    return None

def get_user_by_username(username: str) -> Optional[dict]:
    return get_firebase_ref(f"users/{username}").get()
