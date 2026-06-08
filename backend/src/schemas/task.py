from pydantic import BaseModel, ConfigDict

class TaskCreate(BaseModel):
    title : str
    description : str | None = None
    completed : bool = False

class TaskResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: str | None = None
    completed: bool
