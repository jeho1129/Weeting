from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from database import engine, Base
from contextlib import asynccontextmanager
from KoreanProcessing.model import router as fasttext_router
from KoreanProcessing.morpheme import router as konlpy_router
from KoreanProcessing.morpheme import process_message
import asyncio, model_manager, aiohttp

# async def receive_message():
#     # 배포 서버 URI
#     uri = "wss://weeting.shop/ws"
#     # 로컬 서버 URI
#     # uri = "ws://localhost:8000/ws"
#     async with aiohttp.ClientSession() as session:
#         async with session.ws_connect(uri) as ws:
#             async for msg in ws:
#                 if msg.type == aiohttp.WSMsgType.TEXT:
#                     await process_message(msg.data)
#                 elif msg.type == aiohttp.WSMsgType.CLOSED:
#                     print("Connection closed.")
#                     break
#                 elif msg.type == aiohttp.WSMsgType.ERROR:
#                     print("Connection error.")
#                     break

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        model_manager.load_model()
        # asyncio.create_task(receive_message())
        yield
    except Exception as e:
        print(f"Error during model loading: {e}")
        raise
    finally:
        pass

app = FastAPI(lifespan=lifespan)
app.include_router(fasttext_router)
app.include_router(konlpy_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Base.metadata.create_all(bind=engine)