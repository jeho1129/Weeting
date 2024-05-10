package com.ssafy.backend.domain.chat.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ChatDto {

    private Long userId;

    private String nickname;

    private String content;

    // @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MMdd HH시mm분ss초")
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private LocalDateTime sendTime;

}
