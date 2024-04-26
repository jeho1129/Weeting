import styles from '@/styles/main/MainLoginForm.module.css';
import { MainSignupFormNicknameProps } from '@/types/user';

const MainSignupFormNickname = ({ nickname, onNicknameHandler }: MainSignupFormNicknameProps) => {
  const nickNameCheckHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // nickname 중복확인 api call
    console.log('nickname 중복확인 api call');
  };

  return (
    <>
      <div className={styles.Mgb}>
        <label className={styles.Label} htmlFor="nickname">
          nickname
        </label>
        <input
          className={styles.InputBox}
          id="nickname"
          type="text"
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={onNicknameHandler}
        />
        <button onClick={nickNameCheckHandler} className={styles.checkBtn}>중복 확인</button>
      </div>
      <div className={styles.Container}>
        <div className={styles.Label}></div>
        <div className={styles.Mgl}>이미 존재하는 닉네임 입니다</div>
      </div>
    </>
  );
};

export default MainSignupFormNickname;
