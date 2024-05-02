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
    private boolean id = true;
    private boolean account = true;
    private boolean nickname = true;
    private boolean score = true;
    private boolean ranking = true;
    private boolean create_at = true;
    private boolean update_at = true;

    public UserResponse toResponse(User user){
        UserResponse response = new UserResponse();
        if (this.isId()) response.setId(user.getId());
        if (this.isAccount()) response.setAccount(user.getAccount());
        if (this.isNickname()) response.setNickname(user.getNickname());
        if (this.isScore()) response.setScore(user.getScore());
        if (this.isRanking()) response.setRanking(user.getRanking());
        if (this.isCreate_at()) response.setCreateAt(user.getCreateAt());
        if (this.isUpdate_at()) response.setUpdateAt(user.getUpdateAt());
        return  response;
    }
}
