from fastapi import FastAPI
from .routers import task, user
from fastapi.middleware.cors import CORSMiddleware
from .security.config import settings

app = FastAPI()

origins = [
    origin.strip()
    for origin in settings.cors_origins.split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def root():
    return {"status": "Backend is running"}

app.include_router(task.router)
app.include_router(user.router)
