import electricpole from '@/assets/images/electricpole.png';
import electricline from '@/assets/images/electricline.png';

import GameAvatars from '@/components/game/GameWaitingAvatars';

import styles from '@/styles/game/GameWaiting.module.css';

import { RoomInfo } from '@/types/game';
import { ChatMessage } from '@/types/chat';

const GameWaitingPole = ({ roomInfo, chatMessage }: { roomInfo: RoomInfo; chatMessage: ChatMessage[] }) => {
  return (
    <>
      {roomInfo.roomStatus !== 'start' && <div className={`FontM32 ${styles.RoomName}`}>{roomInfo.roomName}</div>}
      <div className={styles.Avatars}>
        <GameAvatars roomInfo={roomInfo} chatMessage={chatMessage} />
      </div>
      <div className={styles.ElectricPoles}>
        <img className={styles.ElectricLine1} src={electricline} alt="GameTemplate" />
        <img className={styles.ElectricLine2} src={electricline} alt="GameTemplate" />

        <img className={styles.ElectricPole} src={electricpole} alt="GameTemplate" />
      </div>
    </>
  );
};

export default GameWaitingPole;
