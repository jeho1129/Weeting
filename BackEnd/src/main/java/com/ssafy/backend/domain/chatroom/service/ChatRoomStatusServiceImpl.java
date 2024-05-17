package com.ssafy.backend.domain.chatroom.service;

import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomUserInfo;
import com.ssafy.backend.domain.chatroom.entity.Theme;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class ChatRoomStatusServiceImpl implements ChatRoomStatusService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final TaskScheduler taskScheduler;
    private final ChatRoomGameService chatRoomGameService;


    @Override
    public void gameStart(String chatRoomId) {
        String key = "chatRoom:" + chatRoomId;

        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);
        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다 ㅠㅠ");
        }

        ChatRoomDto.RoomStatus currentStatus = roomInfo.getRoomStatus();

        if (currentStatus == ChatRoomDto.RoomStatus.allready) {
            roomInfo.setRoomForbiddenTime(LocalDateTime.now().plusSeconds(30).toString());
            roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.wordsetting);
            redisTemplate.opsForValue().set(key, roomInfo);
        }
    }



    @Override
    public void gameEnd(String chatRoomId) {
        String key = "chatRoom:" + chatRoomId;

        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);
        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다 ㅠㅠ");
        }

        ChatRoomDto.RoomStatus currentStatus = roomInfo.getRoomStatus();

        if (currentStatus == ChatRoomDto.RoomStatus.end) {
            roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.waiting);
            chatRoomGameService.gameInitialize(chatRoomId);
            redisTemplate.opsForValue().set(key, roomInfo);
        }
    }


//////////////////////////////////////////////////////////////////////////////////////////////

    public void roomStatusModify(String chatRoomId) {
        String key = chatRoomId;

        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);

        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다 ㅠㅠ");
        }

        ChatRoomDto.RoomStatus currentStatus = roomInfo.getRoomStatus();


        switch (currentStatus) {
            case waiting:
                ChatRoomDto currentRoomInfo1 = (ChatRoomDto) redisTemplate.opsForValue().get(key);

                if (currentRoomInfo1.getRoomUsers().size() >= 4) {

                    boolean allReady = currentRoomInfo1.getRoomUsers().stream()
                            .skip(1)
                            .allMatch(ChatRoomUserInfo::getReady);

                    if (allReady) {
                        currentRoomInfo1.setRoomStatus(ChatRoomDto.RoomStatus.allready);
                        redisTemplate.opsForValue().set(key, currentRoomInfo1);
                    }
                }

                break;

            case wordsetting:
                ChatRoomDto currentRoomInfo2 = (ChatRoomDto) redisTemplate.opsForValue().get(key);

                if (currentRoomInfo2.getRoomStatusFlag() == false) {
                    currentRoomInfo2.setRoomStatusFlag(true);
                    redisTemplate.opsForValue().set(key, currentRoomInfo2);

                    // 15초 후에 아래 로직 실행
                    taskScheduler.schedule(() -> {

                        currentRoomInfo2.setRoomStatus(ChatRoomDto.RoomStatus.wordfinish);
                        currentRoomInfo2.setRoomStatusFlag(false);
                        redisTemplate.opsForValue().set(key, currentRoomInfo2);

                    }, new Date(System.currentTimeMillis() + 15000));  // [ms]
                }

                break;

            case wordfinish:
                ChatRoomDto currentRoomInfo3 = (ChatRoomDto) redisTemplate.opsForValue().get(key);

                if (currentRoomInfo3.getRoomStatusFlag() == false) {
                    currentRoomInfo3.setRoomStatusFlag(true);
                    redisTemplate.opsForValue().set(key, currentRoomInfo3);

                    // 10초 후에 아래 로직 실행
                    taskScheduler.schedule(() -> {

                        Theme[] themes = Theme.values();
                        Theme randomTheme = themes[new Random().nextInt(themes.length)];
                        currentRoomInfo3.setRoomTheme(randomTheme);

                        currentRoomInfo3.setRoomEndTime(LocalDateTime.now().plusSeconds(240).toString());

                        currentRoomInfo3.setRoomStatus(ChatRoomDto.RoomStatus.start);
                        currentRoomInfo3.setRoomStatusFlag(false);
                        redisTemplate.opsForValue().set(key, currentRoomInfo3);

                    }, new Date(System.currentTimeMillis() + 10000));  // [ms]
                }

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
                    currentRoomInfo4.setRoomEndTime(LocalDateTime.now().toString());

                    currentRoomInfo4.setRoomStatus(ChatRoomDto.RoomStatus.end);
                    redisTemplate.opsForValue().set(key, currentRoomInfo4);
                } else {
                    if (currentRoomInfo4.getRoomStatusFlag() == false) {
                        currentRoomInfo4.setRoomStatusFlag(true);
                        redisTemplate.opsForValue().set(key, currentRoomInfo4);

                        // 120초 후에 상태 변경
                        taskScheduler.schedule(() -> {

                            currentRoomInfo4.setRoomStatus(ChatRoomDto.RoomStatus.end);
                            currentRoomInfo4.setRoomStatusFlag(false);
                            redisTemplate.opsForValue().set(key, currentRoomInfo4);

                        }, new Date(System.currentTimeMillis() + 120000));  // [ms]
                    }
                }

                break;

            case end:
                ChatRoomDto currentRoomInfo5 = (ChatRoomDto) redisTemplate.opsForValue().get(key);

                if (currentRoomInfo5.getRoomStatusFlag() == false) {
                    currentRoomInfo5.setRoomStatusFlag(true);
                    redisTemplate.opsForValue().set(key, currentRoomInfo5);
                    // 10초 후에 아래 로직 실행
                    taskScheduler.schedule(() -> {

                        chatRoomGameService.gameInitialize(chatRoomId);

                        currentRoomInfo5.setRoomStatus(ChatRoomDto.RoomStatus.waiting);
                        currentRoomInfo5.setRoomStatusFlag(false);
                        redisTemplate.opsForValue().set(key, currentRoomInfo5);
                    }, new Date(System.currentTimeMillis() + 10000));  // [ms]

                }

                break;

            default:
                throw new IllegalStateException("방 상태 변경 중 에러 발생 !");
        }
    }


//////////////////////////////////////////////////////////////////////////////////////////////


    @Override
    public void waittingToAllready() {

    }


    @Override
    public void wordsettingToWordfinish() {

    }


    @Override
    public void wordfinishToStart() {

    }


    @Override
    public void startToEnd() {

    }


    @Override
    public void EndToWaitting() {

    }













}
