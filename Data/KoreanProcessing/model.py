from fastapi import HTTPException, APIRouter, status, Query
from typing import List
from pydantic import BaseModel
from pykospacing import Spacing
from konlpy.tag import Okt
from model_manager import find_top_similar_words
import re

router = APIRouter()
spacing = Spacing()
okt = Okt()

class SimilarWordsResponse(BaseModel):
    word: str
    score: float

@router.get("/similar/{input_word}", response_model=List[SimilarWordsResponse])
async def get_similar_words(input_word, k: int = 4000):
    try:
        results = find_top_similar_words(input_word, k)
        recalculated_results = [{"word": word, "score": round(99.95 - idx * 0.05, 2)}
                                for idx, (score, word) in enumerate(results) if (99.95 - idx * 0.05) > 0.001]
        return recalculated_results
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")
    
@router.get("/analyze")
async def analyze(text: str = Query(None, min_length=1)):
    try:
        text = spacing(text)
        text = re.sub(r'(이와|이의|이가)\b', '', text)
        morphs = okt.pos(text, norm=True, join=False)
        filtered_words = [morph for morph, tag in morphs if tag not in ['Josa', 'Suffix']]
        return filtered_words
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))