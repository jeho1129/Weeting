package com.ssafy.backend.user.model.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonNaming(PropertyNamingStrategy.class)
@Builder
public class UserResponse {

    private Long id;
    private String account;
    private String password;
    private String nickname;
    private Long score;
    private Long ranking;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
