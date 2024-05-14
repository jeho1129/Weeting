import styles from '@/styles/main/MainGuestLoginButton.module.css';
import { useNavigate } from 'react-router-dom';
import { buttonClick } from '@/utils/buttonClick';

const MainGuestLoginButton = () => {
  const navigate = useNavigate();
  const loginHandler = () => {
    navigate('/login');
    buttonClick();
  };
  return (
    <>
      <button className={`FontM24 ${styles.Btn}`} onClick={loginHandler}>
        로그인
      </button>
    </>
  );
};

export default MainGuestLoginButton;
