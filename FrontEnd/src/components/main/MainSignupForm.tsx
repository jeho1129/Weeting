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

  const idCheckHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // id 중복확인 api call
    console.log('hi');
  };

  const nicknameCheckHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // nickname 중복확인 api call
    console.log('bye');
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
          <button onClick={idCheckHandler}>중복 확인</button>
        </div>
        <div>이미 존재하는 아이디 입니다</div>
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
          <button onClick={nicknameCheckHandler}>중복 확인</button>
        </div>
        <div>이미 존재하는 닉네임 입니다</div>
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
        <div className={styles.Mgb}>
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
        <div>비밀번호가 일치하지 않습니다.</div>
        <button className={`${styles.Btn} ${styles.BtnTop}`}>가입</button>
      </form>
    </div>
  );
};

export default MainSignupForm;
