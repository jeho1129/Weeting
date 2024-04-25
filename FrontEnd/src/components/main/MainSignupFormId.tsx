import styles from '@/styles/main/MainLoginForm.module.css';
import { MainSignupFormIdProps } from '@/types/user';

const MainSignupFormId = ({ id, onIdHandler }: MainSignupFormIdProps) => {
  const idCheckHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // id 중복확인 api call
    console.log('id 중복확인 api call');
  };

  return (
    <>
      <div className={styles.Mgb}>
        <label className={styles.Label} htmlFor="id">
          id
        </label>
        <input
          className={styles.InputBox}
          id="id"
          type="text"
          placeholder="아이디를 입력하세요"
          value={id}
          onChange={onIdHandler}
        />
        <button onClick={idCheckHandler} className={styles.checkBtn}>중복 확인</button>
      </div>
      <div className={styles.Container}>
        <div className={styles.Label}></div>
        <div className={styles.Mgl}>이미 존재하는 아이디 입니다</div>
      </div>
    </>
  );
};

export default MainSignupFormId;
