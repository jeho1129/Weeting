import { getCookie, setCookie } from '@/utils/axios';
import { loginApi } from '@/services/userApi';
import styles from '@/styles/main/MainLoginForm.module.css';
import { useState } from 'react';

const MainLoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setCookie('accessToken', 'true', { path: '/' });
    const accessToken = getCookie('accessToken');

    loginApi({
      account: id,
      password: password,
    })
      .then((data) => {
        alert('로그인 되었습니다');
        console.log('data :', data);
      })
      .catch(() => {
        alert('정보가 잘못되었습니다');
      });
  };
  return (
    <div className={styles.Mgt}>
      <form onSubmit={submitHandler}>
        <div className={styles.Mgb}>
          <label className={`${styles.LoginLabel}`} htmlFor="id">
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
        <div className={styles.Mgb2}>
          <label className={styles.LoginLabel} htmlFor="password">
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
        <div className={styles.BtnAlign}>
          <button className={`${styles.Btn} ${styles.BtnTop}`}>로그인</button>
        </div>
      </form>
    </div>
  );
};

export default MainLoginForm;
