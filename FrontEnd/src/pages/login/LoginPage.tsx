import Logo1 from '@/assets/images/weeting_logo1.png';
import styles from '@/styles/login/LoginPage.module.css';

const LoginPage = () => {
  return (
    <>
      <h1>I am Login</h1>
      <div className={styles.align}>
        <img src={Logo1} alt="wettingLogo1" />
      </div>
    </>
  );
};

export default LoginPage;
