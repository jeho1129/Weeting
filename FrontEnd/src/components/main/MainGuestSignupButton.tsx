import styles from '@/styles/main/MainGuestLoginButton.module.css';
import { useNavigate } from 'react-router-dom';

const MainGuestSignupButton = () => {
  const navigate = useNavigate();
  const signupHandler = () => {
    navigate('/signup');
  };
  return (
    <button className={`FontM24 ${styles.Btn}`} onClick={signupHandler}>
      회원가입
    </button>
  );
};

export default MainGuestSignupButton;
