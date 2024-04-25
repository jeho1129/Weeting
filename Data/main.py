from fastapi import FastAPI
# from database import engine, Base

from KoreanProcessing.model import router as fasttext_router
from KoreanProcessing.morpheme import router as konlpy_router

app = FastAPI()

app.include_router(fasttext_router)
app.include_router(konlpy_router)

# Base.metadata.create_all(bind=engine)