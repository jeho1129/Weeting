import styles from '@/styles/game/GameWordSetting.module.css';
import { RoomInfo } from '@/types/game';
import { userState } from '@/recoil/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { gameOverApi } from '@/services/gameApi';

interface GameForbiddenWordProps {
  roomInfo: RoomInfo;
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  forbiddenWord: string;
  setForbiddenWord: React.Dispatch<React.SetStateAction<string>>;
}

const GameForbiddenWord = ({
  roomInfo,
  isModalOpen,
  setModalOpen,
  forbiddenWord,
  setForbiddenWord,
}: GameForbiddenWordProps) => {
  const userInfo = useRecoilValue(userState);
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
      roomInfo.roomUsers.findIndex((user) => user.id === userInfo.userId) + 1 < roomInfo.roomUsers.length
        ? roomInfo.roomUsers[roomInfo.roomUsers.findIndex((user) => user.id === userInfo.userId) + 1].nickname
        : roomInfo.roomUsers[0].nickname;
    return (
      <div className={styles.Container}>
        <div className="FontM32">
          {nextUserNickname}
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
            } else {
              gameOverApi(roomInfo.roomId);
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
