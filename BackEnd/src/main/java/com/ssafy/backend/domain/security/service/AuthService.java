package com.ssafy.backend.domain.security.service;

import com.ssafy.backend.domain.security.dto.GeneratedToken;
import com.ssafy.backend.domain.security.exception.AuthErrorCode;
import com.ssafy.backend.domain.security.exception.AuthException;
import com.ssafy.backend.domain.user.exception.UserErrorCode;
import com.ssafy.backend.domain.user.exception.UserException;
import com.ssafy.backend.domain.user.model.entity.User;
import com.ssafy.backend.domain.user.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class AuthService {
    private final TokenService tokenService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public GeneratedToken login(String account, String password){
        User user = userRepository.findByAccount(account).orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_USER));
        if(passwordEncoder.matches(password, user.getPassword())){
            return tokenService.generatedToken(user.getId());
        }
        throw new AuthException(AuthErrorCode.NOT_EXISTS);

    }

    public void logout(User user){
        tokenService.RemoveToken(user.getId());
    }

    public GeneratedToken refresh(String refreshToken){
        return tokenService.republishToken(refreshToken);
    }


}
