import React from 'react';
import { useNavigate } from 'react-router-dom';
import { gameOutApi } from '@/services/gameApi';
import styles from '@/styles/game/GameWaitingReadyButton.module.css';

interface GameWaitingQuitButtonProps {
  roomId: string;
  onQuitSuccess?: () => void;
}

const GameWaitingQuitButton: React.FC<GameWaitingQuitButtonProps> = ({ roomId, onQuitSuccess }) => {
  const navigate = useNavigate();

  const handleQuitRoom = async () => {
    try {
      await gameOutApi(roomId);
      // alert('방을 성공적으로 나갔습니다.'); // 성공 알림
      if (onQuitSuccess) {
        onQuitSuccess();
      }

      navigate('/room');
    } catch (error) {
      console.error('방 나가기에 실패했습니다.', error);
      alert('방 나가기에 실패했습니다.');
    }
  };

  return (
    <button className={`FontM32 ${styles.Btn}`} onClick={handleQuitRoom}>
      Quit
    </button>
  );
};

export default GameWaitingQuitButton;