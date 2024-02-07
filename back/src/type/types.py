from pydantic import BaseModel

class ItemType(BaseModel):
    id: int
    name: str


class RequestType(BaseModel):
    name: str


class UpdateType(BaseModel):
    id: int
    name: str
    newName: str