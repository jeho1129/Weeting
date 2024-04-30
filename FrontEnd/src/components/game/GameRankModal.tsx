import React, { useState } from 'react';
import styles from '@/styles/game/GameEnd.module.css';
import { RoomInfo } from '@/types/game';
import finish from '@/assets/images/finish.png';

interface Member {
  memberid: string;
  nickname: string;
  outfit: string;
  ready: boolean;
  word: string | null;
  score: number;
}

interface GameRankModalProps {
  roomInfo: RoomInfo;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (newStatus: string) => void;
}

const GameRankModal: React.FC<GameRankModalProps> = ({ roomInfo, isOpen, onClose, onStatusChange }) => {
  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    onStatusChange('waiting');
    onClose();
  };

  const sortedMembers = [...roomInfo.roommembers].sort((a, b) => b.score - a.score);

  return (
    <div className={`FontM20 ${styles.Container}`}>
      <div className={styles.modal}>
        <ul>
          {sortedMembers.map((member) => (
            // 내 금칙어 보여주게
            <li key={member.userId}>
              <div>{member.nickname}</div>
              <div>점수: {member.score}</div>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleConfirm}>확인</button>
    </div>
  );
};

export default GameRankModal;
