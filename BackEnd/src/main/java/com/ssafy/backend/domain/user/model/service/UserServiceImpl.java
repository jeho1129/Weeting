package com.ssafy.backend.domain.user.model.service;

import com.ssafy.backend.domain.Outfit.entity.Inventory;
import com.ssafy.backend.domain.Outfit.entity.Outfit;
import com.ssafy.backend.domain.Outfit.repository.InventoryRepository;
import com.ssafy.backend.domain.Outfit.repository.OutfitRepository;
import com.ssafy.backend.domain.user.exception.UserException;
import com.ssafy.backend.domain.user.model.dto.request.FindRequest;
import com.ssafy.backend.domain.user.model.dto.request.UserRegistRequest;
import com.ssafy.backend.domain.user.model.dto.request.UserUpdateRequest;
import com.ssafy.backend.domain.user.model.dto.response.UserRankingResponse;
import com.ssafy.backend.domain.user.model.entity.User;
import com.ssafy.backend.domain.user.model.repository.UserRepository;
import com.ssafy.backend.domain.user.exception.UserErrorCode;
import com.ssafy.backend.domain.user.model.dto.response.UserResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service("userService")
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final OutfitRepository outfitRepository;
    private final InventoryRepository inventoryRepository;


    @Override
    @Transactional
    public void registUser(UserRegistRequest userRegistRequest) {
        userRepository.findByAccount(userRegistRequest.getAccount()).ifPresent(value -> {
            throw new UserException(UserErrorCode.ALREADY_IN_ACCOUNT);
        });

        User createdUser = userRepository.save(userRegistRequest.createUser(passwordEncoder));

        // getCondition이 null인 모든 아이템 조회
        List<Outfit> defaultOutfits = outfitRepository.findByGetConditionIsNull();

        // 조회한 아이템을 유저의 인벤토리에 추가
        for (Outfit outfit : defaultOutfits) {
            Inventory inventory = Inventory.builder()
                    .user(createdUser)
                    .outfit(outfit)
                    .isOwned(true)
                    .build();
            inventoryRepository.save(inventory);
        }
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

    public boolean checkUserIdExists(String account) {
        return userRepository.existsByAccount(account);
    }

    public boolean checkNicknameExists(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Override
    public List<UserRankingResponse> getUserRankings() {
        List<User> users = userRepository.findAllByOrderByRankingAsc();
        return users.stream()
                .map(user -> new UserRankingResponse(user.getRanking(), user.getNickname(), user.getScore()))
                .collect(Collectors.toList());
    }
}