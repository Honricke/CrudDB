from fastapi import FastAPI
from routes import routes1

app = FastAPI()

app.include_router(router=routes1.router)
