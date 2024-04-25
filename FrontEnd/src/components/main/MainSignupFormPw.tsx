import styles from '@/styles/main/MainLoginForm.module.css';
import { MainSignupFormPasswordProps } from '@/types/user';

const MainSignupFormPw = ({ password, onPasswordHandler }: MainSignupFormPasswordProps) => {
  return (
    <>
      <div className={styles.Mgb}>
        <label className={styles.Label} htmlFor="password">
          pw
        </label>
        <input
          className={styles.InputBox}
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={onPasswordHandler}
        />
      </div>
    </>
  );
};

export default MainSignupFormPw;
