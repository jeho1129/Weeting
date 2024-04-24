import styles from '@/styles/main/MainLoginForm.module.css';
import { useState } from 'react';
import MainSignupFormId from './MainSignupFormId';
import MainSignupFormNickname from './MainSignupFormNickname';
import MainSignupFormPw from './MainSignupFormPw';
import MainSignupFormPwCheck from './MainSignupFormPwCheck';

const MainSignupForm = () => {
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const onNicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onPasswordCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };

  const onIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
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
        <MainSignupFormId id={id} onIdHandler={onIdHandler} />
        <MainSignupFormNickname nickname={nickname} onNicknameHandler={onNicknameHandler} />
        <MainSignupFormPw password={password} onPasswordHandler={onPasswordHandler} />
        <MainSignupFormPwCheck passwordCheck={passwordCheck} onPasswordCheckHandler={onPasswordCheckHandler} />
        <button className={`${styles.Btn} ${styles.BtnTop}`}>가입</button>
      </form>
    </div>
  );
};

export default MainSignupForm;
