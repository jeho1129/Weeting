package com.ssafy.backend.domain.chatroom.service;

import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomGameResultDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomUserInfo;
import com.ssafy.backend.domain.user.model.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class ChatRoomGameServiceImpl implements ChatRoomGameService {

    private final RedisTemplate<String, Object> redisTemplate;
    private ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(10); // 스레드 풀 크기 설정


    private void scheduleTask(String chatRoomId, ChatRoomDto.RoomStatus newStatus, long delay, TimeUnit unit) {
        scheduler.schedule(() -> {
            ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(chatRoomId);
            if (roomInfo != null) {
                roomInfo.setRoomStatus(newStatus);
                String key = "chatRoom:" + roomInfo.getRoomId();
                redisTemplate.opsForValue().set(key, roomInfo);
            }
        }, delay, unit);
    }


    @Override
    public LocalTime roomStatusModify(String chatRoomId) {
        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(chatRoomId);

        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다 ㅠㅠ");
        }

        ChatRoomDto.RoomStatus currentStatus = roomInfo.getRoomStatus();
        LocalTime currentTime = LocalTime.now();
        LocalTime futureTime = null;

        switch (currentStatus) {
            case waiting:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.allready);
                break;
            case allready:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.wordsetting);
                break;
            case wordsetting:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.wordfinish);
                futureTime = currentTime.plusSeconds(30);
                break;
            case wordfinish:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.start);
                break;
            case start:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.end);
                futureTime = currentTime.plusSeconds(240);
                break;
            case end:
                roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.waiting);
                break;
            default:
                throw new IllegalStateException("방 상태 변경 중 에러 발생 !");
        }

        redisTemplate.opsForValue().set(chatRoomId, roomInfo);
        if (currentStatus == ChatRoomDto.RoomStatus.wordsetting || currentStatus == ChatRoomDto.RoomStatus.start) {
            return futureTime;
        } else {
            return currentTime;
        }
    }


    @Override
    public void readyStatusTrans(String chatRoomId,
                                 User user) {
        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(chatRoomId);
        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다 ㅠㅠ");
        }

        for (ChatRoomUserInfo userInfo : roomInfo.getRoomUsers()) {
            if (userInfo.getId().equals(user.getId())) {
                Boolean userReadyStatus = userInfo.getReady();

                userInfo.setReady(!userReadyStatus);

                String key = "chatRoom:" + roomInfo.getRoomId();
                redisTemplate.opsForValue().set(key, roomInfo);

                break;
            }
        }
    }

    @Override
    public List<ChatRoomGameResultDto> gameResult(String chatRoomId) {
        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(chatRoomId);

        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다.");
        }

        List<ChatRoomGameResultDto> results = new ArrayList<>();

        for (ChatRoomUserInfo userInfo : roomInfo.getRoomUsers()) {
            redisTemplate.delete("similar:" + userInfo.getNickname());
            redisTemplate.delete("forbidden:" + userInfo.getNickname());

            ChatRoomGameResultDto resultDto = ChatRoomGameResultDto.builder()
                    .id(userInfo.getId())
                    .nickname(userInfo.getNickname())
                    .score(userInfo.getScore())
                    .isAlive(userInfo.getIsAlive())
                    .build();
            results.add(resultDto);
        }

        results.sort(Comparator.comparing(ChatRoomGameResultDto::getIsAlive).reversed()
                .thenComparing(Comparator.comparing(ChatRoomGameResultDto::getScore).reversed()));

        return results;
    }


    @Override
    public void gameInitialize(String chatRoomId) {
        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(chatRoomId);

        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다.");
        }

        for (ChatRoomUserInfo userInfo : roomInfo.getRoomUsers()) {
            userInfo.setReady(false);
            userInfo.setWord("");
            userInfo.setScore(0.0F);
            userInfo.setIsAlive(true);
        }

        String key = "chatRoom:" + roomInfo.getRoomId();
        redisTemplate.opsForValue().set(key, roomInfo);
    }


    public void forbiddenWordSetting(String chatRoomId, User user) {

    }




}
