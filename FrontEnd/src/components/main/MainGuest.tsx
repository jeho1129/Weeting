import logo from '@/assets/images/logo.png';
import MainGuestLoginButton from '@/components/main/MainGuestLoginButton';
import MainGuestSignupButton from '@/components/main/MainGuestSignupButton';
import styles from '@/styles/main/MainGuest.module.css';
import { getCookie, setCookie } from '@/utils/axios';
import { useNavigate } from 'react-router-dom';

const MainGuest = () => {
  // 나중에 지우기
  setCookie('accessToken', 'true');
  const navigate = useNavigate();
  const accessToken = getCookie('accessToken');
  console.log('accessToken :', accessToken);
  // if (accessToken === true) {
  //   navigate('home');
  // }
  return (
    <>
      <div className={styles.Align}>
        <img src={logo} alt="weeting Logo" />
      </div>
      <div className={styles.BtnAlign}>
        <MainGuestLoginButton />
        <MainGuestSignupButton />
      </div>
    </>
  );
};

export default MainGuest;
