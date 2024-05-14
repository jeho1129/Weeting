import { useEffect, useState } from 'react';
import styles from '@/styles/game/GameWaitingReadyButton.module.css';
import { RoomInfo } from '@/types/game';
import { userState } from '@/recoil/atom';
import { useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';
import { gameReadyApi } from '@/services/gameApi';

const GameWaitingReadyButton = ({
  roomId,
  roomUsers,
  blink,
  onStartGame,
  setRoomInfo,
}: {
  roomId: RoomInfo['roomId'];
  roomUsers: RoomInfo['roomUsers'];
  blink?: boolean;
  onStartGame: () => void;
  setRoomInfo: React.Dispatch<React.SetStateAction<RoomInfo>>;
}) => {
  const [isReady, setIsReady] = useState(false);
  const [buttonStyle, setButtonStyle] = useState('');
  const myId = useRecoilValue(userState);

  const isFirstMember = roomUsers[0]?.id === myId.userId;

  const ReadyHandler = async () => {
    const isRoomFull = roomUsers.length >= 4;

    if (isFirstMember && !isRoomFull) {
      Swal.fire({
        title: '최소 4명이 필요합니다',
        icon: 'error',
      });
      return;
    } else if (isFirstMember) {
      onStartGame();
    } else {
      try {
        // const response = await gameReadyApi(roomId);
        // setIsReady(response);
        gameReadyApi(roomId).then((data) => {
          console.log(data);
          setIsReady(!isReady);
        });
      } catch (error) {
        console.error('Ready 상태 업데이트 실패:', error);
      }
    }
  };

  useEffect(() => {
    setButtonStyle(`FontM32 ${styles.Btn} ${isFirstMember && blink ? styles.Blink : ''}`);
    if (isReady) {
      setButtonStyle(`FontM32  ${isFirstMember && blink ? styles.Blink : ''} ${styles.Btn} ${styles.Ready}`);
    }
  }, [isReady, isFirstMember, blink]);

  const buttonContent = isFirstMember ? '게임시작' : isReady ? '준비 취소' : '준비';

  return (
    <>
      <button className={buttonStyle} onClick={ReadyHandler}>
        {buttonContent}
      </button>
    </>
  );
};

export default GameWaitingReadyButton;
