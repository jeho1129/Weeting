import { RoomInfo } from '@/types/game';
import GameAvatars from '@/components/game/GameWaitingAvatars';
import styles from '@/styles/game/GameWaiting.module.css';
import electricpole from '@/assets/images/electricpole.png';
import electricline from '@/assets/images/electricline.png';


const GameWaitingPole = ({roomName, roomStatus, roomUsers, roomMaxCnt}: { roomName:RoomInfo["roomName"],roomStatus:RoomInfo["roomStatus"], roomUsers: RoomInfo["roomUsers"], roomMaxCnt: RoomInfo["roomMaxCnt"]}) => {
  return (
    <>
    {roomStatus !== 'start' && (
      <div className={`FontM32 ${styles.RoomName}`}>
        {roomName}
      </div>
    )}
    <div className={styles.Avatars}>
      <GameAvatars roomStatus={roomStatus} roomUsers={roomUsers} roomMaxCnt={roomMaxCnt}/>
    </div>
    <div className={styles.ElectricPole}>
    <img className={styles.ElectricLine1} src={electricline} alt="GameTemplate" />
    <img className={styles.ElectricLine2} src={electricline} alt="GameTemplate" />

      <img className={styles.ElectricPole} src={electricpole} alt="GameTemplate" />
    </div>
    </>
  );
};

export default GameWaitingPole;