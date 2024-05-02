import styles from '@/styles/game/GameWaiting.module.css';
import { RoomInfo } from '@/types/game';
import { ChatMessage } from '@/types/chat';

import GameWaitingChatting from '@/components/game/GameWaitingChatting';
import GameWaitingPole from '@/components/game/GameWaitingPole';



const GameWaitingRightSide = ({ roomInfo, chatMessages }: { roomInfo: RoomInfo, chatMessages: ChatMessage[] }) => {
  return (
    <>
    <div className={styles.RightSide}>
      <GameWaitingPole roomName={roomInfo.roomName} roomStatus={roomInfo.roomStatus} roomUsers={roomInfo.roomUsers} roomMaxCnt={roomInfo.roomMaxCnt} />
      <GameWaitingChatting chatMessages={chatMessages}/>
    </div>
    </>
  );
};

export default GameWaitingRightSide;