import React from 'react'
import { RoomInfo } from '@/types/game';
import GameAvatars from '@/components/game/GameWaitingAvatars';
import styles from '@/styles/game/GameWaiting.module.css';
import electricpole from '@/assets/images/electricpole.png';

const GameWaitingPole = ({roomstatus, roommembers, roommaxcnt}: { roomstatus:RoomInfo["roomstatus"], roommembers: RoomInfo["roommembers"], roommaxcnt: RoomInfo["roommaxcnt"]}) => {
  return (
    <>
    <div className={styles.RoomName}>
      dddddd
    </div>
    <div className={styles.Avatars}>
      <GameAvatars roomstatus={roomstatus} roommembers={roommembers} roommaxcnt={roommaxcnt}/>
    </div>
      <img className={styles.ElectricPole} src={electricpole} alt="GameTemplate" />
    </>
  );
};

export default GameWaitingPole;