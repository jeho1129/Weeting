package com.ssafy.backend.domain.user.model.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.backend.domain.user.model.dto.response.UserResponse;
import com.ssafy.backend.domain.user.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@JsonNaming(PropertyNamingStrategy.class)
public class FindRequest {
    private boolean id;
    private boolean account;
    private boolean nickname;
    private boolean score;
    private boolean ranking;
    private boolean create_at;
    private boolean update_at;

    public UserResponse toResponse(User user){
        UserResponse response = new UserResponse();
        if (!this.isId() && user.getId() != null) response.setId(user.getId());
        if (!this.isAccount() && user.getAccount() != null) response.setAccount(user.getAccount());
        if (!this.isNickname() && user.getNickname() != null) response.setNickname(user.getNickname());
        if (!this.isScore() && user.getScore() != null) response.setScore(user.getScore());
        if (!this.isRanking() && user.getRanking() != null) response.setRanking(user.getRanking());
        if (!this.isCreate_at() && user.getCreateAt() != null) response.setCreateAt(user.getCreateAt());
        if (!this.isUpdate_at() && user.getUpdateAt() != null) response.setUpdateAt(user.getUpdateAt());
        return  response;
    }
}
