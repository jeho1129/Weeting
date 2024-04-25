import logo from '@/assets/images/logo.png';
import styles from '@/styles/main/MainLogin.module.css';
import MainSignupForm from './MainSignupForm';

const MainSignup = () => {
  return (
    <>
      <div className={styles.Align}>
        <img src={logo} alt="weetingLogo" />
      </div>
      <div className={styles.Container}>
        <div className={styles.Box}>
        </div>
          <MainSignupForm />
      </div>
    </>
  );
};

export default MainSignup;
