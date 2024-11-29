import pytest
import requests

BASE_URL = "http://127.0.0.1:8000"  # Update with your FastAPI server URL if different

@pytest.fixture
def test_user():
    """Fixture to provide test user data."""
    return {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "password123"
    }

def test_signup(test_user):
    """Test the signup endpoint."""
    response = requests.post(f"{BASE_URL}/signup", json=test_user)
    assert response.status_code in [200, 400]  # 200 if success, 400 if email already exists
    data = response.json()
    if response.status_code == 200:
        assert "user_id" in data
    elif response.status_code == 400:
        assert data["detail"] == "Email already exists"

def test_login(test_user):
    """Test the login endpoint."""
    response = requests.post(f"{BASE_URL}/login", json={
        "email": test_user["email"],
        "password": test_user["password"]
    })
    assert response.status_code in [200, 401]  # 200 if success, 401 if invalid credentials
    data = response.json()
    if response.status_code == 200:
        assert "token" in data
        return data["token"]
    elif response.status_code == 401:
        assert data["detail"] == "Invalid email or password"

def test_get_user(test_user):
    """Test the get_user endpoint."""
    # First login to get a token
    login_response = requests.post(f"{BASE_URL}/login", json={
        "email": test_user["email"],
        "password": test_user["password"]
    })
    assert login_response.status_code == 200
    token = login_response.json()["token"]

    # Test get_user with the token
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/get_user", headers=headers)
    assert response.status_code == 200  # 200 if success
    data = response.json()
    assert data["email"] == test_user["email"]
    assert "password" not in data
