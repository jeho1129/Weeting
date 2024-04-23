import styles from '@/styles/login/MainGuestLoginButton.module.css';
import { useNavigate } from 'react-router-dom';

const MainGuestLoginButton = () => {
  const navigate = useNavigate();
  const loginHandler = () => {
    navigate('/login');
  };
  return (
    <>
      <button className={styles.Btn} onClick={loginHandler}>
        로그인
      </button>
    </>
  );
};

export default MainGuestLoginButton;
