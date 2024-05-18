package com.ssafy.backend.domain.chatroom.service;

import org.springframework.stereotype.Service;

@Service
public interface ChatRoomStatusService {
    void gameStart(String chatRoomId);

    void gameEnd(String chatRoomId);

    void waittingToAllready(String key);

    void wordsettingToWordfinish(String key);

    void wordfinishToStart(String key);

    void startToEnd(String key);

    void EndToWaitting(String key);
}
