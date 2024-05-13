import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gameOutApi } from '@/services/gameApi';
import styles from '@/styles/game/GameWaitingReadyButton.module.css';

interface GameWaitingQuitButtonProps {
  roomId: string;
  onQuitSuccess?: () => void;
}

const GameWaitingQuitButton: React.FC<GameWaitingQuitButtonProps> = ({ roomId, onQuitSuccess }) => {
  const navigate = useNavigate();
  const params = useParams().id;

  const handleQuitRoom = async () => {
    try {
      await gameOutApi(params!);
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
    <button className={`FontM32 ${styles.Btn} ${styles.QuitBtn}`} onClick={handleQuitRoom}>
      방 나가기
    </button>
  );
};

export default GameWaitingQuitButton;
