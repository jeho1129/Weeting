import { useEffect, useState } from 'react';
import styles from '@/styles/game/GameWordSetting.module.css';
import { RoomInfo } from '@/types/game';
import { gameForbiddenWordApi } from '@/services/gameApi';

interface GameForbiddenWordProps {
  roomInfo: RoomInfo;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (word: string) => void;
}

const GameForbiddenWord: React.FC<GameForbiddenWordProps> = ({ roomInfo, isOpen, onClose, onConfirm }) => {
  const [forbiddenWord, setForbiddenWord] = useState('');
  const [theme, setTheme] = useState('');
  const [warningMsg, setWarningMsg] = useState(
    '* 두 글자 이상의 국어사전에 등재된 단어만 사용 가능합니다. <br />* 입력하지 않을 경우 랜덤으로 금칙어가 설정됩니다',
  );

  if (!isOpen) {
    return null;
  }

  useEffect(() => {
    if (roomInfo.roomMode === 'normal') {
      setWarningMsg('* 한 글자 이상 6글자 이하로 입력해주세요.');
    } else {
      setWarningMsg(
        '* 두 글자 이상의 국어사전에 등재된 단어만 사용 가능합니다. <br />* 입력하지 않을 경우 랜덤으로 금칙어가 설정됩니다',
      );
    }

    gameForbiddenWordApi().then((data: string) => {
      setTheme(data);
    });
  }, [roomInfo.roomMode]);

  useEffect(() => {
    gameForbiddenWordApi().then((data: string) => {
      setTheme(data);
    });
  }, []);

  // 입력 조건 검증 함수
  const isValidInput = () => {
    if (roomInfo.roomMode === 'rank') {
      return forbiddenWord.length >= 2 && forbiddenWord.length <= 6;
    } else {
      // 'normal' 모드
      return forbiddenWord.length >= 1 && forbiddenWord.length <= 6;
    }
  };

  return (
    <div className={styles.Container}>
      <div className="FontM32">OO 님의 금칙어를 정해주세요</div>
      <div className="FontM60">주제 : {theme}</div>
      <input
        className="FontM20"
        type="text"
        maxLength={5}
        value={forbiddenWord}
        onChange={(e) => setForbiddenWord(e.target.value)}
      />
      <div className={`FontM20 ${styles.WarningMsg}`} dangerouslySetInnerHTML={{ __html: warningMsg }}></div>

      <button
        style={{ fontSize: `28px`, backgroundColor: isValidInput() ? '#0093f3' : '#cccccc' }}
        className={`FontM32 ${styles.ConfirmBtn}`}
        onClick={() => isValidInput() && onConfirm(forbiddenWord)}
      >
        확인
      </button>
    </div>
  );
};

export default GameForbiddenWord;
