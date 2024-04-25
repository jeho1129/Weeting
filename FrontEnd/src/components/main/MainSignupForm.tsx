import { signupApi } from '@/services/userApi';
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

  const onIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onNicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 닉네임 4자 이하만 가능
    if (e.target.value.length <= 4) {
      setNickname(e.target.value);
    }
  };

  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 20) {
      setPassword(e.target.value);
    }
  };

  const onPasswordCheckHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 20) {
      setPasswordCheck(e.target.value);
    }
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    signupApi({
      account: id,
      password: password,
      nickname: nickname,
    }).then((data) => {
      console.log("data :", data);
    })

    console.log('id :', id);
    console.log('nickname :', nickname);
    console.log('password :', password);
    console.log('passwordCheck :', passwordCheck);
  };

  return (
    <div className={styles.Mgt}>
      <form onSubmit={submitHandler}>
        <MainSignupFormId id={id} onIdHandler={onIdHandler} />
        <MainSignupFormNickname nickname={nickname} onNicknameHandler={onNicknameHandler} />
        <MainSignupFormPw password={password} onPasswordHandler={onPasswordHandler} />
        <MainSignupFormPwCheck passwordCheck={passwordCheck} onPasswordCheckHandler={onPasswordCheckHandler} />
        <div className={styles.BtnAlign}>
          <button className={`${styles.SignupBtn}`}>가입</button>
        </div>
      </form>
    </div>
  );
};

export default MainSignupForm;
