from fastapi import HTTPException, APIRouter, status
from typing import List
from pydantic import BaseModel
from model_manager import find_top_similar_words

router = APIRouter()

class SimilarWordsResponse(BaseModel):
    word: str
    score: float

@router.get("/similar/{input_word}", response_model=List[SimilarWordsResponse])
async def get_similar_words(input_word, k: int = 10000):
    try:
        results = find_top_similar_words(input_word, k)
        recalculated_results = [{"word": word, "score": round(99.98 - idx * 0.02, 2)}
                                for idx, (score, word) in enumerate(results) if (99.98 - idx * 0.02) > 0.001]
        return recalculated_results
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")