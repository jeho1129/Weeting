package com.ssafy.backend.domain.chat.document;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.FieldResult;
import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Document
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Chat {

    @Id
    private String id;

    @Field("room_id")
    private String roomId;

    @Field("user_id")
    private Long userId;

    @Field("nick_name")
    private String nickname;

    @Field("content")
    private String content;

    @Field("send_time")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy년MM월dd일 HH시mm분ss초")
    private LocalDateTime sendTime;


}
