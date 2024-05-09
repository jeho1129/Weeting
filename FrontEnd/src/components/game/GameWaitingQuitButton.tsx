import styles from '@/styles/game/GameWaitingReadyButton.module.css';
import { useNavigate } from 'react-router-dom';
import { RoomInfo } from '@/types/game';
import { useEffect } from 'react';
import { gameOutApi } from '@/services/gameApi';

interface GameWaitingQuitButtonProps {
  roomId: string; // 방 ID
  onQuitSuccess?: () => void; // 방 나가기 성공 시 호출될 콜백 함수
}

const GameWaitingQuitButton: React.FC<GameWaitingQuitButtonProps> = ({ roomId, onQuitSuccess }) => {
  const navigate = useNavigate();
  const handleQuitRoom = async () => {
    try {
      // 서버에 방 나가기 요청 보내기
      // 실제 요청 URL과 HTTP 메소드는 백엔드 API에 따라 달라질 수 있음
      await axios.post(`/api/rooms/${roomId}/quit`);
      alert('방을 성공적으로 나갔습니다.');

      if (onQuitSuccess) {
        onQuitSuccess();
      }
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
// const GameWaitingQuitButton = (roomId: { roomId: RoomInfo['roomId'] }) => {
//   const navigate = useNavigate();
//   const QuitHandler = () => {
//     useEffect(() => {
//       gameOutApi(roomId);
//       console.log('나가써요');
//     });
//     navigate('/room');
//   };
//   return (
//     <>
//       <button className={`FontM32 ${styles.Btn}`} onClick={QuitHandler}>
//         Quit
//       </button>
//     </>
//   );
// };

// export default GameWaitingQuitButton;
