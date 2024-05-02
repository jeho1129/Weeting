from concurrent.futures import ThreadPoolExecutor
from fastapi import HTTPException, status
from konlpy.tag import Okt
import asyncio, fasttext, re

fasttext.FastText.eprint = lambda x: None

model = None
MODEL_PATH = '/app/model/model.bin'
hangul_pattern = re.compile(r'^[\uAC00-\uD7A3]+$')
okt = Okt()

model_loaded = asyncio.Event()

async def load_model():
    global model
    loop = asyncio.get_event_loop()
    print("Loading model...")
    model = await loop.run_in_executor(None, fasttext.load_model, MODEL_PATH)
    print("Model loaded successfully.")
    model_loaded.set()

async def get_model():
    await model_loaded.wait()
    return model

def is_hangul(text) -> bool:
    return bool(hangul_pattern.fullmatch(text))

def filter_hangul(neighbor, input_word):
    score, word = neighbor
    if not is_hangul(word) or input_word in word:
        return None
    morphs = okt.pos(word, norm=True, join=False)
    filtered_word = ''.join(morph for morph, tag in morphs if tag not in ['Josa', 'Suffix', 'Eomi', 'PreEomi'])
    return (score, filtered_word) if len(filtered_word) <= 12 else None

def find_top_similar_words(input_word, k):
    if not is_hangul(input_word):
        raise ValueError("Input word must contain only Korean characters.")
    neighbors = model.get_nearest_neighbors(input_word, k)
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(filter_hangul, neighbor, input_word) for neighbor in neighbors]
        results = [future.result() for future in futures if future.result()]
    return results[:k]

async def get_similar_words(input_word, k=15000):
    try:
        similar_words = find_top_similar_words(input_word, k)
        recalculated_results = [{'word': word, 'score': round(99.99 - idx * 0.01, 2)}
                                for idx, (score, word) in enumerate(similar_words)]
        return [result["word"] for result in recalculated_results if result['score'] > 0.001]
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")