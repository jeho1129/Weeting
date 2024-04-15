from hangul_utils import split_syllables, join_jamos

def get_initials(word):
    decomposed = split_syllables(word)
    initials = [char for char in decomposed if 'ㄱ' <= char <= 'ㅎ']
    return ''.join(initials)

def match_initials(input_word, given_initials):
    input_initials = get_initials(input_word)
    return input_initials == given_initials

input_word = '상'
given_initials = 'ㅅ'
result = match_initials(input_word, given_initials)

print(result)