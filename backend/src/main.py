from fastapi import FastAPI
from .routers import task, user
from .database import Base, engine
from .models import Task

app = FastAPI()
Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"status": "Backend is running"}

app.include_router(task.router)
app.include_router(user.router)