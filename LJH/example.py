import fasttext
import numpy as np

model = fasttext.load_model('model.bin')

def cosine_similarity(word1, word2):
    return np.dot(model[word1], model[word2]) / (np.linalg.norm(model[word1]) * np.linalg.norm(model[word2]))

def find_top_similar_words(word, k = 1000):
    similar_words = model.get_nearest_neighbors(word, k = k)
    return similar_words

print(cosine_similarity('고급', '상급'))

top_similar_words = find_top_similar_words('고급', 1000)
for score, word in top_similar_words:
    print(f"{word} : {score}")