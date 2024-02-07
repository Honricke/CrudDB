from fastapi import APIRouter
from type.types import UpdateType, ItemType, RequestType
import sql.operations as op


router = APIRouter()


@router.get("/get-names", response_model=list[ItemType])
def get_names():
    return op.get_names()


@router.post("/insert-name", response_model=ItemType)
def insert_name(item: RequestType):
    return op.insert_name(item)


@router.delete("/remove-name", response_model=ItemType)
def remove_name(item: ItemType):
    return op.remove_name(item)


@router.put("/update-name", response_model=ItemType)
def update_name(item: UpdateType):
    return op.update_name(item)
