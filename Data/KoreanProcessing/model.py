from concurrent.futures import ThreadPoolExecutor
from fastapi import HTTPException, APIRouter
from typing import List
from pydantic import BaseModel
from konlpy.tag import Okt

import fasttext
import re

router = APIRouter()

model = fasttext.load_model('KoreanProcessing/model.bin')
hangul_pattern = re.compile(r'^[\u3130-\u318F\uAC00-\uD7A3]+$')
okt = Okt()

def is_hangul(text) -> bool:
    return bool(hangul_pattern.match(text))

def filter_hangul(neighbor):
    score, word = neighbor
    if is_hangul(word):
        morphs = okt.pos(word, norm=True, stem=True, join=False)
        filtered_word = ''.join([morph for morph, tag in morphs if tag not in ['Josa', 'Suffix', 'Eomi', 'PreEomi']])
        if filtered_word:
            return (score, filtered_word)
    return None

def find_top_similar_words(word, k):
    neighbors = model.get_nearest_neighbors(word, k)
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

class SimilarWordsResponse(BaseModel):
    word: str
    score: float

@router.get("/similar/{input_word}", response_model=List[SimilarWordsResponse])
async def get_similar_words(input_word: str, k: int = 9999):
    try:
        results = find_top_similar_words(input_word, k)
        results = sorted(results, key=lambda x: x[0], reverse=True)
        recalculated_results = []
        start_score = 99.99
        decrement = 0.01
        for idx, (score, word) in enumerate(results):
            recalculated_score = start_score - (decrement * idx)
            recalculated_results.append({"word": word, "score": round(recalculated_score, 2)})
        filtered_results = [res for res in recalculated_results if input_word not in res['word']]
        return filtered_results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))