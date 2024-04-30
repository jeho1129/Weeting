import React from 'react'
import { RoomInfo } from '@/types/game';
import GameAvatars from '@/components/game/GameWaitingAvatars';
import styles from '@/styles/game/GameWaiting.module.css';
import electricpole from '@/assets/images/electricpole.png';

const GameWaitingPole = ({roomname, roomstatus, roommembers, roommaxcnt}: { roomname:RoomInfo["roomname"],roomstatus:RoomInfo["roomstatus"], roommembers: RoomInfo["roommembers"], roommaxcnt: RoomInfo["roommaxcnt"]}) => {
  return (
    <>
    {roomstatus !== 'start' && (
      <div className={`FontM32 ${styles.RoomName}`}>
        {roomname}
      </div>
    )}
    <div className={styles.Avatars}>
      <GameAvatars roomstatus={roomstatus} roommembers={roommembers} roommaxcnt={roommaxcnt}/>
    </div>
      <img className={styles.ElectricPole} src={electricpole} alt="GameTemplate" />
    </>
  );
};

export default GameWaitingPole;