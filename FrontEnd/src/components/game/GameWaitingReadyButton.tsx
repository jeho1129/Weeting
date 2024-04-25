import styles from '@/styles/game/GameWaitingReadyButton.module.css';
import { useNavigate } from 'react-router-dom';

const GameWaitingReadyButton = () => {
  const navigate = useNavigate();
  const ReadyHandler = () => {
    //ready 눌렀을 때 정보 전달하도록
    navigate('/login');
  };
  return (
    <>
      <button className={styles.Btn} onClick={ReadyHandler}>
        ready
      </button>
    </>
  );
};

export default GameWaitingReadyButton;
