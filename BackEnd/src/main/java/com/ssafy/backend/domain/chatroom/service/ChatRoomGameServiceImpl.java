package com.ssafy.backend.domain.chatroom.service;

import com.ssafy.backend.domain.chatroom.dto.ChatRoomDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomGameResultDto;
import com.ssafy.backend.domain.chatroom.dto.ChatRoomUserInfo;
import com.ssafy.backend.domain.chatroom.entity.Theme;
import com.ssafy.backend.domain.user.exception.UserErrorCode;
import com.ssafy.backend.domain.user.exception.UserException;
import com.ssafy.backend.domain.user.model.entity.User;
import com.ssafy.backend.domain.user.model.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Random;

import static com.ssafy.backend.domain.chatroom.entity.Word.getRandomForbiddenWord;

@Service
@RequiredArgsConstructor
public class ChatRoomGameServiceImpl implements ChatRoomGameService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final UserRepository userRepository;




    @Override
    public Boolean readyStatusTrans(String chatRoomId,
                                 User user) {
        System.out.println("ready !");
        String key = "chatRoom:" + chatRoomId;

        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);
        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다 ㅠㅠ");
        }

        Boolean userReadyStatus = null;

        for (ChatRoomUserInfo userInfo : roomInfo.getRoomUsers()) {
            if (userInfo.getId().equals(user.getId())) {
                userReadyStatus = userInfo.getReady();

                userInfo.setReady(!userReadyStatus);

                redisTemplate.opsForValue().set(key, roomInfo);

                break;
            }
        }

        return !userReadyStatus;
    }


    @Override
    public String grilledChicken(String chatRoomId,
                               User user) {
        String key = "chatRoom:" + chatRoomId;
        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);

        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다.");
        }

        for (ChatRoomUserInfo userInfo : roomInfo.getRoomUsers()) {
            if (userInfo.getId().equals(user.getId())) {
                userInfo.setIsAlive(LocalDateTime.now().toString());
                redisTemplate.opsForValue().set(key, roomInfo);
                return userInfo.getIsAlive();
            }
        }

        return "";
    }


    @Override
    public List<ChatRoomGameResultDto> gameResult(String chatRoomId) {
        String key = "chatRoom:" + chatRoomId;
        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);

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

        int[] scoreAdjustments = getScoreAdjustments(results.size());
        for (int i = 0; i < results.size(); i++) {
            ChatRoomGameResultDto result = results.get(i);
            updatePlayerScore(result.getId(), scoreAdjustments[i]);
        }

        return results;
    }


    @Override
    public void gameInitialize(String chatRoomId) {
        String key = "chatRoom:" + chatRoomId;

        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);

        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다.");
        }

        for (ChatRoomUserInfo userInfo : roomInfo.getRoomUsers()) {
            userInfo.setReady(false);
            userInfo.setWord("");
            userInfo.setScore(0.0F);
            userInfo.setIsAlive("");
        }

        roomInfo.setRoomTheme(null);
        roomInfo.setRoomForbiddenTime(null);
        roomInfo.setRoomEndTime(null);
        roomInfo.setRoomStatus(ChatRoomDto.RoomStatus.waiting);

        redisTemplate.opsForValue().set(key, roomInfo);
    }







    @Override
    public String forbiddenWordSetting(String chatRoomId,
                                     User user,
                                     String word) {
        String key = "chatRoom:" + chatRoomId;
        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);

        if (roomInfo == null) {
            throw new IllegalStateException("채팅방 정보를 불러올 수 없습니다.");
        }

        List<ChatRoomUserInfo> users = roomInfo.getRoomUsers();
        int index = -1;

        // 유저 ID를 찾아 인덱스를 가져온다.
        for (int i = 0; i < users.size(); i++) {
            if (users.get(i).getId().equals(user.getId())) {
                index = i;
                break;
            }
        }

        if (index == -1) {
            throw new IllegalStateException("유저가 채팅방에 존재하지 않습니다.");
        }

        // 타유저에게 금칙어 할당
        int nextIndex = (index + 1) % users.size();

        if (word.isEmpty()) {
            word = getRandomForbiddenWord();
        }


        redisTemplate.opsForValue().set(key, roomInfo);

        return "[" + users.get(nextIndex).getNickname() + "]에게 금지어 할당 : " + word;

    }


    @Override
    public void themeSetting(String chatRoomId) {
        String key = "chatRoom:" + chatRoomId;
        ChatRoomDto roomInfo = (ChatRoomDto) redisTemplate.opsForValue().get(key);

        Theme[] themes = Theme.values();
        Random random = new Random();

        Theme randomTheme = themes[random.nextInt(themes.length)];

        roomInfo.setRoomTheme(randomTheme);

        redisTemplate.opsForValue().set(key, roomInfo);

        System.out.println("랜덤으로 선택된 Theme : " + randomTheme);

    }








    @Override
    public void updatePlayerScore(Long userId, int scoreAdjustment) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_USER));
        int newScore = user.getScore() + scoreAdjustment;
        user.setScore(newScore);
        userRepository.save(user);
        updateRankings();
    }


    @Override
    public int[] getScoreAdjustments(int numberOfPlayers) {
        int[] scoreAdjustments = new int[numberOfPlayers];
        for (int i = 0; i < numberOfPlayers; i++) {
            scoreAdjustments[i] = (numberOfPlayers - 1) - (2 * i);
        }
        return scoreAdjustments;
    }


    @Override
    public void updateRankings() {
        List<User> allUsers = userRepository.findAll(Sort.by(Sort.Direction.DESC, "score"));
        int currentRank = 1;
        int usersAtThisRank = 0;
        int lastScore = Integer.MIN_VALUE;

        for (User user : allUsers) {
            if (user.getScore() != lastScore) {
                currentRank += usersAtThisRank;
                usersAtThisRank = 0;
            }
            user.setRanking(currentRank);
            lastScore = user.getScore();
            usersAtThisRank++;
        }
        userRepository.saveAll(allUsers);
    }


}
