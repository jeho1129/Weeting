package com.ssafy.backend.domain.user.model.repository;

import com.ssafy.backend.domain.user.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByAccount(String Account);
    boolean existsByAccount(String account);
    boolean existsByNickname(String nickname);

    List<User> findAllByOrderByScoreDesc();

    List<User> findAllByOrderByRankingAsc();

}
