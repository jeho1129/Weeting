import styles from '@/styles/game/GameWordSetting.module.css';
import { RoomInfo } from '@/types/game';

interface GameForbiddenWordProps {
  roomInfo: RoomInfo;
  myIndex: number;
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  forbiddenWord: string;
  setForbiddenWord: React.Dispatch<React.SetStateAction<string>>;
}

const GameForbiddenWord = ({
  roomInfo,
  myIndex,
  isModalOpen,
  setModalOpen,
  forbiddenWord,
  setForbiddenWord,
}: GameForbiddenWordProps) => {
  const warningMsg =
    roomInfo.roomMode === 'normal'
      ? '* 한 글자 이상 6글자 이하의 단어를 입력해주세요.'
      : '* 두 글자 이상 6글자 이하의 단어를 입력해주세요.<br />* 입력하지 않을 경우 랜덤으로 금칙어가 설정됩니다. <br />* 사전에 등록된 단어일수록 정확한 유사도를 측정할 수 있습니다.';

  // 입력 조건 검증 함수
  const isValidInput = () => {
    if (roomInfo.roomMode === 'rank') {
      return forbiddenWord.length >= 2 && forbiddenWord.length <= 6;
    } else {
      // 'normal' 모드
      return forbiddenWord.length >= 1 && forbiddenWord.length <= 6;
    }
  };

  if (isModalOpen) {
    const nextUserNickname =
      myIndex + 1 < roomInfo.roomUsers.length
        ? roomInfo.roomUsers[myIndex + 1].nickname
        : roomInfo.roomUsers[0].nickname;
    return (
      <div className={styles.Container}>
        <div className="FontM32">
          {nextUserNickname}
          {/* {myIndex !== roomInfo.roomUsers.length - 1
            ? roomInfo.roomUsers[myIndex + 1].nickname
            : roomInfo.roomUsers[0].nickname} */}
          님의 금칙어를 정해주세요
        </div>
        <div className="FontM60">주제 : {roomInfo.roomTheme}</div>
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
          onClick={() => {
            if (isValidInput() && forbiddenWord !== '') {
              setModalOpen(false);
            }
          }}
        >
          확인
        </button>
      </div>
    );
  } else {
    return <></>;
  }
};

export default GameForbiddenWord;
