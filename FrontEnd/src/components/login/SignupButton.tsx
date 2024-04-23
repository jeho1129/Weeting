import styles from '@/styles/login/LoginButton.module.css';
import { useNavigate } from 'react-router-dom';

const SignupButton = () => {
  const navigate = useNavigate();
  const signupHandler = () => {
    navigate('/signup');
  };
  return (
    <button className={styles.btn} onClick={signupHandler}>
      회원가입
    </button>
  );
};

export default SignupButton;
