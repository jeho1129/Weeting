import { useState } from 'react';
import styles from '@/styles/game/GameEnd.module.css';
import { RoomInfo } from '@/types/game';
import finish from '@/assets/images/finish.png';

interface GameRankModalProps {
  roomInfo: RoomInfo;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (newStatus: string) => void;
}

const GameRankModal: React.FC<GameRankModalProps> = ({
  roomInfo,
  isOpen,
  onClose,
  onStatusChange,
}: GameRankModalProps) => {
  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
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
                <li key={member.userId} className={index === 0 ? 'FontM32' : ''}>
                  <div className={styles.Center}>
                    {index === 0 ? ' 1등 ' : ''} {member.nickname}
                  </div>
                  <div className={styles.Center}>점수: {member.score}</div>
                </li>
              ))
            : roomInfo.roomMode === 'normal'
              ? normalMembers.map((member, index) => (
                  <li key={member.userId} className={'FontM32'}>
                    <div className={styles.FlexContainer}>
                      <div>{member.nickname}</div>
                      <div>{member.isAlive ? '생존 😊' : '사망 🍗'}</div>
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
