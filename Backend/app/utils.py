from dotenv import load_dotenv
import os

# Load .env file
load_dotenv(r'C:\Users\martv\Documents\GitHub\GameHub3.0\Backend\app\.env')

# get environment variable
def get_env_variable(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise ValueError(f"Environment variable {name} not set")
    return value