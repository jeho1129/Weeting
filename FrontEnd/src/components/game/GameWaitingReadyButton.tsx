import { useEffect, useState } from 'react';
import styles from '@/styles/game/GameWaitingReadyButton.module.css';
import { RoomInfo } from '@/types/game';
import { userState } from '@/recoil/atom';
import { useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';
import { gameReadyApi } from '@/services/gameApi';
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
  const [isReady, setIsReady] = useState(false);
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
    } else if (isFirstMember && roomStatus === 'allready') {
      try {
        // 게임 시작 API 호출
        await gameStartApi(roomId);
      } catch (error) {
        console.error('게임 시작 실패:', error);
      }
    } else if (!isFirstMember) {
      try {
        await gameReadyApi(roomId).then((data) => {
          // console.log(data);
          setIsReady(!isReady);
        });
      } catch (error) {
        console.error('Ready 상태 업데이트 실패:', error);
      }
    }
  };
  //   } else if (isFirstMember && roomStatus === 'allready') {
  //   } else {
  //     try {
  //       gameStartApi(roomId);
  //       gameReadyApi(roomId).then((data) => {
  //         // console.log(data);
  //         setIsReady(!isReady);
  //       });
  //     } catch (error) {
  //       console.error('Ready 상태 업데이트 실패:', error);
  //     }
  //   }
  // };

  const myReady = roomUsers.find((user) => user.id === userInfo.userId)?.ready;

  useEffect(() => {
    let baseStyle = `FontM32 ${styles.Btn}`;
    if (isFirstMember && blink && roomStatus === 'allready') {
      baseStyle += ` ${styles.Blink}`;
    }
    if (!isReady) {
      baseStyle += ` ${styles.Ready}`;
    } else {
      baseStyle += ` ${styles.Readycancle}`;
    }
    setButtonStyle(baseStyle);
  }, [isReady, isFirstMember, blink]);

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
