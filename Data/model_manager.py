from concurrent.futures import ThreadPoolExecutor
from fastapi import HTTPException, status
from konlpy.tag import Okt
import asyncio, fasttext, re, os

fasttext.FastText.eprint = lambda x: None

model = None
MODEL_PATH = '/app/model/model.bin'
hangul_pattern = re.compile(r'^[\uAC00-\uD7A3]+$')
okt = Okt()

def load_model():
    global model
    if os.path.exists(MODEL_PATH):
        print(f"Model file found at {MODEL_PATH}. Loading synchronously...")
        model = fasttext.load_model(MODEL_PATH)
        print("Model loaded successfully.")
    else:
        print(f"Model file not found at {MODEL_PATH}.")

async def get_model():
    global model
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

    seen_words = set()
    unique_results = []
    
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(filter_hangul, neighbor, input_word) for neighbor in neighbors]
        results = [future.result() for future in futures if future.result()]
    
    for score, word in results:
        if word not in seen_words:
            unique_results.append((score, word))
            seen_words.add(word)
    
    return unique_results[:k]

async def get_similar_words(input_word, k=10000):
    try:
        similar_words = find_top_similar_words(input_word, k)
        recalculated_results = [{'word': word, 'score': round(99.98 - idx * 0.02, 2)}
                                for idx, (score, word) in enumerate(similar_words)]
        return [result["word"] for result in recalculated_results if result['score'] > 0.001]
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")