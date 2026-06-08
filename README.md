# Full Stack Task Management App

A full-stack task management application built with a FastAPI backend and a React frontend. Users can register, log in, and manage their own tasks with create, read, update, complete, and delete actions.

## Features

- User registration
- JWT-based login and authentication
- User-specific task CRUD
- Task completion toggle
- PostgreSQL database integration
- Alembic database migrations

## Tech Stack

### Backend

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic
- Pydantic Settings
- Passlib Argon2
- python-jose JWT

### Frontend

- React
- Vite
- Axios
- React Router
- React Toastify
- Lucide React

## Project Structure

```txt
full-stack-task-management-app/
  backend/
    alembic/
      versions/
    src/
      models/
      routers/
      schemas/
      security/
      database.py
      main.py
    .env.example
    alembic.ini
    requirements.txt

  frontend/
    src/
      components/
    .env.example
    package.json

  README.md
```

## Backend Setup

Run backend commands from the `backend` directory.

```bash
cd backend
```

Create and activate a virtual environment.

```bash
python -m venv .venv
source .venv/bin/activate
```

Install dependencies.

```bash
python -m pip install -r requirements.txt
```

Create a local environment file.

```bash
cp .env.example .env
```

Update `.env` with your local database and secret values.

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME
SECRET_KEY=replace-with-a-long-random-secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Apply database migrations.

```bash
python -m alembic upgrade head
```

Start the backend server.

```bash
uvicorn src.main:app --reload
```

Backend URL:

```txt
http://127.0.0.1:8000
```

Swagger API docs:

```txt
http://127.0.0.1:8000/docs
```

## Frontend Setup

Run frontend commands from the `frontend` directory.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Create a local environment file.

```bash
cp .env.example .env
```

Check that the frontend points to the backend API.

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/
```

Start the frontend development server.

```bash
npm run dev
```

Open the URL printed by Vite. It is usually one of the following:

```txt
http://localhost:5173
http://localhost:5174
```

## Development Workflow

During development, run the backend and frontend in separate terminals.

Terminal 1:

```bash
cd backend
source .venv/bin/activate
uvicorn src.main:app --reload
```

Terminal 2:

```bash
cd frontend
npm run dev
```

## Database Migrations

This project uses Alembic to manage database schema changes. Database tables are not created automatically when the FastAPI app starts.

Check the current database revision:

```bash
cd backend
python -m alembic current
```

Check whether the models and database schema are in sync:

```bash
python -m alembic check
```

Create a new migration after changing SQLAlchemy models:

```bash
python -m alembic revision --autogenerate -m "describe schema change"
```

Apply migrations:

```bash
python -m alembic upgrade head
```

Use `python -m alembic ...` instead of running `alembic` directly. This helps ensure Alembic runs from the active project virtual environment rather than another Python installation such as Anaconda.

## API Endpoints

### Users

```txt
POST /users/register
POST /users/login
POST /users/token
```

### Tasks

Task endpoints require Bearer token authentication.

```txt
POST   /tasks/create-task
GET    /tasks/get-tasks
GET    /tasks/get-task/{id}
PUT    /tasks/update-task?id={id}
DELETE /tasks/delete-task?id={id}
```

## Validation Commands

Run frontend linting:

```bash
cd frontend
npm run lint
```

Run a production frontend build:

```bash
npm run build
```

Run a basic backend syntax check:

```bash
cd backend
python -m py_compile src/main.py src/routers/task.py src/schemas/task.py
```

## Notes

- Keep real database URLs, passwords, and JWT secrets in `.env`.
- Do not commit `.env`.
- Keep only safe placeholder values in `.env.example`.
- In production, set `CORS_ORIGINS` to the exact deployed frontend domain.
