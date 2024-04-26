import logo from '@/assets/images/logo.png';
import MainGuestLoginButton from '@/components/main/MainGuestLoginButton';
import MainGuestSignupButton from '@/components/main/MainGuestSignupButton';
import { setCookie } from '@/utils/axios';
import styles from '@/styles/main/MainGuest.module.css';

const MainGuest = () => {
  // 나중에 지우기
  setCookie('accessToken', 'true');

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
