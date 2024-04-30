import styles from '@/styles/game/GameWaitingChattingForm.module.css';
import { useState } from 'react';

interface GameChattingFormProps {
  onSendMessage: (message: string) => void;
}

const GameChattingForm = ({ onSendMessage }: GameChattingFormProps) => {
  const [message, setMessage] = useState('');

  const onChatHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) { // 메시지가 비어있지 않은 경우에만 전송
      onSendMessage(message); // 부모 컴포넌트의 메시지 전송 함수 호출
      setMessage(''); // 메시지 전송 후 입력 필드 초기화
    }
  };

  return (
    <div className={styles.Align}>
      <form onSubmit={submitHandler}>
        <div className={styles.Mgb}>
          <input
            className={styles.InputBox}
            id="text"
            type="text"
            placeholder="메세지를 입력해주세요"
            value={message} // input에 message 상태를 value로 설정
            onChange={onChatHandler}
          />
          <button className={styles.Btn}>확인</button>
        </div>
      </form>
    </div>
  );
};

export default GameChattingForm;
