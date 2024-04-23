package com.ssafy.backend.user.model.service;

import com.ssafy.backend.user.model.dto.request.FindRequest;
import com.ssafy.backend.user.model.dto.request.UserRegistRequest;
import com.ssafy.backend.user.model.dto.request.UserUpdateRequest;
import com.ssafy.backend.user.model.dto.response.UserResponse;
import com.ssafy.backend.user.model.entity.User;

public interface UserService {
    void registUser(UserRegistRequest userRegistRequest);
    UserResponse infoUser(FindRequest findRequest, User user);
    void updateUser(UserUpdateRequest userUpdateRequest, User user);
}
