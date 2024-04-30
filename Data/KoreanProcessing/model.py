from fastapi import HTTPException, APIRouter, status
from typing import List
from pydantic import BaseModel
from model_manager import find_top_similar_words

router = APIRouter()

class SimilarWordsResponse(BaseModel):
    word: str
    score: float

@router.get("/similar/{input_word}", response_model=List[SimilarWordsResponse])
async def get_similar_words(input_word, k: int = 15000):
    try:
        results = find_top_similar_words(input_word, k)
        results = sorted(results, key=lambda x: x[0], reverse=True)
        recalculated_results = []
        start_score = 99.99
        decrement = 0.01
        for idx, (score, word) in enumerate(results):
            recalculated_score = start_score - (decrement * idx)
            if recalculated_score < 0.001:
                break
            recalculated_results.append({"word": word, "score": round(recalculated_score, 2)})
        return recalculated_results
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")