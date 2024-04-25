import logo from '@/assets/images/logo.png';
import styles from '@/styles/main/MainLogin.module.css';
import MainLoginForm from './MainLoginForm';

const MainLogin = () => {
  return (
    <>
      <div className={styles.Align}>
        <img src={logo} alt="weetingLogo" />
      </div>
      <div className={styles.Container}>
        <div className={styles.Box}></div>
        <MainLoginForm />
      </div>
    </>
  );
};

export default MainLogin;
