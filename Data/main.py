from fastapi import FastAPI
from database import engine, Base
from contextlib import asynccontextmanager
from KoreanProcessing.model import router as fasttext_router
from KoreanProcessing.morpheme import router as konlpy_router
import asyncio, model_manager

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await model_manager.load_model()
        yield
    except Exception as e:
        print(f"Error during model loading: {e}")
        raise
    finally:
        pass

app = FastAPI(lifespan=lifespan)
app.include_router(fasttext_router)
app.include_router(konlpy_router)

Base.metadata.create_all(bind=engine)
