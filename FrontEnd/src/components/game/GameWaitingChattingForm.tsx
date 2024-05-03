import { gameState, userState } from '@/recoil/atom';
import styles from '@/styles/game/GameWaitingChattingForm.module.css';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

interface GameChattingFormProps {
  onSendMessage: (message: string) => void;
}

const GameChattingForm = ({ onSendMessage }: GameChattingFormProps) => {
  const [message, setMessage] = useState('');
  const userInfo = useRecoilValue(userState);
  const gameInfo = useRecoilValue(gameState);
  const setGameInfo = useSetRecoilState(gameState);
  const ingameUerInfo = gameInfo.roomUsers.filter((user) => user.userId === userInfo.userId)[0];

  const onChatHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameInfo.roomStatus === 'start' && message.indexOf(ingameUerInfo.word!) !== -1) {
      setGameInfo({
        roomMode: gameInfo.roomMode,
        roomId: gameInfo.roomId,
        roomName: gameInfo.roomName,
        roomStatus: gameInfo.roomStatus,
        roomForbiddentime: gameInfo.roomForbiddentime,
        roomEndtime: gameInfo.roomEndtime,
        roomSubject: gameInfo.roomSubject,
        roomMaxCnt: gameInfo.roomMaxCnt,
        roomUsers: gameInfo.roomUsers.map((user) =>
          user.userId === userInfo.userId
            ? {
                userId: ingameUerInfo.userId,
                nickname: ingameUerInfo.nickname,
                outfit: ingameUerInfo.outfit,
                ready: ingameUerInfo.ready,
                word: ingameUerInfo.word,
                score: ingameUerInfo.score,
                isAlive: false,
              }
            : user,
        ),
      });
    }

    if (message.trim()) {
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
            value={message} // input에 message 상태를 value로 설정
            onChange={onChatHandler}
          />
          <button className={`FontM20 ${styles.Btn}`}>확인</button>
        </div>
      </form>
    </div>
  );
};

export default GameChattingForm;
