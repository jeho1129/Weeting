package com.ssafy.backend.domain.user.model.service;

import com.ssafy.backend.domain.user.exception.UserException;
import com.ssafy.backend.domain.user.model.dto.request.FindRequest;
import com.ssafy.backend.domain.user.model.dto.request.UserRegistRequest;
import com.ssafy.backend.domain.user.model.dto.request.UserUpdateRequest;
import com.ssafy.backend.domain.user.model.entity.User;
import com.ssafy.backend.domain.user.model.repository.UserRepository;
import com.ssafy.backend.domain.user.exception.UserErrorCode;
import com.ssafy.backend.domain.user.model.dto.response.UserResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service("userService")
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public void registUser(UserRegistRequest userRegistRequest) {
        userRepository.findByAccount(userRegistRequest.getAccount()).ifPresent(value -> {
            throw new UserException(UserErrorCode.ALREADY_IN_ACCOUNT);
        });
        userRepository.save(userRegistRequest.createUser(passwordEncoder));
    }

    @Override
    public UserResponse infoUser(FindRequest findRequest, User user) {
        return findRequest.toResponse(user);
    }

    @Override
    @Transactional
    public void updateUser(UserUpdateRequest userUpdateRequest, User user) {
        if (userUpdateRequest.getNickname() != null) user.setNickname(userUpdateRequest.getNickname());
        userRepository.save(user);
    }
}
