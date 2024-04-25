package com.ssafy.backend.domain.Outfit.repository;

import com.ssafy.backend.domain.Outfit.entity.Outfit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OutfitRepository extends JpaRepository<Outfit, Long> {
    // 추가적인 쿼리 메서드 작성 가능
}
