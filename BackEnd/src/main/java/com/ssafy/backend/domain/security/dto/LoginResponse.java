package com.ssafy.backend.domain.security.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {
    private String accessToken;
    private Long userId;
    private String nickname;
    private Integer score;
    private Integer ranking;
}