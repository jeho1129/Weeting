package com.ssafy.backend.domain.user.controller;

import com.ssafy.backend.domain.user.model.dto.request.FindRequest;
import com.ssafy.backend.domain.user.model.dto.request.UserRegistRequest;
import com.ssafy.backend.domain.user.model.dto.request.UserUpdateRequest;
import com.ssafy.backend.domain.user.model.service.UserService;
import com.ssafy.backend.global.utils.MessageUtils;
import com.ssafy.backend.domain.user.model.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;


    @PostMapping("/signup")
    public ResponseEntity<MessageUtils> register(@Valid @RequestBody UserRegistRequest userRegistRequest) {
        log.debug("UserRegistRequest={}", userRegistRequest.toString());
        userService.registUser(userRegistRequest);
        return ResponseEntity.ok().body(MessageUtils.success());
    }

    @GetMapping("/info")
    public ResponseEntity<MessageUtils> info(@ModelAttribute FindRequest findRequest, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok().body(MessageUtils.success(userService.infoUser(findRequest, user)));
    }

    @PatchMapping("/update")
    public ResponseEntity<MessageUtils> update(@RequestBody UserUpdateRequest request, @AuthenticationPrincipal User user) {
        log.info("user" + user);
        userService.updateUser(request, user);
        return ResponseEntity.ok().body(MessageUtils.success());
    }

}
