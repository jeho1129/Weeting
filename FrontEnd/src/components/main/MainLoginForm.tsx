import { userState } from '@/recoil/atom';
import { loginApi } from '@/services/userApi';
import styles from '@/styles/main/MainLoginForm.module.css';
import { setCookie } from '@/utils/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Swal from 'sweetalert2';
import { buttonError } from '@/utils/buttonClick';

const MainLoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const onIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    loginApi({
      account: id,
      password: password,
    })
      .then((data) => {
        const loggedInUserState = data.dataBody;
        console.log('loggedInUserState :', loggedInUserState);

        // 쿠키에 accessToken 저장
        setCookie('accessToken', data.dataBody.accessToken, { path: '/' });

        // recoil에 login 정보 저장
        setUser(loggedInUserState);
      })
      .then(() => {
        navigate('/home');
      })
      .catch((err) => {
        console.log(err);
        buttonError();
        if (err.message === 'Network Error') {
          Swal.fire({
            title: '네트워크를 확인해주세요',
            icon: 'error',
          });
          return;
        }

        Swal.fire({
          title: '회원정보가 잘못되었습니다',
          icon: 'error',
        });
      });
  };

  return (
    <div className={styles.Mgt}>
      <form onSubmit={submitHandler}>
        <div className={styles.Mgb}>
          <label className={`${styles.LoginLabel} FontM32`} htmlFor="id">
            id
          </label>
          <input
            className={`${styles.InputBox} FontM20`}
            id="id"
            type="text"
            placeholder="아이디를 입력하세요"
            onChange={onIdHandler}
          />
        </div>
        <div className={styles.Mgb2}>
          <label className={`${styles.LoginLabel} FontM32`} htmlFor="password">
            pw
          </label>
          <input
            className={`${styles.InputBox} FontM20`}
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={onPasswordHandler}
          />
        </div>
        <div className={styles.BtnAlign}>
          <button className={`${styles.Btn} ${styles.BtnTop} FontM20`}>로그인</button>
        </div>
      </form>
    </div>
  );
};

export default MainLoginForm;
