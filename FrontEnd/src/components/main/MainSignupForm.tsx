import styles from '@/styles/main/MainLoginForm.module.css';
import { useState } from 'react';

const MainSignupForm = () => {
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const onIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onNicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onPasswordCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('id :', id);
    console.log('nickname :', nickname);
    console.log('password :', password);
    console.log('passwordCheck :', passwordCheck);
  };

  return (
    <div className={styles.Align}>
      <form onSubmit={submitHandler}>
        <div className={styles.Mgb}>
          <label className={styles.Label} htmlFor="id">
            id
          </label>
          <input
            className={styles.InputBox}
            id="id"
            type="text"
            placeholder="아이디를 입력하세요"
            onChange={onIdHandler}
          />
        </div>
        <div className={styles.Mgb}>
          <label className={styles.Label} htmlFor="nickname">
            nickname
          </label>
          <input
            className={styles.InputBox}
            id="nickname"
            type="text"
            placeholder="닉네임을 입력하세요"
            onChange={onNicknameHandler}
          />
        </div>
        <div className={styles.Mgb}>
          <label className={styles.Label2} htmlFor="password">
            pw
          </label>
          <input
            className={styles.InputBox}
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={onPasswordHandler}
          />
        </div>
        <div className={styles.Mgb2}>
          <label className={styles.Label2} htmlFor="passwordCheck">
            pw check
          </label>
          <input
            className={styles.InputBox}
            id="passwordCheck"
            type="password"
            placeholder="비밀번호 재확인"
            onChange={onPasswordCheckHandler}
          />
        </div>
        <button className={styles.Btn}>확인</button>
      </form>
    </div>
  );
};

export default MainSignupForm;
