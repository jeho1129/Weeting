package com.ssafy.backend.global.component;


import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomUserInfo;
import com.ssafy.backend.domain.chatroom.entity.Theme;
import com.ssafy.backend.domain.chatroom.service.ChatRoomGameService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.Set;

@RequiredArgsConstructor
public class RoomStatusScheduler {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ChatRoomGameService chatRoomGameService;
    private final TaskScheduler taskScheduler;


    // 1초마다 실행
    @Scheduled(fixedRate = 1000)
    public void checkAndModifyRoomStatuses() {
        Set<String> chatRoomIds = redisTemplate.keys("chatRoom:*");
        for (String chatRoomId : chatRoomIds) {
            roomStatusModify(chatRoomId);
        }
    }


    // 로직
    public void roomStatusModify(String chatRoomId) {
        String key = "chatRoom:" + chatRoomId;

        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);

        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다 ㅠㅠ");
        }

        ChatRoomDto.RoomStatus currentStatus = roomInfo.getRoomStatus();

        switch (currentStatus) {
            case waiting:
                ChatRoomDto currentRoomInfo1 = (ChatRoomDto) redisTemplate.opsForValue().get(key);

                boolean allReady = currentRoomInfo1.getRoomUsers().stream()
                        .skip(1)
                        .allMatch(ChatRoomUserInfo::getReady);

                if (allReady) {
                    currentRoomInfo1.setRoomStatus(ChatRoomDto.RoomStatus.allready);
                    redisTemplate.opsForValue().set(key, currentRoomInfo1);
                }

                break;

            case wordsetting:
                ChatRoomDto currentRoomInfo2 = (ChatRoomDto) redisTemplate.opsForValue().get(key);

                // 30초 후에 아래 로직 실행
                taskScheduler.schedule(() -> {

                    currentRoomInfo2.setRoomStatus(ChatRoomDto.RoomStatus.wordfinish);
                    redisTemplate.opsForValue().set(key, currentRoomInfo2);

                }, new Date(System.currentTimeMillis() + 30000));  // [ms]

                break;

            case wordfinish:
                ChatRoomDto currentRoomInfo3 = (ChatRoomDto) redisTemplate.opsForValue().get(key);

                // 10초 후에 아래 로직 실행
                taskScheduler.schedule(() -> {

                    Theme[] themes = Theme.values();
                    Theme randomTheme = themes[new Random().nextInt(themes.length)];
                    currentRoomInfo3.setRoomTheme(randomTheme);

                    currentRoomInfo3.setRoomEndTime(LocalDateTime.now().plusSeconds(240));

                    currentRoomInfo3.setRoomStatus(ChatRoomDto.RoomStatus.start);
                    redisTemplate.opsForValue().set(key, currentRoomInfo3);

                }, new Date(System.currentTimeMillis() + 10000));  // [ms]

                break;

            case start:
                ChatRoomDto currentRoomInfo4 = (ChatRoomDto) redisTemplate.opsForValue().get(key);
                List<ChatRoomUserInfo> users = currentRoomInfo4.getRoomUsers();

                long aliveCount = users.stream()
                        .filter(user -> "true".equalsIgnoreCase(user.getIsAlive()))
                        .count();



                // 1명을 제외하고 모두 사망했는지 확인
                if (aliveCount <= 1) {
                    // 즉시 상태 변경
                    currentRoomInfo4.setRoomEndTime(LocalDateTime.now());

                    currentRoomInfo4.setRoomStatus(ChatRoomDto.RoomStatus.end);
                    redisTemplate.opsForValue().set(key, currentRoomInfo4);
                } else {
                    // 240초 후에 상태 변경
                    taskScheduler.schedule(() -> {

                        currentRoomInfo4.setRoomStatus(ChatRoomDto.RoomStatus.end);
                        redisTemplate.opsForValue().set(key, currentRoomInfo4);

                    }, new Date(System.currentTimeMillis() + 240000));  // [ms]
                }

                break;

            case end:
                ChatRoomDto currentRoomInfo5 = (ChatRoomDto) redisTemplate.opsForValue().get(key);

                // 10초 후에 아래 로직 실행
                taskScheduler.schedule(() -> {

                    chatRoomGameService.gameInitialize(chatRoomId);

                    currentRoomInfo5.setRoomStatus(ChatRoomDto.RoomStatus.waiting);
                    redisTemplate.opsForValue().set(key, currentRoomInfo5);
                }, new Date(System.currentTimeMillis() + 10000));  // [ms]

                break;

            default:
                throw new IllegalStateException("방 상태 변경 중 에러 발생 !");
        }

    }



}
