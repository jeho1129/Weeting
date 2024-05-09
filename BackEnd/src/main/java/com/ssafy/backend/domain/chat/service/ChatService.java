package com.ssafy.backend.domain.chat.service;

import com.ssafy.backend.domain.chat.document.Chat;
import com.ssafy.backend.domain.chat.dto.ChatMessageDto;
import com.ssafy.backend.domain.user.model.entity.User;

import java.util.List;

public interface ChatService {

    void sendMessage(ChatMessageDto messageDto, String roomId, User user);

    List<Chat> getChatHistory(String roomId);

}
