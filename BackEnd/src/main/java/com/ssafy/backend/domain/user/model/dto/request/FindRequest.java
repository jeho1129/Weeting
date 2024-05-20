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
    private Boolean id= true;
    private Boolean account= true;
    private Boolean nickname= true;
    private Boolean score= true;
    private Boolean ranking= true;
    private Boolean create_at= true;
    private Boolean update_at = true;

    public UserResponse toResponse(User user){
        UserResponse response = new UserResponse();
        if (Boolean.TRUE.equals(this.getId())) response.setId(user.getId());
        if (Boolean.TRUE.equals(this.getAccount())) response.setAccount(user.getAccount());
        if (Boolean.TRUE.equals(this.getNickname())) response.setNickname(user.getNickname());
        if (Boolean.TRUE.equals(this.getScore())) response.setScore(user.getScore());
        if (Boolean.TRUE.equals(this.getRanking())) {
            response.setRanking(user.getRanking() != null ? user.getRanking() : 0);
        }
        if (Boolean.TRUE.equals(this.getCreate_at())) response.setCreateAt(user.getCreateAt());
        if (Boolean.TRUE.equals(this.getUpdate_at())) response.setUpdateAt(user.getUpdateAt());
        return response;
    }
}
