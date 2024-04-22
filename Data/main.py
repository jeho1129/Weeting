from fastapi import FastAPI
# from database import engine, Base

from KoreanProcessing.model import router as fasttext_router

app = FastAPI()

app.include_router(fasttext_router)

# Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Hello World"}