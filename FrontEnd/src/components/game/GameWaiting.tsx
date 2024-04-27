import React, {useState, useEffect} from 'react';
import GameForbiddenWord from '@/components/game/GameWordModal';
import styles from '@/styles/game/GameWaiting.module.css';
import GameWaitingLeftSide from '@/components/game/GameWaitingLeftSide';
import GameWaitingRightSide from '@/components/game/GameWaitingRightSide';
import { RoomInfo } from '@/types/game';

const GameWaiting = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [choose, setChoose] = useState(false); // 금칙어가 설정되었는지 여부

  // 더미 데이터
  const roomInfo : RoomInfo = {
    roomid: "12345",
    roomname: "테스트 방",
    roomstatus: "allready",
    roomforbiddentime: null,
    roomendtime: null,
    roommaxcnt: 8,
    roommembers: [
      { memberid: "1", nickname: "나야나방장", outfit: "casual",  ready: false },
      { memberid: "2", nickname: "줴훈줴훈", outfit: "sporty", ready: true },
      { memberid: "3", nickname: "헤엥", outfit: "formal", ready: false },
      { memberid: "4", nickname: "웅냥냥", outfit: "formal", ready: false },
      { memberid: "5", nickname: "홀롤로", outfit: "formal", ready: false },
      { memberid: "6", nickname: "웅냐", outfit: "formal", ready: false },
      { memberid: "7", nickname: "헤위이잉", outfit: "formal", ready: false },
      { memberid: "8", nickname: "인범머스크", outfit: "formal", ready: false },
    ]
  };

  // setMembers해서 실시간으로 변경사항 업뎃
  
  useEffect(() => {
    if (roomInfo.roomstatus === 'wordsetting' && !choose) {
      setModalOpen(true);
    }
  }, [roomInfo, choose]);

  return (
    <>
      {isModalOpen && <div className={styles.modalOpenBackground}></div>}

      <div className={styles.SpaceEvenly}>
        <GameWaitingLeftSide roomInfo={roomInfo}/>
        <GameWaitingRightSide roomInfo={roomInfo}/>
      </div>
      <GameForbiddenWord 
        roomInfo={roomInfo}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={(word: string) => {
          console.log("설정된 금칙어:", word);
          setChoose(true);
          setModalOpen(false);
        }}
      />
    </>
  );
};

export default GameWaiting;