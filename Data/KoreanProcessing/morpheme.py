from fastapi import HTTPException, APIRouter, WebSocket, WebSocketDisconnect, Query
from konlpy.tag import Okt
from typing import List
import aioredis

router = APIRouter()
okt = Okt()

######################## 해당 코드는 redis 구현 후 주석 처리 해제할 것 #################################
# redis = aioredis.from_url("redis://localhost")

# @router.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     try:
#         while True:
#             data = await websocket.receive_text()
#             await process_and_respond(websocket, data)
#     except WebSocketDisconnect:
#         print("Websocket disconnected")

# async def process_and_respond(websocket: WebSocket, data: str):
#     nouns = kkma.nouns(data)
#     pos_data = kkma.pos(data)
#     await redis.rpush("chat_history", data)
#     await websocket.send_json({
#         "nouns": nouns,
#         "verbs": [word for word, tag in pos_data if tag.startswith('VV')],
#         "adjectives": [word for word, tag in pos_data if tag.startswith('VA')],
#         "adverbs": [word for word, tag in pos_data if tag.startswith('MA')],
#         "input": data
#     })

@router.get("/analyze")
async def analyze_text(text: str = Query(None, min_length=1)):
    try:
        morphs = okt.pos(text, norm=True, stem=True, join=False)
        filtered_words = [morph for morph, tag in morphs if tag not in ['Josa', 'Suffix']]
        return filtered_words
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))