import React, { useState } from 'react';
import styles from '@/styles/game/GameWordSetting.module.css'

interface GameForbiddenWordProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (word: string) => void;
}

const GameForbiddenWord: React.FC<GameForbiddenWordProps> = ({ isOpen, onClose, onConfirm }) => {
  const [forbiddenWord, setForbiddenWord] = useState('');

  if (!isOpen) return null;

  return (
    <div className={styles.container}>
      <h2>금칙어 설정</h2>
      <input
        type="text"
        value={forbiddenWord}
        onChange={(e) => setForbiddenWord(e.target.value)}
      />
      <button onClick={() => onConfirm(forbiddenWord)}>확인</button>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default GameForbiddenWord;
