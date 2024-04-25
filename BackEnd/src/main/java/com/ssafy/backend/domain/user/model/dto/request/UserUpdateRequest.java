package com.ssafy.backend.domain.user.model.dto.request;


import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@JsonNaming(PropertyNamingStrategy.class)
public class UserUpdateRequest {
    private String account;
    private String password;
    private String nickname;
    private long score;
    private long ranking;
}
