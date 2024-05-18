package com.ssafy.backend.domain.chatroom.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@Getter
@Setter
public class Word {

    private static final Random RANDOM = new Random();
    public static String getRandomForbiddenWord() {
        return DEFAULT_FORBIDDEN_WORDS.get(RANDOM.nextInt(DEFAULT_FORBIDDEN_WORDS.size()));
    }


    private static final List<String> DEFAULT_FORBIDDEN_WORDS = Collections.unmodifiableList(Arrays.asList(
            "재훈",
            "승혜,",
            "준선",
            "인범",
            "지호",
            "지수"
    ));

}
