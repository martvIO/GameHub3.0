import pytest
from fastapi.testclient import TestClient
from firebase_admin import db
from api.main import app

client = TestClient(app)

# Mock Firebase Database
class MockDatabaseReference:
    def __init__(self):
        self.data = {}

    def get(self):
        return self.data

    def push(self, user_data):
        user_id = f"user_{len(self.data) + 1}"
        self.data[user_id] = user_data
        return MockUserReference(user_id)

class MockUserReference:
    def __init__(self, user_id):
        self.key = user_id

@pytest.fixture(autouse=True)
def mock_firebase(monkeypatch):
    mock_ref = MockDatabaseReference()

    def mock_reference(path):
        return mock_ref

    monkeypatch.setattr(db, "reference", mock_reference)

def test_signup_user():
    """Test user signup."""
    payload = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "securepassword123"
    }

    response = client.post("/signup", json=payload)
    assert response.status_code == 200
    assert response.json()["message"] == "User registered successfully"

    # Verify user is stored in the mock database
    users = db.reference("/users").get()
    assert len(users) == 1
    assert "testuser@example.com" in [user["email"] for user in users.values()]

def test_signup_duplicate_email():
    """Test signup with a duplicate email."""
    payload = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "securepassword123"
    }

    # First signup
    client.post("/signup", json=payload)

    # Duplicate signup
    response = client.post("/signup", json=payload)
    assert response.status_code == 400
    assert response.json()["detail"] == "Email already exists"

def test_login_user():
    """Test user login."""
    # Sign up a test user
    signup_payload = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "securepassword123"
    }
    client.post("/signup", json=signup_payload)

    # Login the user
    login_payload = {
        "email": "testuser@example.com",
        "password": "securepassword123"
    }
    response = client.post("/login", json=login_payload)
    assert response.status_code == 200
    assert "token" in response.json()

def test_login_invalid_credentials():
    """Test login with invalid credentials."""
    login_payload = {
        "email": "nonexistent@example.com",
        "password": "wrongpassword"
    }
    response = client.post("/login", json=login_payload)
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password"

def test_get_user():
    """Test retrieving user information."""
    # Sign up and login a user
    signup_payload = {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "securepassword123"
    }
    client.post("/signup", json=signup_payload)

    login_payload = {
        "email": "testuser@example.com",
        "password": "securepassword123"
    }
    login_response = client.post("/login", json=login_payload)
    token = login_response.json()["token"]

    # Get user info
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/get_user", headers=headers)
    assert response.status_code == 200
    assert response.json()["email"] == "testuser@example.com"

def test_get_user_invalid_token():
    """Test retrieving user information with an invalid token."""
    headers = {"Authorization": "Bearer invalid_token"}
    response = client.get("/get_user", headers=headers)
    assert response.status_code == 401
    assert response.json()["detail"] == "Token is invalid"

