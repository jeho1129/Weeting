package com.ssafy.backend.user.controller;

import com.ssafy.backend.global.utils.MessageUtils;
import com.ssafy.backend.user.model.dto.request.UserRegistRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    @GetMapping("/dummy")
    public String dummy() {
        return "{}";
    }

    @PostMapping("/regist")
    public ResponseEntity<MessageUtils> register(@Valid @RequestBody UserRegistRequest userRegistRequest) {
        log.debug("UserRegistRequest={}", userRegistRequest.toString());

    }

}
