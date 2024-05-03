from fastapi import HTTPException, APIRouter, status
from pydantic import BaseModel
from pykospacing import Spacing
from konlpy.tag import Okt
from model_manager import get_similar_words
import aioredis, re

router = APIRouter()
spacing = Spacing()
okt = Okt()
#################### 해당 코드는 redis 구현 후 주석 처리 해제할 것 #################################
# 1. 사용자 금지어 입력 시 금지어와 유사 단어 + 점수 리스트 Redis에 저장하기
# 2. 사용자가 채팅 내용 입력하면 형태소 분석하여 단어 리스트로 넘기기
# 3. 단어 리스트에서 금지어와 유사도 점수가 가장 높은 단어, 점수 Redis에 저장하기

redis = aioredis.from_url("redis://54.180.158.223:6379", password="c103103", encoding="utf8", decode_responses=True)

class TextData(BaseModel):
    text: str
    user_id: str

async def store_similar_words_for_forbidden_words():
    user_ids = await redis.smembers("user_ids")
    for user_id in user_ids:
        forbidden_word = await redis.get(f"user:{user_id}:forbidden_word")
        if forbidden_word:
            similar_words = await get_similar_words(forbidden_word, 15000)
            for w in similar_words:
                await redis.hset(f"similar:{user_id}:{forbidden_word}", w['word'], w['score'])

async def check_text_against_forbidden_words(words, forbidden_word):
    forbidden_similar_words = await redis.hgetall(f"similar:{forbidden_word}")
    most_similar_word, highest_similarity = None, 0.0

    for word in words:
        if word in forbidden_similar_words:
            score = float(forbidden_similar_words[word])
            if score > highest_similarity:
                highest_similarity = score
                most_similar_word = word

    return most_similar_word, highest_similarity

async def process_data(data, forbidden_word):
    filtered_data = spacing(data)
    filtered_data = re.sub(r'(이와|이의|이가)\b', '', filtered_data)
    morphs = okt.pos(filtered_data, norm=True, join=False)
    processed_words = [morph for morph, tag in morphs if tag not in ['Josa', 'Suffix']]
    await redis.rpush("chat_history", data)
    await redis.rpush("processed_words", *processed_words)

    most_similar_word, similarity = await check_text_against_forbidden_words(processed_words, forbidden_word)
    return {
        "words": processed_words,
        "input": data,
        "forbidden_similar": {
            "word": most_similar_word,
            "similarity": similarity
        }
    }

#################### 해당 코드는 redis 테스트를 위한 임시 API #################################
# @router.post("/analyze")
# async def analyze_text(text_data: TextData):
#     user_id = text_data.user_id
#     data = text_data.text
    
#     forbidden_word = await redis.get(f"user:{user_id}:forbidden_word")
#     if not forbidden_word:
#         raise HTTPException(status_code=400, detail="Invalid user ID or no forbidden word set for this user.")
    
#     response = await process_data(data, forbidden_word)
#     return response

class ForbiddenWordData(BaseModel):
    user_id: str
    forbidden_word: str

@router.post("/forbidden")
async def store_forbidden_word(data: ForbiddenWordData):
    user_id = data.user_id
    forbidden_word = data.forbidden_word

    try:
        await redis.set(f"user:{user_id}:forbidden_word", forbidden_word)
        similar_words = await get_similar_words(forbidden_word, 15000)
        for w in similar_words:
            await redis.hset(f"similar:{user_id}:{forbidden_word}", w['word'], w['score'])

        return {"message": "Forbidden word and similar words stored successfully"}

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))