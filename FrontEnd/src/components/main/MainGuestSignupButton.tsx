import styles from '@/styles/login/MainGuestLoginButton.module.css';
import { useNavigate } from 'react-router-dom';

const MainGuestSignupButton = () => {
  const navigate = useNavigate();
  const signupHandler = () => {
    navigate('/signup');
  };
  return (
    <button className={styles.Btn} onClick={signupHandler}>
      회원가입
    </button>
  );
};

export default MainGuestSignupButton;
