import styles from '@/styles/game/GameWaiting.module.css';
import { RoomInfo } from '@/types/game';
import GameWaitingReadyButton from '@/components/game/GameWaitingReadyButton';
import GameWaitingQuitButton from '@/components/game/GameWaitingQuitButton';
import GameWaitingMemberList from '@/components/game/GameWaitingMemberList';
import GameWaitingLogo from '@/components/game/GameWaitingLogo';
import GameWordTimer from '@/assets/images/timerNormal.png'
import GameTimer from '@/assets/images/timerNormal.png'

const GameWaitingLeftSide = ({ roomInfo }: { roomInfo: RoomInfo }) => {
  return (
    <>
    <div className={styles.Align}>
        <GameWaitingLogo/>
        <GameWaitingMemberList roommembers={roomInfo.roommembers}/>
        {roomInfo.roomstatus === 'waiting' && (
          <div className={styles.ButtonAlign}>
            <GameWaitingReadyButton roommembers={roomInfo.roommembers}/>
            <GameWaitingQuitButton roomid={roomInfo.roomid}/>
          </div>
        )}
        {/* {roomInfo.roomstatus === 'wordsetting' && (
          <GameWordTimer/> // 단어 설정 상태일 때 GameWordTimer 렌더링
        )}
        {roomInfo.roomstatus === 'start' && (
          <GameTimer/> // 게임 시작 상태일 때 GameTimer 렌더링
        )} */}
    </div>
    </>
  );
};

export default GameWaitingLeftSide;
