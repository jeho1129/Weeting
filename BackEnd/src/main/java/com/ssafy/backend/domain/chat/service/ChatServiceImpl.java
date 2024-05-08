package com.ssafy.backend.domain.chat.service;

import com.ssafy.backend.domain.chat.document.Chat;
import com.ssafy.backend.domain.chat.dto.ChatDto;
import com.ssafy.backend.domain.chat.dto.ChatMessageDto;
import com.ssafy.backend.domain.chat.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatServiceImpl implements ChatService{

    private final RabbitTemplate rabbitTemplate;
    private final TopicExchange topicExchange;
    private final ChatRepository chatRepository;


    @Override
    public void sendMessage(ChatMessageDto messageDto, Long userId, String roomId) {

        Chat chat = Chat.builder()
                .roomId(roomId)
                .userId(userId)
                .nickname(messageDto.getNickname())
                .message(messageDto.getMessage())
                .sendTime(LocalDateTime.now())
                .build();

        chatRepository.save(chat);

        ChatDto chatDto = ChatDto.builder()
                .userId(userId)
                .nickname(messageDto.getNickname())
                .message(messageDto.getMessage())
                .sendTime(LocalDateTime.now())
                .build();

        rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + roomId, chatDto);
    }


}
