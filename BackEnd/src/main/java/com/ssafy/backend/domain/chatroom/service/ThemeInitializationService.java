package com.ssafy.backend.domain.chatroom.service;

import com.ssafy.backend.domain.chatroom.entity.ForbiddenWord;
import com.ssafy.backend.domain.chatroom.entity.Theme;
import com.ssafy.backend.domain.chatroom.repository.ForbiddenWordRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ThemeInitializationService {

    private final ForbiddenWordRepository forbiddenWordRepository;

    @Autowired
    public ThemeInitializationService(ForbiddenWordRepository forbiddenWordRepository) {
        this.forbiddenWordRepository = forbiddenWordRepository;
    }

    @PostConstruct
    public void initializeThemes() {
        // 현재 존재하는 ForbiddenWord의 Theme을 Set으로 수집
        Set<Theme> existingThemes = forbiddenWordRepository.findAll().stream()
                .map(ForbiddenWord::getTheme)
                .collect(Collectors.toSet());

        // Theme 중 아직 없는 것만 수집
        List<ForbiddenWord> forbiddenWordsToSave = List.of(Theme.values()).stream()
                .filter(theme -> !existingThemes.contains(theme))
                .map(theme -> ForbiddenWord.builder().theme(theme).build())
                .collect(Collectors.toList());

        // 한 번에 배치 삽입
        if (!forbiddenWordsToSave.isEmpty()) {
            forbiddenWordRepository.saveAll(forbiddenWordsToSave);
        }
    }
}