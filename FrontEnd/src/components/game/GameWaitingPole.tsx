import { RoomInfo } from '@/types/game';
import GameAvatars from '@/components/game/GameWaitingAvatars';
import styles from '@/styles/game/GameWaiting.module.css';
import electricpole from '@/assets/images/electricpole.png';

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
      <img className={styles.ElectricPole} src={electricpole} alt="GameTemplate" />
    </>
  );
};

export default GameWaitingPole;