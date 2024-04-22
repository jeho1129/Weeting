import fasttext
import re
from concurrent.futures import ThreadPoolExecutor

from fastapi import HTTPException, APIRouter
from typing import List
from pydantic import BaseModel

router = APIRouter()

model = fasttext.load_model('KoreanProcessing/model.bin')
hangul_pattern = re.compile(r'^[\u3130-\u318F\uAC00-\uD7A3]+$')

def is_hangul(text) -> bool:
    return bool(hangul_pattern.match(text))

def find_top_similar_words(word, k=500):
    neighbors = model.get_nearest_neighbors(word, k=5000)
    
    similar_words = []
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(filter_hangul, neighbor) for neighbor in neighbors]

        for future in futures:
            result = future.result()
            if result and len(similar_words) < k:
                similar_words.append(result)
            if len(similar_words) >= k:
                break

    return similar_words[:k]

def filter_hangul(neighbor):
    score, word = neighbor
    if is_hangul(word):
        return (score, word)
    return None

class SimilarWordsResponse(BaseModel):
    word: str
    score: float

@router.get("/similar/{word}", response_model=List[SimilarWordsResponse])
async def get_similar_words(word: str, k: int = 5000):
    try:
        results = find_top_similar_words(word, k)
        return [{"word": result[1], "score": result[0]} for result in results]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 