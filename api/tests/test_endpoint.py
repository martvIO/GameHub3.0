import pytest
from fastapi.testclient import TestClient
from api.main import app, hash_password, get_firebase_ref

client = TestClient(app)

# Test signup endpoint
def test_signup_user():
    payload = {
        "username": "testuser",
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "password": "securepassword"
    }

    response = client.post("/signup", json=payload)
    assert response.status_code == 200
    assert response.json() == {"message": "User created successfully!"}

    # Verify user is added to Firebase
    users_ref = get_firebase_ref("users")
    user_data = users_ref.child("testuser").get()
    assert user_data["email"] == "john.doe@example.com"
    assert "hashed_password" in user_data

def test_signup_existing_username():
    # Ensure the user exists in Firebase
    users_ref = get_firebase_ref("users")
    users_ref.child("existinguser").set({
        "first_name": "Existing",
        "last_name": "User",
        "email": "existing.user@example.com",
        "hashed_password": hash_password("password")
    })

    payload = {
        "username": "existinguser",
        "first_name": "John",
        "last_name": "Doe",
        "email": "new.email@example.com",
        "password": "securepassword"
    }

    response = client.post("/signup", json=payload)
    assert response.status_code == 400
    assert response.json()["detail"] == "Username already registered"

def test_signup_existing_email():
    # Ensure the user exists in Firebase
    users_ref = get_firebase_ref("users")
    users_ref.child("newuser").set({
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "hashed_password": hash_password("password")
    })

    payload = {
        "username": "anotheruser",
        "first_name": "Jane",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "password": "securepassword"
    }

    response = client.post("/signup", json=payload)
    assert response.status_code == 400
    assert response.json()["detail"] == "Email already registered"

# Test login endpoint
def test_login_user():
    # Ensure the user exists in Firebase
    users_ref = get_firebase_ref("users")
    users_ref.child("testuser").set({
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "hashed_password": hash_password("securepassword")
    })

    payload = {
        "email": "john.doe@example.com",
        "password": "securepassword"
    }

    response = client.post("/login", json=payload)
    assert response.status_code == 200
    assert "token" in response.json()

def test_login_invalid_credentials():
    payload = {
        "email": "invalid.user@example.com",
        "password": "wrongpassword"
    }

    response = client.post("/login", json=payload)
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password"

def test_get_user():
    # Ensure the user exists in Firebase
    users_ref = get_firebase_ref("users")
    users_ref.child("testuser").set({
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "hashed_password": hash_password("securepassword")
    })

    # Generate a token by logging in
    login_response = client.post("/login", json={
        "email": "john.doe@example.com",
        "password": "securepassword"
    })
    assert login_response.status_code == 200, f"Error: {login_response.json()}"
    token = login_response.json().get("token")
    print(token,response)
    assert token, "Login did not return a token"

    # Fetch user info
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/get_user", headers=headers)
    assert response.status_code == 200, f"Error: {response.json()}"
    assert response.json().get('email') == "john.doe@example.com"
    assert "hashed_password" not in response.json()

def test_get_user_invalid_token():
    headers = {"Authorization": "Bearer invalid_token"}
    response = client.get("/get_user", headers=headers)
    assert response.status_code == 401
    assert response.json()["detail"] == "Token is invalid"
