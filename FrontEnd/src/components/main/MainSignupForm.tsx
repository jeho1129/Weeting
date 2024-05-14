import { userState } from '@/recoil/atom';
import { loginApi, signupApi } from '@/services/userApi';
import styles from '@/styles/main/MainLoginForm.module.css';
import { setCookie } from '@/utils/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Swal from 'sweetalert2';
import MainSignupFormId from './MainSignupFormId';
import MainSignupFormNickname from './MainSignupFormNickname';
import MainSignupFormPw from './MainSignupFormPw';
import MainSignupFormPwCheck from './MainSignupFormPwCheck';
import { buttonError } from '@/utils/buttonClick';

const MainSignupForm = () => {
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [idPossible, setIdPossible] = useState(0);
  const [nicknamePossible, setNicknamePossible] = useState(0);
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

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

  const signupHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      buttonError();
      Swal.fire({
        title: '비밀번호, 2차비밀번호가 일치하지 않습니다',
        icon: 'error',
      });
      return;
    }
    signupApi({
      account: id,
      password: password,
      nickname: nickname,
    })
      .then(() => {
        // 로그인
        loginApi({
          account: id,
          password: password,
        })
          .then((data) => {
            const loggedInUserState = data.dataBody;
            // console.log('loggedInUserState :', loggedInUserState);
            // recoil에 login 정보 저장
            setUser(loggedInUserState);
            // console.log(data.dataBody.accessToken);

            // 쿠키에 accessToken 저장
            setCookie('accessToken', data.dataBody.accessToken, { path: '/' });
          })
          .then(() => {
            navigate('/home');
          })
          .catch((err) => {
            // console.log(err);
            buttonError();
            Swal.fire({
              title: '회원정보가 잘못되었습니다',
              icon: 'error',
            });
          });
      })
      .catch((err) => {
        buttonError();
        if (err.message === 'Network Error') {
          Swal.fire({
            title: '네트워크를 확인해주세요',
            icon: 'error',
          });
          return;
        }
        Swal.fire({
          title: '비밀번호 형식을 확인해주세요\n(영어, 숫자, 특수문자포함 8글자 이상)',
          icon: 'error',
        });
      });
  };

  const idAlertHandler = (e: React.FormEvent) => {
    e.preventDefault();
    buttonError();
    Swal.fire({
      title: '아이디 중복확인을 해주세요',
      icon: 'error',
    });
  };

  const nicknameAlertHandler = (e: React.FormEvent) => {
    e.preventDefault();
    buttonError();
    Swal.fire({
      title: '닉네임 중복확인을 해주세요',
      icon: 'error',
    });
  };

  const idCheckHandler = (isPossible: number) => {
    setIdPossible(isPossible); // MainSignupFormId로부터 받은 idPossible 설정
  };

  const nicknameCheckHandler = (isPossible: number) => {
    setNicknamePossible(isPossible); // MainSignupFormId로부터 받은 nicknamePossible 설정
  };

  return (
    <div className={styles.MgtSignin}>
      <form>
        <MainSignupFormId id={id} onIdHandler={onIdHandler} idPossible={idPossible} idCheckHandler={idCheckHandler} />
        <MainSignupFormNickname
          nickname={nickname}
          onNicknameHandler={onNicknameHandler}
          nicknamePossible={nicknamePossible}
          nicknameCheckHandler={nicknameCheckHandler}
        />
        <MainSignupFormPw password={password} onPasswordHandler={onPasswordHandler} />
        <MainSignupFormPwCheck
          password={password}
          passwordCheck={passwordCheck}
          onPasswordCheckHandler={onPasswordCheckHandler}
        />
        {idPossible === 0 && (
          <div className={styles.BtnAlign}>
            <button onClick={idAlertHandler} className={`${styles.SignupBtn} FontM20`}>
              가입
            </button>
          </div>
        )}
        {idPossible === 1 && nicknamePossible === 0 && (
          <div className={styles.BtnAlign}>
            <button onClick={nicknameAlertHandler} className={`${styles.SignupBtn} FontM20`}>
              가입
            </button>
          </div>
        )}
        {idPossible === 1 && nicknamePossible === 1 && (
          <div className={styles.BtnAlign}>
            <button onClick={signupHandler} className={`${styles.SignupBtn} FontM20`}>
              가입
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MainSignupForm;
