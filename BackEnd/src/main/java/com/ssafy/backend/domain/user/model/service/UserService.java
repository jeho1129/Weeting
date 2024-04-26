package com.ssafy.backend.domain.user.model.service;

import com.ssafy.backend.domain.user.model.dto.request.*;
import com.ssafy.backend.domain.user.model.dto.response.UserResponse;
import com.ssafy.backend.domain.user.model.entity.User;

public interface UserService {
    void registUser(UserRegistRequest userRegistRequest);
    UserResponse infoUser(FindRequest findRequest, User user);
    void updateUser(UserUpdateRequest userUpdateRequest, User user);

    boolean checkUserIdExists(String account);

    boolean checkNicknameExists(String nickname);

}
