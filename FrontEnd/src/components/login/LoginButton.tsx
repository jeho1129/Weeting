import styles from '@/styles/login/LoginButton.module.css';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();
  const loginHandler = () => {
    navigate('/login');
  };
  return (
    <>
      <button className={styles.btn} onClick={loginHandler}>
        로그인
      </button>
    </>
  );
};

export default LoginButton;
