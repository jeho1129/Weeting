import styles from '@/styles/main/MainLoginForm.module.css';
import { MainSignupFormPasswordCheckProps } from '@/types/user';

const MainSignupFormPwCheck = ({
  password,
  passwordCheck,
  onPasswordCheckHandler,
}: MainSignupFormPasswordCheckProps) => {
  const isPasswordMatch = () => {
    return passwordCheck === password; // 비밀번호와 비밀번호 재확인이 일치하는지 확인
  };

  return (
    <>
      <div className={styles.Mgb}>
        <label className={`${styles.Label} FontM20`} htmlFor="passwordCheck">
          pw check
        </label>
        <input
          className={`${styles.InputBox} FontM20`}
          id="passwordCheck"
          type="password"
          placeholder="비밀번호 재확인"
          value={passwordCheck}
          onChange={onPasswordCheckHandler}
        />
      </div>
      {!isPasswordMatch() ? (
        <div className={styles.Container}>
          <div className={styles.Label}></div>
          <div className={`${styles.SignupAlertText} FontM20`}>비밀번호가 일치하지 않습니다</div>
        </div>
      ) : (
        <div className={styles.BeforeContainer}>
          <div className={styles.Label}></div>
        </div>
      )}
    </>
  );
};

export default MainSignupFormPwCheck;
