package com.ssafy.backend.domain.chatroom.service;

import org.springframework.stereotype.Service;

@Service
public interface ChatRoomStatusService {
    void gameStart(String chatRoomId);

    void gameEnd(String chatRoomId);

    void waittingToAllready();

    void wordsettingToWordfinish();

    void wordfinishToStart();

    void startToEnd();

    void EndToWaitting();
}
