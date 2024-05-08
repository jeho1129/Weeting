package com.ssafy.backend.domain.chat.repository;

import com.ssafy.backend.domain.chat.document.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatRepository extends MongoRepository<Chat, Long> {

    List<Chat> findByRoomId(Long roomId);

}
