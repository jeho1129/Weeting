import styles from '@/styles/game/GameWaitingReadyButton.module.css';
import { useNavigate } from 'react-router-dom';

const GameWaitingQuitButton = () => {
  const navigate = useNavigate();
  const QuitHandler = () => {
    // 이전 페이지로 넘어가도록
    navigate('/login');
  };
  return (
    <>
      <button className={styles.Btn} onClick={QuitHandler}>
        Quit
      </button>
    </>
  );
};

export default GameWaitingQuitButton;