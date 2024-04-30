// import React, {useState, useEffect} from 'react';
// import { Client, IMessage } from "@stomp/stompjs";
// import axios from "axios";
// import { Link, useParams } from "react-router-dom";

// import GameForbiddenWord from '@/components/game/GameWordModal';
// import GameRankModal from '@/components/game/GameRankModal';
// import styles from '@/styles/game/GameWaiting.module.css';
// import GameWaitingLeftSide from '@/components/game/GameWaitingLeftSide';
// import GameWaitingRightSide from '@/components/game/GameWaitingRightSide';
// import { RoomInfo } from '@/types/game';
// import { ChatMessage, ScoreUpdate } from '@/types/chat';

// interface ChatMessageReqeust {
//   from: string;
//   text: string;
//   roomId: number;
// }
// interface ChatMessageResponse{
//   id: number;
//   content: string;
//   writer: string;
// }

// const GameWaiting = () => {
//   const { roomId } = useParams();
//   const [stompClient, setStompClient] = useState<Client | null>(null);
//   const [messages, setMessages] = useState<ChatMessageResponse[]>([]);
//   const [writer, setWriter] = useState<string>("");
//   const [newMessage, setNewMessage] = useState<string>("");
  
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [isRankOpen, setRankOpen] = useState(false);
//   const [choose, setChoose] = useState(false);
//   const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
//   const [scoreUpdates, setScoreUpdates] = useState<ScoreUpdate[]>([]);

//   // 더미 데이터
//   const roomInfo : RoomInfo = {
//     roommode: 'normal',
//     roomid: "1",
//     roomname: "테스트 방",
//     roomstatus: "start",
//     roomforbiddentime: null,
//     roomendtime: null,
//     roommaxcnt: 8,
//     roommembers: [
//       { memberid: "1", nickname: "나야나방장", outfit: "casual",  ready: false, word: null, score:1},
//       { memberid: "2", nickname: "줴훈줴훈", outfit: "sporty", ready: true, word: null, score:2 },
//       { memberid: "3", nickname: "헤엥", outfit: "formal", ready: false, word: null, score:3 },
//       { memberid: "4", nickname: "웅냥냥", outfit: "formal", ready: false, word: null, score:1 },
//       { memberid: "5", nickname: "홀롤로", outfit: "formal", ready: false, word: '바보', score:4 },
//       { memberid: "6", nickname: "웅냐", outfit: "formal", ready: false, word: '메롱', score:67 },
//       { memberid: "7", nickname: "헤위이잉", outfit: "formal", ready: false, word: null, score:1 },
//       { memberid: "8", nickname: "인범머스크", outfit: "formal", ready: false, word: null, score:5 },
//     ]
//   };
//   const [roomStatus, setRoomStatus] = useState(roomInfo.roomstatus);

//   const changeRoomStatus = () => {
//     // roomStatus 상태를 'wordsetting'으로 변경
//     setRoomStatus('wordsetting');
//   };

//   useEffect(() => {
//     // WebSocket 연결 생성
//     const ws = new WebSocket('ws://k10c103.p.ssafy.io:9002/ws/chat');

//     ws.onmessage = (event) => {
//       const message = JSON.parse(event.data);

//       switch(message.type) {
//         case 'chat':
//           setChatMessages(prevMessages => [...prevMessages, message.payload]);
//           break;
//         case 'score':
//           setScoreUpdates(prevScores => [...prevScores, message.payload]);
//           break;
//         default:
//           console.log('Unknown message type');
//       }
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);
//   const addMessage = (newMessage) => {
//     setChatMessages(prevMessages => [...prevMessages, newMessage]);
//   };

//   // setMembers해서 실시간으로 members변경사항 업뎃
  
//   useEffect(() => {
//     if (roomInfo.roomstatus === 'wordsetting' && !choose) {
//       setModalOpen(true);
//     } else if (roomInfo.roomstatus === 'end') {
//       setRankOpen(true);
//     }
//   }, [roomInfo, choose]);

//   return (
//     <>
//       {isModalOpen && <div className={styles.modalOpenBackground}></div>}
//       {isRankOpen && <div className={styles.modalOpenBackground}></div>}

//       <div className={`FontM20 ${styles.SpaceEvenly}`}>
//         <GameWaitingLeftSide roomInfo={roomInfo} scoreUpdates={scoreUpdates} changeRoomStatus={changeRoomStatus}/>
//         <GameWaitingRightSide roomInfo={roomInfo} chatMessages={chatMessages} onSendMessage={addMessage}/>      
//       </div>
//       <GameForbiddenWord 
//         roomInfo={roomInfo}
//         isOpen={isModalOpen}
//         onClose={() => setModalOpen(false)}
//         onConfirm={(word: string) => {
//           console.log("설정된 금칙어:", word);
//           setChoose(true);
//           setModalOpen(false);
//         }}
//       />
//         {isRankOpen && 
//         <GameRankModal 
//           roomInfo={roomInfo}
//           isOpen={isRankOpen}
//           onClose={() => setRankOpen(false)}
//         />
//       }
      
//     </>
//   );
// };

// export default GameWaiting;

import React, {useState, useEffect} from 'react';
import { Client, IMessage } from "@stomp/stompjs";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

import GameForbiddenWord from '@/components/game/GameWordModal';
import GameRankModal from '@/components/game/GameRankModal';
import styles from '@/styles/game/GameWaiting.module.css';
import GameWaitingLeftSide from '@/components/game/GameWaitingLeftSide';
import GameWaitingRightSide from '@/components/game/GameWaitingRightSide';
import { RoomInfo } from '@/types/game';
import { ChatMessage, ScoreUpdate } from '@/types/chat';

interface ChatMessageReqeust {
  from: string;
  text: string;
  roomId: number;
}

interface ChatMessageResponse{
  id: number;
  content: string;
  writer: string;
}

const GameWaiting = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<ChatMessageResponse[]>([]);
  const [writer, setWriter] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");
  
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isRankOpen, setRankOpen] = useState<boolean>(false);
  const [choose, setChoose] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [scoreUpdates, setScoreUpdates] = useState<ScoreUpdate[]>([]);
  
  // 더미 데이터로 useState 초기화
  const [roomInfo, setRoomInfo] = useState<RoomInfo>({
    roommode: 'normal',
    roomid: "1",
    roomname: "테스트 방",
    roomstatus: "waiting",
    roomforbiddentime: null,
    roomendtime: null,
    roommaxcnt: 8,
    roommembers: [
      { userId: "1", nickname: "나야나방장", outfit: "casual",  ready: false, word: null, score:1},
      { userId: "2", nickname: "줴훈줴훈", outfit: "sporty", ready: true, word: null, score:2 },
      { userId: "3", nickname: "헤엥", outfit: "formal", ready: false, word: null, score:3 },
      { userId: "4", nickname: "웅냥냥", outfit: "formal", ready: false, word: null, score:1 },
      { userId: "5", nickname: "홀롤로", outfit: "formal", ready: false, word: '바보', score:4 },
      { userId: "6", nickname: "웅냐", outfit: "formal", ready: false, word: '메롱', score:67 },
      { userId: "7", nickname: "헤위이잉", outfit: "formal", ready: false, word: null, score:1 },
      { userId: "8", nickname: "인범머스크", outfit: "formal", ready: false, word: null, score:5 },
    ]
  });

  const changeRoomStatus = (status: 'waiting' | 'allready' | 'wordsetting' | 'start' | 'end') => {
    setRoomInfo(prev => ({ ...prev, roomstatus: status }));
  };

  const wordSettingOrStart = () => {
    if (roomInfo.roomstatus === 'waiting'){
      changeRoomStatus('wordsetting');
    } else if (roomInfo.roomstatus === 'allready') {
      changeRoomStatus('start');
    } else if (roomInfo.roomstatus === 'start'){
      changeRoomStatus('end');
    }
  };

  useEffect(() => {
    const ws = new WebSocket('ws://k10c103.p.ssafy.io:9002/ws/chat');

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch(message.type) {
        case 'chat':
          setChatMessages(prevMessages => [...prevMessages, message.payload]);
          break;
        case 'score':
          setScoreUpdates(prevScores => [...prevScores, message.payload]);
          break;
        default:
          console.log('Unknown message type');
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (roomInfo.roomstatus === 'wordsetting' && !choose) {
      setModalOpen(true);
    } else if (roomInfo.roomstatus === 'end') {
      setRankOpen(true);
    }
  }, [roomInfo, choose]);

  return (
    <>
      {isModalOpen && <div className={styles.modalOpenBackground}></div>}
      {isRankOpen && <div className={styles.modalOpenBackground}></div>}

      <div className={`FontM20 ${styles.SpaceEvenly}`}>
      <GameWaitingLeftSide roomInfo={roomInfo} scoreUpdates={scoreUpdates} changeRoomStatus={wordSettingOrStart}/>
      <GameWaitingRightSide roomInfo={roomInfo} chatMessages={chatMessages} onSendMessage={(msg) => { console.log(msg); }}/>
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
      {isRankOpen && 
        <GameRankModal 
          roomInfo={roomInfo}
          isOpen={isRankOpen}
          onClose={() => setRankOpen(false)}
        />
      }
      
    </>
  );
};

export default GameWaiting;
