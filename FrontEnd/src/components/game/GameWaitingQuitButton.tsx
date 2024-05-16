import { useNavigate } from 'react-router-dom';
import { gameOutApi } from '@/services/gameApi';
import styles from '@/styles/game/GameWaitingReadyButton.module.css';

const GameWaitingQuitButton = ({ roomId }: { roomId: string }) => {
  const navigate = useNavigate();

  const handleQuitRoom = async () => {
    try {
      await gameOutApi(roomId);
      navigate('/room');
    } catch (error) {
      console.error('방 나가기에 실패했습니다.', error);
      alert('방 나가기에 실패했습니다.');
    }
  };

  return (
    <button className={`FontM32 ${styles.Btn} ${styles.QuitBtn}`} onClick={handleQuitRoom}>
      방 나가기
    </button>
  );
};

export default GameWaitingQuitButton;
