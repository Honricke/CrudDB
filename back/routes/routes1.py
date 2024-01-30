from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def teste() -> str:
    return "Hello World"