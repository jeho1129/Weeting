from fastapi import HTTPException, APIRouter, WebSocket, WebSocketDisconnect, Query
from pykospacing import Spacing
from konlpy.tag import Okt
from model_manager import get_similar_words
import aioredis, re

router = APIRouter()
spacing = Spacing()
okt = Okt()
##################### 해당 코드는 redis 구현 후 주석 처리 해제할 것 #################################
# redis = aioredis.from_url("redis://localhost", encoding="utf8", decode_responses=True)

# async def store_similar_words_for_forbidden_words():
#     user_ids = await redis.smembers("user_ids")
#     for user_id in user_ids:
#         forbidden_word = await redis.get(f"user:{user_id}:forbidden_word")
#         if forbidden_word:
#             similar_words = await get_similar_words(forbidden_word, 15000)
#             for w in similar_words:
#                 await redis.hset(f"similar:{user_id}:{forbidden_word}", w['word'], w['score'])

# async def check_text_against_forbidden_words(words, forbidden_word):
#     forbidden_similar_words = await redis.hgetall(f"similar:{forbidden_word}")
#     most_similar_word, highest_similarity = None, 0.0

#     for word in words:
#         if word in forbidden_similar_words:
#             score = float(forbidden_similar_words[word])
#             if score > highest_similarity:
#                 highest_similarity = score
#                 most_similar_word = word

#     return most_similar_word, highest_similarity

# async def process_data(data, forbidden_word):
#     filtered_data = spacing(data)
#     filtered_data = re.sub(r'(이와|이의|이가)\b', '', filtered_data)
#     morphs = okt.pos(filtered_data, norm=True, join=False)
#     processed_words = [morph for morph, tag in morphs if tag not in ['Josa', 'Suffix']]
#     await redis.rpush("chat_history", data)
#     await redis.rpush("processed_words", *processed_words)

#     most_similar_word, similarity = await check_text_against_forbidden_words(processed_words, forbidden_word)
#     return {
#         "words": processed_words,
#         "input": data,
#         "forbidden_similar": {
#             "word": most_similar_word,
#             "similarity": similarity
#         }
#     }

# @router.websocket("/ws/{user_id}")
# async def websocket_endpoint(websocket: WebSocket, user_id: str):
#     await websocket.accept()
#     if not await redis.exists(f"user:{user_id}:forbidden_word"):
#         await websocket.send_text("Invalid user ID or no forbidden word set for this user.")
#         await websocket.close()
#         return

#     try:        
#         while True:
#             data = await websocket.receive_text()
#             forbidden_word = await redis.get(f"user:{user_id}:forbidden_word")
#             if not forbidden_word:
#                 await websocket.send_text("No forbidden word set for this user.")
#                 continue

#             response = await process_data(data, forbidden_word)
#             await websocket.send_json(response)
#     except WebSocketDisconnect:
#         print("Websocket disconnected")
#     except Exception as e:
#         print(f"An error occurred: {str(e)}")
#         await websocket.send_text("An error occurred, please try again.")
#         await websocket.close()

@router.get("/analyze")
async def analyze_text(text: str = Query(None, min_length=1)):
    try:
        text = spacing(text)
        text = re.sub(r'(이와|이의|이가)\b', '', text)
        morphs = okt.pos(text, norm=True, join=False)
        filtered_words = [morph for morph, tag in morphs if tag not in ['Josa', 'Suffix']]
        return filtered_words
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))