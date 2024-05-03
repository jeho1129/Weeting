import { useState, useEffect } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { Link, useParams } from 'react-router-dom';

import GameForbiddenWord from '@/components/game/GameWordModal';
import GameRankModal from '@/components/game/GameRankModal';
import styles from '@/styles/game/GameWaiting.module.css';
import GameWaitingLeftSide from '@/components/game/GameWaitingLeftSide';
import GameWaitingRightSide from '@/components/game/GameWaitingRightSide';
import { RoomInfo } from '@/types/game';
import { ChatMessage, ScoreUpdate } from '@/types/chat';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { gameState } from '@/recoil/atom';

interface ChatMessageReqeust {
  from: string;
  text: string;
  roomId: number;
}

interface ChatMessageResponse {
  id: number;
  content: string;
  writer: string;
}

const GameWaiting = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<ChatMessageResponse[]>([]);
  const [writer, setWriter] = useState<string>('');
  const [newMessage, setNewMessage] = useState<string>('');

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isRankOpen, setRankOpen] = useState<boolean>(false);
  const [choose, setChoose] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [scoreUpdates, setScoreUpdates] = useState<ScoreUpdate[]>([]);

  // 더미 데이터로 useState 초기화
  const dummy = useRecoilValue(gameState);
  const [roomInfo, setRoomInfo] = useState<RoomInfo>(dummy);
  const setGameState = useSetRecoilState(gameState);
  useEffect(() => {
    const dummy2: RoomInfo = {
      roomMode: 'normal',
      roomId: 1,
      roomName: '테스트 방',
      roomStatus: 'allready',
      roomForbiddentime: null,
      roomEndtime: null,
      roomSubject: null,
      roomMaxCnt: 8,
      roomUsers: [
        { userId: 9, nickname: '하하호호', outfit: 'casual', ready: false, word: '안녕', score: 1, isAlive: true },
        { userId: 2, nickname: '줴훈줴훈', outfit: 'sporty', ready: true, word: '안녕', score: 2, isAlive: true },
        { userId: 3, nickname: '헤엥', outfit: 'formal', ready: true, word: '안녕', score: 3, isAlive: false },
        { userId: 4, nickname: '웅냥냥', outfit: 'formal', ready: true, word: '안녕', score: 1, isAlive: true },
        { userId: 5, nickname: '홀롤로', outfit: 'formal', ready: true, word: '바보', score: 4, isAlive: false },
        { userId: 6, nickname: '웅냐', outfit: 'formal', ready: true, word: '메롱', score: 67, isAlive: true },
        { userId: 7, nickname: '헤위이잉', outfit: 'formal', ready: true, word: '안녕', score: 1, isAlive: true },
        { userId: 8, nickname: '인범머스크', outfit: 'formal', ready: true, word: '안녕', score: 5, isAlive: true },
      ],
    };
    setRoomInfo(dummy2);

    //api호출 후 .then 안에서
    setGameState(dummy2);
  }, []);

  const changeRoomStatus = (status: 'waiting' | 'allready' | 'wordsetting' | 'start' | 'end') => {
    setRoomInfo((prev) => ({ ...prev, roomStatus: status }));
  };

  const wordSettingOrStart = () => {
    if (roomInfo.roomStatus === 'waiting') {
      changeRoomStatus('wordsetting');
    } else if (roomInfo.roomStatus === 'allready') {
      changeRoomStatus('start');
    } else if (roomInfo.roomStatus === 'start') {
      changeRoomStatus('end');
    }
  };

  useEffect(() => {
    const ws = new WebSocket('ws://k10c103.p.ssafy.io:9002/ws/chat');

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case 'chat':
          setChatMessages((prevMessages) => [...prevMessages, message.payload]);
          break;
        case 'score':
          setScoreUpdates((prevScores) => [...prevScores, message.payload]);
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
    if (roomInfo.roomStatus === 'wordsetting' && !choose) {
      setModalOpen(true);
    } else if (roomInfo.roomStatus === 'end') {
      setRankOpen(true);
    }
  }, [roomInfo, choose]);

  useEffect(() => {
    const allWordsSet = roomInfo.roomUsers.every((user) => user.word !== null);

    if (allWordsSet) {
      changeRoomStatus('start');
    }
  }, [roomInfo.roomUsers]);

  return (
    <>
      {isModalOpen && <div className={styles.modalOpenBackground}></div>}
      {isRankOpen && <div className={styles.modalOpenBackground}></div>}

      <div className={`FontM20 ${styles.SpaceEvenly}`}>
        <GameWaitingLeftSide roomInfo={roomInfo} scoreUpdates={scoreUpdates} changeRoomStatus={wordSettingOrStart} />
        <GameWaitingRightSide
          roomInfo={roomInfo}
          chatMessages={chatMessages}
          onSendMessage={(msg) => {
            console.log(msg);
          }}
        />
      </div>
      <GameForbiddenWord
        roomInfo={roomInfo}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={(word: string) => {
          console.log('설정된 금칙어:', word);
          setChoose(true);
          setModalOpen(false);
        }}
      />
      {isRankOpen && (
        <GameRankModal
          roomInfo={roomInfo}
          isOpen={isRankOpen}
          onClose={() => setRankOpen(false)}
          onStatusChange={() => {
            setRoomInfo((prev) => ({ ...prev, roomStatus: 'waiting', roomSubject: null }));
          }}
        />
      )}
    </>
  );
};

export default GameWaiting;
