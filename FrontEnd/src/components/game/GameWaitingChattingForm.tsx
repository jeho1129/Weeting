import styles from '@/styles/game/GameWaitingChattingForm.module.css';
import { useState } from 'react';
// import { getCookie, setCookie } from 'axios';

const GameChattingForm = () => {
  const [id, setId] = useState('');

  const onChatHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // setCookie('accessToken', 'true', { path: '/' });
    // const accessToken = getCookie('accessToken');
    // console.log('accessToken:', accessToken);
    console.log('id :', id);
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
            onChange={onChatHandler}
          />
          <button className={styles.Btn}>확인</button>
        </div>
      </form>
    </div>
  );
};

export default GameChattingForm;
