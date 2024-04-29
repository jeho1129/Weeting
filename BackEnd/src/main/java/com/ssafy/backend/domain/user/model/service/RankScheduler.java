package com.ssafy.backend.domain.user.model.service;

import com.ssafy.backend.domain.user.model.entity.User;
import com.ssafy.backend.domain.user.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class RankScheduler {

    @Autowired
    private UserRepository userRepository;

    @Scheduled(cron = "0 0 * * * ?")
    @Transactional
    public void updateRankings() {
        List<User> users = userRepository.findAllByOrderByScoreDesc();
        for (int i = 0; i < users.size(); i++) {
            users.get(i).setRanking(i + 1);
        }
        userRepository.saveAll(users);
    }
}