from pydantic import BaseModel


class ItemType(BaseModel):
    id: int
    name: str
    qtd: int


class InsertType(BaseModel):
    name: str
    qtd: int
