package com.ssafy.backend.domain.Outfit.repository;

import com.ssafy.backend.domain.Outfit.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    List<Inventory> findByUser_Id(Long userID);

}