package com.ssafy.backend.domain.chatroom.repository;

import com.ssafy.backend.domain.chatroom.entity.ForbiddenWord;
import com.ssafy.backend.domain.chatroom.entity.Theme;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForbiddenWordRepository extends JpaRepository<ForbiddenWord, Long> {
    boolean existsByTheme(Theme theme);
}