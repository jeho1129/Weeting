import logo from '@/assets/images/logo.png';
import styles from '@/styles/MainLogin.module.css';

const MainLogin = () => {
  return (
    <>
      <div className={styles.Align}>
        <img src={logo} alt="weetingLogo" />
      </div>
      <div className={styles.Container}>
        <div className={styles.Box}></div>
      </div>
    </>
  );
};

export default MainLogin;
