import Logo1 from '@/assets/images/Weeting_logo1.png';
import LoginButton from '@/components/login/LoginButton';
import SignupButton from '@/components/login/SignupButton';
import styles from '@/styles/login/MainGuestPage.module.css';

const MainGuestPage = () => {
  return (
    <>
      <div className={styles.align}>
        <img src={Logo1} alt="weetingLogo1" />
      </div>
      <div className={styles.btnAlign}>
        <LoginButton />
        <SignupButton />
      </div>
    </>
  );
};

export default MainGuestPage;
