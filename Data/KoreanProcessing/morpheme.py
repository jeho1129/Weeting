from fastapi import HTTPException, APIRouter, status, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from pykospacing import Spacing
from konlpy.tag import Okt
from model_manager import get_similar_words
import aioredis, re, json

router = APIRouter()
spacing = Spacing()
okt = Okt()

redis = aioredis.from_url("redis://3.36.58.63:6379", password="c103103", encoding="utf8", decode_responses=True)

# @router.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     try:
#         while True:
#             data = await websocket.receive_text()
#             response = await process_message(data)
#             if response:
#                 await websocket.send_json(response)
#     except WebSocketDisconnect:
#         print("Client disconnected")

# 1. 사용자 금지어 입력 시 금지어와 유사 단어 + 점수 리스트 Redis에 저장하기
# 2. 사용자가 채팅 내용 입력하면 형태소 분석하여 단어 리스트로 넘기기
# 3. 단어 리스트에서 금지어와 유사도 점수가 가장 높은 단어, 점수 Redis에 저장하기
# 4. 게임이 끝나면 Redis에 저장되어 있는 금지어 관련 데이터 지우기

async def check_text_against_forbidden_words(words, user_id):
    forbidden_similar_words = await redis.hgetall(f"similar:{user_id}")
    forbidden_word = await redis.get(f"forbidden:{user_id}")
    # existing_word = await redis.get(f"highest_word:{user_id}")
    # existing_score = await redis.get(f"hightest_score:{user_id}")
    # existing_score = float(existing_score) if existing_score else 0.0

    most_similar_word, highest_similarity = None, 0.0

    for word in words:
        if word == forbidden_word:
            most_similar_word = word
            highest_similarity = 100
            break
        if word in forbidden_similar_words:
            score = float(forbidden_similar_words[word])
            if score > highest_similarity:
                highest_similarity = score
                most_similar_word = word

    # if highest_similarity > existing_score:
    #     await redis.set(f"highest_word:{user_id}", most_similar_word)
    #     await redis.set(f"hightest_score:{user_id}", highest_similarity)
    # else:
    #     most_similar_word = existing_word
    #     highest_similarity = existing_score
    
    return most_similar_word, highest_similarity

class ForbiddenWordData(BaseModel):
    nickname: str
    forbidden_word: str

@router.post("/api/v1/forbidden")
async def store_forbidden_word(data: ForbiddenWordData):
    nickname = data.nickname
    forbidden_word = data.forbidden_word

    try:
        await redis.set(f"forbidden:{nickname}", forbidden_word)
        similar_words = await get_similar_words(forbidden_word, 4000)
        for w in similar_words:
            await redis.hset(f"similar:{nickname}", w['word'], w['score'])

        return {"message": "Forbidden word and similar words stored successfully"}

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

# async def process_message(data):
#     message_data = json.loads(data)
#     user_nickname = message_data.get("nickname")
#     chat_content = message_data.get("content")

#     filtered_data = spacing(chat_content)
#     filtered_data = re.sub(r'(이와|이의|이가)\b', '', filtered_data)
#     morphs = okt.pos(filtered_data, norm=True, join=False)
#     processed_words = [morph for morph, tag in morphs if tag not in ['Josa', 'Suffix']]
#     most_similar_word, highest_similarity = await check_text_against_forbidden_words(processed_words, user_nickname)

#     return {
#         "nickname": user_nickname,
#         "most_similar_word": most_similar_word,
#         "highest_similarity": highest_similarity
#     }

class ChatContent(BaseModel):
    nickname: str
    content: str

@router.post("api/v1/process_message")
async def process_message_api(data: ChatContent):
    user_nickname = data.nickname
    chat_content = data.content

    filtered_data = spacing(chat_content)
    filtered_data = re.sub(r'(이와|이의|이가)\b', '', filtered_data)
    morphs = okt.pos(filtered_data, norm=True, join=False)
    processed_words = [morph for morph, tag in morphs if tag not in ['Josa', 'Suffix']]
    most_similar_word, highest_similarity = await check_text_against_forbidden_words(processed_words, user_nickname)

    return {
        "nickname": user_nickname,
        "most_similar_word": most_similar_word,
        "highest_similarity": highest_similarity
    }