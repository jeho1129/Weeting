package com.ssafy.backend.domain.user.model.service;

import com.ssafy.backend.domain.Outfit.entity.Inventory;
import com.ssafy.backend.domain.Outfit.entity.Outfit;
import com.ssafy.backend.domain.Outfit.repository.InventoryRepository;
import com.ssafy.backend.domain.Outfit.repository.OutfitRepository;
import com.ssafy.backend.domain.user.model.entity.User;
import com.ssafy.backend.domain.user.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class RankScheduler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OutfitRepository outfitRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Scheduled(cron = "0 0 * * * ?")
    @Transactional
    public void updateRankings() {
        List<User> users = userRepository.findAllByOrderByScoreDesc();
        int rank = 1;
        int prevScore = -1;

        for (User user : users) {
            if (user.getScore() != prevScore) {
                rank = users.indexOf(user) + 1;
                prevScore = user.getScore();
            }
            user.setRanking(rank);

            // 사용자의 현재 인벤토리 아이템 조회
            List<Long> userOutfitIds = inventoryRepository.findByUser_Id(user.getId())
                    .stream()
                    .map(inventory -> inventory.getOutfit().getOutfitId())
                    .toList();

            // 랭킹에 따라 획득 가능한 아이템 조회
            int finalRank = rank;
            List<Outfit> availableOutfits = outfitRepository.findAll().stream()
                    .filter(outfit -> outfit.getGetCondition() != null && finalRank <= outfit.getGetCondition())
                    .toList();

            // 사용자가 소유하지 않은 아이템만 필터링
            List<Outfit> newOutfits = availableOutfits.stream()
                    .filter(outfit -> !userOutfitIds.contains(outfit.getOutfitId()))
                    .toList();

            // 새로운 아이템을 사용자의 인벤토리에 추가
            for (Outfit outfit : newOutfits) {
                Inventory inventory = Inventory.builder()
                        .user(user)
                        .outfit(outfit)
                        .isOwned(true)
                        .build();
                inventoryRepository.save(inventory);
            }
        }
        userRepository.saveAll(users);
    }
}