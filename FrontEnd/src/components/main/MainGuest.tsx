import logo from '@/assets/images/logo.png';
import MainGuestLoginButton from '@/components/main/MainGuestLoginButton';
import MainGuestSignupButton from '@/components/main/MainGuestSignupButton';
import styles from '@/styles/main/MainGuest.module.css';
import { getCookie } from '@/utils/axios';
const MainGuest = () => {
  return (
    <>
      <div className={styles.Align}>
        <img src={logo} alt="weeting Logo" />
        <div className={styles.BtnAlign}>
          <MainGuestLoginButton />
          <MainGuestSignupButton />
        </div>
      </div>
    </>
  );
};

export default MainGuest;
