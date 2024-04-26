import React from 'react'
import { RoomInfo } from '@/types/game';
import GameAvatars from '@/components/game/GameWaitingAvatars';
import styles from '@/styles/game/GameWaiting.module.css';
import electricpole from '@/assets/images/electricpole.png';

const GameWaitingPole = ({roommembers, roommaxcnt}: { roommembers: RoomInfo["roommembers"], roommaxcnt: RoomInfo["roommaxcnt"]}) => {
  return (
    <><div style={{position:'absolute' ,top:'0'}}>
      <GameAvatars roommembers={roommembers} roommaxcnt={roommaxcnt}/>
    </div>
      <img className={styles.ElectricPole} src={electricpole} alt="GameTemplate" />
    </>
  );
};

export default GameWaitingPole;