from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url : str
    secret_key : str
    algorithm : str
    access_token_expire_minutes : int = 30
    cors_origins : str = (
        "http://localhost:5173,"
        "http://127.0.0.1:5173,"
        "http://localhost:5174,"
        "http://127.0.0.1:5174"
    )

    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
