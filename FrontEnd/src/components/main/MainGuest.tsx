import logo from '@/assets/images/logo.png';
import MainGuestLoginButton from '@/components/main/MainGuestLoginButton';
import MainGuestSignupButton from '@/components/main/MainGuestSignupButton';
import styles from '@/styles/login/MainGuest.module.css';

const MainGuest = () => {
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
