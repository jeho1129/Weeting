import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '@/recoil/atom';

import styles from '@/styles/game/GameWaitingChattingForm.module.css';

import { RoomInfo } from '@/types/game';
import { gameOverApi } from '@/services/gameApi';
import { IngameUser } from '@/types/user';

const GameChattingForm = ({
  roomInfo,
  ingameUserInfo,
  webSocketScore,
  onSendMessage,
}: {
  roomInfo: RoomInfo;
  ingameUserInfo: IngameUser;
  webSocketScore: WebSocket | null;
  onSendMessage: (conent: string) => void;
}) => {
  const userInfo = useRecoilValue(userState);
  const [message, setMessage] = useState('');

  // 마지막으로 채팅 입력한 시간
  const [lastMessageTime, setLastMessageTime] = useState<Date | null>(null);

  // 채팅 메세지 입력
  const onChatHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    setLastMessageTime(new Date()); // 메세지 입력 시 현재 시간을 업데이트
  };

  // 안쓰면 죽음
  useEffect(() => {
    if (roomInfo.roomStatus === 'start') {
      const timer = setTimeout(() => {
        if (lastMessageTime && new Date().getTime() - lastMessageTime.getTime() >= 15000) {
          gameOverApi(roomInfo.roomId);
        }
      }, 150000); // 15초 후에 실행됩니다.

      // 컴포넌트가 언마운트되거나 lastMessageTime이 업데이트될 때 타이머를 클리어합니다.
      return () => clearTimeout(timer);
    }
    // 의존성 배열에 roomInfo.roomStatus를 추가합니다. 이렇게 하면 roomInfo.roomStatus가 변할 때마다 useEffect가 다시 실행됩니다.
  }, [lastMessageTime, roomInfo.roomStatus]);

  // 입력 함수
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim()) {
      // 인게임 상태라면
      if (webSocketScore && webSocketScore.readyState === WebSocket.OPEN && roomInfo.roomStatus === 'start') {
        if (message.indexOf(ingameUserInfo.word!) !== -1) {
          gameOverApi(roomInfo.roomId);
        }
        webSocketScore.send(JSON.stringify({ nickname: userInfo.nickname, content: message }));
      }
      // 그외
      onSendMessage(message); // 부모 컴포넌트의 메시지 전송 함수 호출
      setMessage('');
    }
  };

  return (
    <div className={`FontM20 ${styles.Align}`}>
      <form onSubmit={submitHandler}>
        <div className={styles.Mgb}>
          <input
            className={`FontM20 ${styles.InputBox}`}
            id="text"
            type="text"
            placeholder="메세지를 입력해주세요"
            value={message}
            onChange={onChatHandler}
            maxLength={20}
            autoComplete="off"
          />
          <button className={`FontM20 ${styles.Btn}`}>확인</button>
        </div>
      </form>
    </div>
  );
};

export default GameChattingForm;
