import React, { useState } from 'react';
import styles from '@/styles/game/GameWordSetting.module.css'
import { RoomInfo } from '@/types/game';


interface GameForbiddenWordProps {
  roomInfo: RoomInfo;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (word: string) => void;
}

const GameForbiddenWord: React.FC<GameForbiddenWordProps> = ({ roomInfo, isOpen, onClose, onConfirm }) => {
  const [forbiddenWord, setForbiddenWord] = useState('');

  if (!isOpen) return null;

  return (
    <div className={styles.Container}>
      <div>
        OO 님의 금칙어를 정해주세요
      </div>
      <div>
        주제 : 
      </div>
      <input
        type="text"
        value={forbiddenWord}
        onChange={(e) => setForbiddenWord(e.target.value)}
      />
      <div className={styles.WarningMsg}>
        * 두 글자 이상의 국어사전에 등재된 단어만 사용 가능합니다.<br/>* 입력하지 않을 경우 랜덤으로 금칙어가 설정됩니다
      </div>
      <button onClick={() => onConfirm(forbiddenWord)}>확인</button>
    </div>
  );
};

export default GameForbiddenWord;
