import { useEffect, useState } from 'react';
import styles from '@/styles/game/GameWaitingReadyButton.module.css';
import { RoomInfo } from '@/types/game';
import { userState } from '@/recoil/atom';
import { useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';
import { gameStartApi } from '@/services/gameApi';

const GameWaitingReadyButton = ({
  roomStatus,
  roomId,
  roomUsers,
  blink,
}: {
  roomStatus: RoomInfo['roomStatus'];
  roomId: RoomInfo['roomId'];
  roomUsers: RoomInfo['roomUsers'];
  blink?: boolean;
}) => {
  const [buttonStyle, setButtonStyle] = useState('');
  const userInfo = useRecoilValue(userState);

  const isFirstMember = roomUsers[0]?.id === userInfo.userId;

  const ReadyHandler = async () => {
    const isRoomFull = roomUsers.length >= 4;

    if (isFirstMember && !isRoomFull) {
      Swal.fire({
        title: '최소 4명이 필요합니다',
        icon: 'error',
      });
      return;
    } else if (isFirstMember) {
    } else {
      try {
        gameStartApi(roomId);
      } catch (error) {
        console.error('Ready 상태 업데이트 실패:', error);
      }
    }
  };

  const myReady = roomUsers.find((user) => user.id === userInfo.userId)?.ready;

  useEffect(() => {
    let baseStyle = `FontM32 ${styles.Btn}`;
    if (isFirstMember && blink && roomStatus === 'allready') {
      baseStyle += ` ${styles.Blink}`;
    }
    if (!myReady) {
      baseStyle += ` ${styles.Ready}`;
    } else {
      baseStyle += ` ${styles.Readycancle}`;
    }
    setButtonStyle(baseStyle);
  }, [myReady, isFirstMember, blink]);

  const buttonContent = isFirstMember ? '게임시작' : myReady ? '준비 취소' : '준비';

  return (
    <>
      <button className={buttonStyle} onClick={ReadyHandler}>
        {buttonContent}
      </button>
    </>
  );
};

export default GameWaitingReadyButton;
