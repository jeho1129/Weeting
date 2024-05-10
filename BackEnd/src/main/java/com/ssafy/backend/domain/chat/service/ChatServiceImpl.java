package com.ssafy.backend.domain.chat.service;

import com.ssafy.backend.domain.chat.document.Chat;
import com.ssafy.backend.domain.chat.dto.ChatDto;
import com.ssafy.backend.domain.chat.dto.ChatMessageDto;
import com.ssafy.backend.domain.chat.repository.ChatRepository;
import com.ssafy.backend.domain.user.model.entity.User;
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
    public void sendMessage(ChatMessageDto messageDto, String roomId, User user) {

        Chat chat = Chat.builder()
                .roomId(roomId)
                .userId(user.getId())
                .nickname((user.getNickname()))
                .content(messageDto.getContent())
                .sendTime(LocalDateTime.now())
                .build();

        chatRepository.save(chat);

        ChatDto chatDto = ChatDto.builder()
                .userId(messageDto.getUserId())
                .nickname(messageDto.getNickname())
                .content(messageDto.getContent())
                .sendTime(LocalDateTime.now())
                .build();

        rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + roomId, chatDto);
    }



    @Override
    public List<Chat> getChatHistory(String roomId) {
        return chatRepository.findByRoomId(roomId);
    }

}
