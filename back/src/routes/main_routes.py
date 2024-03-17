from fastapi import APIRouter
from type.types import ItemType, InsertType
import sql.operations as op


router = APIRouter()


@router.get("/get-names", response_model=list[ItemType])
def get_names():
    return op.get_names()


@router.post("/insert-name", response_model=ItemType)
def insert_name(req: InsertType):
    return op.insert_item(req)


@router.put("/remove-name", response_model=ItemType)
def remove_item(req: ItemType):
    return op.remove_item(req)


@router.put("/update-name", response_model=ItemType)
def update_name(req: ItemType):
    return op.update_name(req)


@router.put("/update-qtd", response_model=ItemType)
def update_name(req: ItemType):
    return op.update_qtd(req)
