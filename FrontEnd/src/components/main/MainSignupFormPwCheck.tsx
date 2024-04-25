import styles from '@/styles/main/MainLoginForm.module.css';
import { MainSignupFormPasswordCheckProps } from '@/types/user';

const MainSignupFormPwCheck = ({ passwordCheck, onPasswordCheckHandler }: MainSignupFormPasswordCheckProps) => {
  const passwordCheckHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // 비밀번호 일치확인 api call
    console.log('hi');
  };

  return (
    <>
      <div className={styles.Mgb}>
        <label className={styles.Label} htmlFor="passwordCheck">
          pw check
        </label>
        <input
          className={styles.InputBox}
          id="passwordCheck"
          type="password"
          placeholder="비밀번호 재확인"
          value={passwordCheck}
          onChange={onPasswordCheckHandler}
        />
        <button onClick={passwordCheckHandler}>비밀번호 일치 체크</button>
      </div>
      <div className={styles.Container}>
        <div className={styles.Label}></div>
        <div className={styles.Mgl}>비밀번호가 일치하지 않습니다</div>
      </div>
    </>
  );
};

export default MainSignupFormPwCheck;
