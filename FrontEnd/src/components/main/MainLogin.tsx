import logo2 from '@/assets/images/logo2.png';
import styles from '@/styles/main/MainLogin.module.css';
import MainLoginForm from './MainLoginForm';
import HomeButton from '../home/HomeButton';

const MainLogin = () => {
  return (
    <>
      <div className={styles.ButtonContainer}>
        <HomeButton {...{ message: '대기', direction: 'back', location: '' }} />
      </div>
      <div className={styles.Align}>
        <img src={logo2} alt="weetingLogo2" />
      </div>
      <div className={styles.Container}>
        <div className={styles.Box}></div>
        <MainLoginForm />
      </div>
    </>
  );
};

export default MainLogin;
