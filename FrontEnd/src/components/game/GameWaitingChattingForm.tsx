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
