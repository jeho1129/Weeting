import logo2 from '@/assets/images/logo2.png';
import styles from '@/styles/main/MainLogin.module.css';
import MainSignupForm from './MainSignupForm';
import HomeButton from '../home/HomeButton';

const MainSignup = () => {
  return (
    <>
    <div className={styles.ButtonContainer}>
      <HomeButton {...{ message: '대기', direction: 'back', location: '' }} />
    </div>
      <div className={styles.Align}>
        <img src={logo2} alt="weetingLogo2" />
      </div>
      <div className={styles.Container}>
        <div className={styles.SignupBox}>
        </div>
        <MainSignupForm />
      </div>
    </>
  );
};

export default MainSignup;
