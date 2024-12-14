from dotenv import load_dotenv
import os

# Load .env file
load_dotenv(r'C:\Users\martv\test\GameHub3.0\Backend\.env')

# get environment variable
def get_env_variable(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise ValueError(f"Environment variable {name} not set")
    return value