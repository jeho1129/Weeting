import React, { useState } from 'react';
import styles from '@/styles/game/GameEnd.module.css'
import { RoomInfo } from '@/types/game';

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
      <div className={styles.Container}>
        <div className={styles.modal}>
          <h2>게임 결과</h2>
          <ul>
            {sortedMembers.map((member) => (
              <li key={member.memberid}>
                닉네임: {member.nickname}, 점수: {member.score}, 금칙어: {member.word || '없음'}
              </li>
            ))}
          </ul>
          <button onClick={handleConfirm}>확인</button>
        </div>
      </div>
    );
  };
  
  export default GameRankModal;