import { gameState, userState } from '@/recoil/atom';
import styles from '@/styles/game/GameWaitingChattingForm.module.css';
import { MessageScore } from '@/types/game';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

interface GameChattingFormProps {
  onSendMessage: (message: string) => void;
}

const GameChattingForm = ({ onSendMessage }: GameChattingFormProps) => {
  const [message, setMessage] = useState('');
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const userInfo = useRecoilValue(userState);
  const gameInfo = useRecoilValue(gameState);
  const setGameInfo = useSetRecoilState(gameState);
  const ingameUserInfo = gameInfo.roomUsers.filter((user) => user.userId === userInfo.userId)[0];
  const [serverResponse, setServerResponse] = useState<MessageScore[]>([]);

  //배포서버에서 돌리기
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/ws');

    ws.onopen = () => {
      console.log('지호지호웹소캣가즈아');
    };
    // 서버로부터 메시지를 받는 이벤트 리스너 설정
    ws.onmessage = (score) => {
      const msg: { nickname: string; highest_simialrity: number } = JSON.parse(score.data);
      // 서버로부터 받은 메시지를 상태에 저장
      setServerResponse((prevScore) => [
        ...prevScore,
        {
          nickname: msg.nickname,
          highest_simialrity: msg.highest_simialrity,
        },
      ]);
    };

    ws.onerror = (error) => {
      console.error('웹소켓 에러 발생:', error);
    };

    setWebSocket(ws);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const onChatHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameInfo.roomStatus === 'start' && message.indexOf(ingameUserInfo.word!) !== -1) {
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
                userId: ingameUserInfo.userId,
                nickname: ingameUserInfo.nickname,
                outfit: ingameUserInfo.outfit,
                ready: ingameUserInfo.ready,
                word: ingameUserInfo.word,
                score: ingameUserInfo.score,
                isAlive: false,
              }
            : user,
        ),
      });
    }

    if (message.trim() && webSocket && webSocket.readyState === WebSocket.OPEN) {
      console.log(userInfo.nickname);
      console.log(message);

      // WebSocket을 통해 서버로 메시지 전송
      webSocket.send(JSON.stringify({ nickname: userInfo.nickname, message }));
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
          />
          <button className={`FontM20 ${styles.Btn}`}>확인</button>
        </div>
      </form>
    </div>
  );
};

export default GameChattingForm;
