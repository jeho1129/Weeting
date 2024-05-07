from fastapi import HTTPException, APIRouter, status
from pydantic import BaseModel
from pykospacing import Spacing
from konlpy.tag import Okt
from model_manager import get_similar_words
import aioredis, re, websockets

router = APIRouter()
spacing = Spacing()
okt = Okt()

redis = aioredis.from_url("redis://54.180.158.223:6379", password="c103103", encoding="utf8", decode_responses=True)

async def receive_message_from_spring():
    uri = "ws://54.180.158.223:8080/ws"
    async with websockets.connect(uri) as websocket:
        while True:
            try:
                message = await websocket.recv()
                if message:
                    await process_message(message)
            except websockets.exceptions.ConnectionClosedError:
                print("Connection closed.")
                break

async def check_text_against_forbidden_words(words, user_id):
    forbidden_similar_words = await redis.hgetall(f"similar:{user_id}")
    existing_word = await redis.get(f"highest_word:{user_id}")
    existing_score = await redis.get(f"hightest_score:{user_id}")
    existing_score = float(existing_score) if existing_score else 0.0

    most_similar_word, highest_similarity = None, 0.0

    for word in words:
        if word in forbidden_similar_words:
            score = float(forbidden_similar_words[word])
            if score > highest_similarity:
                highest_similarity = score
                most_similar_word = word

    if highest_similarity > existing_score:
        await redis.set(f"highest_word:{user_id}", most_similar_word)
        await redis.set(f"hightest_score:{user_id}", highest_similarity)
    else:
        most_similar_word = existing_word
        highest_similarity = existing_score
    
    return most_similar_word, highest_similarity

class ForbiddenWordData(BaseModel):
    user_id: str
    forbidden_word: str

@router.post("/forbidden")
async def store_forbidden_word(data: ForbiddenWordData):
    user_id = data.user_id
    forbidden_word = data.forbidden_word

    try:
        await redis.set(f"forbidden:{user_id}", forbidden_word)
        similar_words = await get_similar_words(forbidden_word, 15000)
        for w in similar_words:
            await redis.hset(f"similar:{user_id}", w['word'], w['score'])

        return {"message": "Forbidden word and similar words stored successfully"}

    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

async def process_message(data, user_id):
    filtered_data = spacing(data)
    filtered_data = re.sub(r'(이와|이의|이가)\b', '', filtered_data)
    morphs = okt.pos(filtered_data, norm=True, join=False)
    processed_words = [morph for morph, tag in morphs if tag not in ['Josa', 'Suffix']]
    most_similar_word, highest_similarity = await check_text_against_forbidden_words(processed_words, user_id)

    return {
        "words": processed_words,
        "input": data,
        "most_similar_word": most_similar_word,
        "highest_similarity": highest_similarity
    }