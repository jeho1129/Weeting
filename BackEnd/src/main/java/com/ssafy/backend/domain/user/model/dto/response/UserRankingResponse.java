package com.ssafy.backend.domain.user.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.relational.core.sql.In;

@Getter
@Setter
@AllArgsConstructor
public class UserRankingResponse {
    private Integer ranking;
    private String nickname;
    private Integer score;
}