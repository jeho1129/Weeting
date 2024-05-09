package com.ssafy.backend.domain.chat.dto;

import lombok.Data;

@Data
public class ChatMessageDto {

    private Long userId;
    private String content;
    private String nickname;

}
