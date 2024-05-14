import { useState, useEffect } from 'react';
import styles from '@/styles/game/GameEnd.module.css';
import { RoomInfo } from '@/types/game';

interface GameRankModalProps {
  roomInfo: RoomInfo;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (newStatus: string) => void;
  onRoomUsersReset: (newRoomInfo: RoomInfo) => void;
}

const GameRankModal: React.FC<GameRankModalProps> = ({
  roomInfo,
  isOpen,
  onClose,
  onStatusChange,
  onRoomUsersReset,
}: GameRankModalProps) => {
  if (!isOpen) {
    return null;
  }
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOpen) {
      timer = setTimeout(handleConfirm, 30000);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleConfirm = () => {
    // roomInfo.roomUsers 배열 업데이트
    const updatedRoomUsers = roomInfo.roomUsers.map((user) => ({
      ...user,
      word: '',
      isAlive: '',
      score: 0,
      ready: false,
    }));

    // onRoomUsersReset 함수를 호출하여 상위 컴포넌트에서 상태를 업데이트
    onRoomUsersReset({
      ...roomInfo,
      roomUsers: updatedRoomUsers,
    });
    onStatusChange('waiting');
    onClose();
  };

  const normalMembers = roomInfo.roomUsers;

  const sortedMembers = [...roomInfo.roomUsers].sort((a, b) => b.score - a.score);

  return (
    <div className={`FontM20 ${styles.Container}`}>
      <div className={styles.modal}>
        <ul>
          {roomInfo.roomMode === 'rank'
            ? sortedMembers.map((member, index) => (
                <li key={member.id} className={index === 0 ? 'FontM32' : ''}>
                  <div className={styles.Center}>
                    {index === 0 ? ' 1등 ' : `${index + 1}등`} {member.nickname}
                  </div>
                  <div className={styles.Center}>점수: {member.score}</div>
                </li>
              ))
            : roomInfo.roomMode === 'normal'
              ? normalMembers.map((member, index) => (
                  <li key={member.id} className={'FontM32'}>
                    <div className={styles.FlexContainer}>
                      <div>{member.nickname}</div>
                      <div>{member.isAlive === '' ? '생존 😊' : '탈락 🍗'}</div>
                    </div>
                  </li>
                ))
              : null}
        </ul>
      </div>
      <button className={`FontM20 ${styles.Btn}`} onClick={handleConfirm}>
        확인
      </button>
    </div>
  );
};

export default GameRankModal;
