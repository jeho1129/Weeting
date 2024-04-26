from concurrent.futures import ThreadPoolExecutor
from fastapi import HTTPException, status
from konlpy.tag import Okt
import asyncio, fasttext, re

model = None
hangul_pattern = re.compile(r'^[\uAC00-\uD7A3]+$')
okt = Okt()

async def load_model():
    global model
    loop = asyncio.get_event_loop()
    model = await loop.run_in_executor(None, fasttext.load_model, 'KoreanProcessing/model.bin')
    print("Model loaded successfully.")

async def get_model():
    global model
    return model

def is_hangul(text) -> bool:
    return bool(hangul_pattern.fullmatch(text))

def filter_hangul(neighbor, input_word):
    score, word = neighbor
    if not is_hangul(word):
        return None
    morphs = okt.pos(word, norm=True, join=False)
    if any(tag in ['Josa', 'Suffix', 'Eomi', 'PreEomi'] for _, tag in morphs) or input_word in word:
        return None
    filtered_word = ''.join([morph for morph, tag in morphs])
    if len(filtered_word) <= 12:
        return (score, filtered_word)
    return None

def find_top_similar_words(input_word, k):
    if not is_hangul(input_word):
        raise ValueError("Input word must contain only Korean characters.")
    neighbors = model.get_nearest_neighbors(input_word, k)
    similar_words = []
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(filter_hangul, neighbor, input_word) for neighbor in neighbors]
        for future in futures:
            result = future.result()
            if result and len(similar_words) < k:
                similar_words.append(result)
            if len(similar_words) >= k:
                break
    return similar_words[:k]

async def get_similar_words(input_word, k=15000):
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
        return [result["word"] for result in recalculated_results]
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")