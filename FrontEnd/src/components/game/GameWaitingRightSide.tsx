import { useState } from 'react';
import styles from '@/styles/game/GameWaiting.module.css';
import { RoomInfo, MessageScore } from '@/types/game';
import { ChatMessage } from '@/types/chat';
import GameChattingList from './GameWaitingChattingList';
import GameChattingForm from './GameWaitingChattingForm';
import GameWaitingPole from '@/components/game/GameWaitingPole';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@/recoil/atom';
import { Client } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getCookie } from '@/utils/axios';

const GameWaitingRightSide = ({
  roomInfo,
  webSocketScore,
}: {
  roomInfo: RoomInfo;
  webSocketScore: WebSocket | null;
}) => {
  ///////// 변수 선언 //////////////////////////////////////////////////////
  const roomId = useParams().id;
  const userInfo = useRecoilValue(userState);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  // 채팅 메세지 리스트
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // 채팅방 stomp client 연결
  useEffect(() => {
    const client = new Client({
      brokerURL: `ws://localhost:8080/ws`,
      // brokerURL: `wss://54.180.158.223:9002/ws`,
      reconnectDelay: 5000, // 연결 끊겼을 때, 재연결시도까지 지연시간(ms)
      connectHeaders: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },

      onConnect: () => {
        console.log('-------웹소캣재훈이랑 연결완료-------');
        client.subscribe(`/topic/room.${roomId}`, (message) => {
          const newMessage: { userId: number; content: string; nickname: string; sendTime: string } = JSON.parse(
            message.body,
          );
          setChatMessages((prevMessages) => [
            ...prevMessages,
            {
              userId: newMessage.userId,
              content: newMessage.content,
              nickname: newMessage.nickname,
              sendTime: newMessage.sendTime,
            },
          ]);
        });
      },
    });
    client.activate(); // STOMP 클라이언트 활성화
    setStompClient(client); // STOMP 클라이언트 상태 업데이트

    return () => {
      client.deactivate(); // 컴포넌트 언마운트 시, STOMP 클라이언트 비활성화
    };
  }, [setChatMessages]);

  ///////// 함수 선언 //////////////////////////////////////////////////////
  // 채팅 메세지 보내기
  const onSendMessage = (content: string) => {
    const newMessage = {
      userId: userInfo.userId,
      nickname: userInfo.nickname,
      content: content,
    };

    stompClient?.publish({
      destination: `/pub/api/v1/chat/${roomId}`,
      body: JSON.stringify(newMessage),
    });
  };
  //////////////////////////////////////////////////////////////////////

  return (
    <>
      {/* <div className={styles.RightSide}> */}
      <div className={styles.AlignRight}>
        <GameWaitingPole
          roomName={roomInfo.roomName}
          roomStatus={roomInfo.roomStatus}
          roomUsers={roomInfo.roomUsers}
          roomMaxCnt={roomInfo.roomMaxCnt}
          chatMessage={chatMessages}
        />
        <div className={styles.ChatBoxBorder}></div>
        <div className={styles.ChatBox}>
          <GameChattingList roomUsers={roomInfo.roomUsers} chatMessages={chatMessages} />
        </div>
        <GameChattingForm {...{ roomInfo, webSocketScore, onSendMessage }} onSendMessage={onSendMessage} />
        <div className={styles.ChatBuilding}></div>
      </div>
    </>
  );
};

export default GameWaitingRightSide;
