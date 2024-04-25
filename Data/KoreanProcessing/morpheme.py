from concurrent.futures import ThreadPoolExecutor
from fastapi import HTTPException, APIRouter, WebSocket, WebSocketDisconnect, Query, status
from pykospacing import Spacing
from pydantic import BaseModel
from konlpy.tag import Okt
from typing import List
import fasttext, aioredis, re

router = APIRouter()
model = fasttext.load_model('KoreanProcessing/model.bin')
spacing = Spacing()
hangul_pattern = re.compile(r'^[\uAC00-\uD7A3]+$')
okt = Okt()
####################### 해당 코드는 redis 구현 후 주석 처리 해제할 것 #################################
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
#     most_similar_word = None
#     highest_similarity = 0.0

#     forbidden_similar_words = await redis.hgetall(f"similar:{forbidden_word}")

#     for word in words:
#         if word in forbidden_similar_words:
#             score = float(forbidden_similar_words[word])
#             if score > highest_similarity:
#                 highest_similarity = score
#                 most_similar_word = word

#     return most_similar_word, highest_similarity


# def is_hangul(text) -> bool:
#     return bool(hangul_pattern.fullmatch(text))


# def filter_hangul(neighbor, input_word):
#     score, word = neighbor
#     if not is_hangul(word):
#         return None
#     morphs = okt.pos(word, norm=True, join=False)
#     if any(tag in ['Josa', 'Suffix', 'Eomi', 'PreEomi'] for _, tag in morphs) or input_word in word:
#         return None
#     filtered_word = ''.join([morph for morph, tag in morphs])
#     if filtered_word:
#         return (score, filtered_word)
#     return None


# def find_top_similar_words(input_word, k):
#     if not is_hangul(input_word):
#         raise ValueError("Input word must contain only Korean characters.")
#     neighbors = model.get_nearest_neighbors(input_word, k)
#     similar_words = []
#     with ThreadPoolExecutor(max_workers=10) as executor:
#         futures = [executor.submit(filter_hangul, neighbor, input_word) for neighbor in neighbors]
#         for future in futures:
#             result = future.result()
#             if result and len(similar_words) < k:
#                 similar_words.append(result)
#             if len(similar_words) >= k:
#                 break
#     return similar_words[:k]


# async def get_similar_words(input_word, k=15000):
#     try:
#         results = find_top_similar_words(input_word, k)
#         results = sorted(results, key=lambda x: x[0], reverse=True)
#         recalculated_results = []
#         start_score = 99.99
#         decrement = 0.01
#         for idx, (score, word) in enumerate(results):
#             recalculated_score = start_score - (decrement * idx)
#             if recalculated_score < 0.001:
#                 break
#             recalculated_results.append({"word": word, "score": round(recalculated_score, 2)})
#         return [result["word"] for result in recalculated_results]
#     except ValueError as e:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
#     except Exception as e:
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")


# @router.websocket("/ws/{user_id}")
# async def websocket_endpoint(websocket: WebSocket, user_id: str):
#     await websocket.accept()
#     try:
#         user_exists = await redis.exists(f"user:{user_id}:forbidden_word")
#         if not user_exists:
#             await websocket.send_text("Invalid user ID or no forbidden word set for this user.")
#             await websocket.close()
#             return
        
#         while True:
#             data = await websocket.receive_text()
#             forbidden_word = await redis.get(f"user:{user_id}:forbidden_word")
#             if not forbidden_word:
#                 await websocket.send_text("No forbidden word set for this user.")
#                 continue

#             filtered_data = spacing(data)
#             filtered_data = re.sub(r'(이와|이의|이가)\b', '', filtered_data)
#             morphs = okt.pos(filtered_data, norm=True, join=False)
#             processed_words = [morph for morph, tag in morphs if tag not in ['Josa', 'Suffix']]
#             await redis.rpush("chat_history", data)
#             await redis.rpush("processed_words", *processed_words)

#             most_similar_word, similarity = await check_text_against_forbidden_words(processed_words, forbidden_word)
#             response = {
#                 "words": processed_words,
#                 "input": data,
#                 "forbidden_similar": {
#                     "word": most_similar_word,
#                     "similarity": similarity
#                 }
#             }
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