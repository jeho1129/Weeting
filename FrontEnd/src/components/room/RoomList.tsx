import { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { RoomWaitData } from '@/types/roomWaitData';
import styles from '@/styles/room/RoomList.module.css';
import watingAvatar from '@/assets/images/inGameAvatar.png';
import { Lock } from '@phosphor-icons/react';
import RoomRadioBtn from './RoomRadioBtn';
import roomSign from '@/assets/images/roomSign.png';
import { Client, IMessage } from '@stomp/stompjs';
import { getCookie } from '@/utils/axios';

const RoomList = ({ roomSelectedMode }) => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [serverResponse, setServerResponse] = useState([]);
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/ws');

    ws.onopen = () => {
      console.log('리스트받아오자아');
    };
    // 서버로부터 메시지를 받는 이벤트 리스너 설정
    ws.onmessage = (data) => {
      console.log(data.data);

      // const msg: { nickname: string; highest_simialrity: number } = JSON.parse(score.data);
      // console.log(score.data);

      // 서버로부터 받은 메시지를 상태에 저장
      // setServerResponse((prevList) => [
      //   ...prevList,
      //   {
      //     nickname: msg.nickname,
      //     highest_simialrity: msg.highest_simialrity,
      //   },
      // ]);
    };

    ws.onerror = (error) => {
      console.error('웹소켓 에러 발생:', error);
    };

    setWebSocket(ws);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);
  // WebSocket 연결 설정
  // useEffect(() => {
  //   // WebSocket URL을 서버에서 제공한 경로로 설정
  //   const socket = new Client("ws://localhost:8080/ws/chatroom/list");

  //   // WebSocket이 열릴 때 이벤트 핸들러 설정
  //   socket.onopen = () => {
  //     console.log("WebSocket connection opened.");
  //   };

  //   // 서버로부터 메시지를 수신할 때 호출되는 이벤트 핸들러
  //   socket.onmessage = (event) => {
  //     try {
  //       // 수신된 메시지 데이터를 JSON 객체로 변환
  //       const receivedData = JSON.parse(event.data);
  //       // 상태 업데이트
  //       console.log("receivedData :", receivedData)
  //       setChatRooms(receivedData);
  //     } catch (error) {
  //       console.error("Error parsing received data:", error);
  //     }
  //   };

  //   // WebSocket 연결이 닫힐 때 이벤트 핸들러 설정
  //   socket.onclose = () => {
  //     console.log("WebSocket connection closed.");
  //   };

  //   // 컴포넌트 언마운트 시 WebSocket 연결 닫기
  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  // // 웹소켓
  // useEffect(() => {
  //   const client = new Client({
  //     brokerURL: `ws://localhost:8080/ws`,
  //     reconnectDelay: 5000, // 연결 끊겼을 때, 재연결시도까지 지연시간(ms)
  //     connectHeaders: {
  //       Authorization: `Bearer ${getCookie('accessToken')}`,
  //     },

  //     onConnect: () => {
  //       console.log('연결ㄹㄹㄹㄹ');
  //       client.subscribe(`/chatroom/list`, (res) => {
  //         console.log("res :", res);
  //         const msg: { userId: number; content: string; nickname: string } = JSON.parse(res.body);
  //         console.log(res.body, 'sdf');
  //         // setChatMessages((prevMessages) => [
  //         //   ...prevMessages,
  //         //   { userId: msg.userId, content: msg.content, nickname: msg.nickname, time: new Date().toISOString() },
  //         // ]);
  //         // console.log(msg);
  //       });
  //     },
  //     debug: (str) => {
  //       console.log(new Date(), str);
  //     },
  //   });

  //   client.activate(); // STOMP 클라이언트 활성화
  //   setStompClient(client); // STOMP 클라이언트 상태 업데이트

  //   return () => {
  //     client.deactivate(); // 컴포넌트 언마운트 시, STOMP 클라이언트 비활성화
  //   };
  // }, []);

  const roomEnterHandler = () => {
    console.log('hi');
  };

  return (
    // roomSelectedMode에 따라서 다르게 보여주기
    // roomSelectedMode 0 = 전체, roomSelectedMode 1 = 노말, roomSelectedMode 2 = 랭크
    <ul className={styles.ListGroup}>
      {RoomWaitData.filter((room) => {
        if (roomSelectedMode === 0)
          return true; // 모든 방 보기
        else if (roomSelectedMode === 1)
          return room.roomMode === 'normal'; // 노말 모드의 방만 보기
        else if (roomSelectedMode === 2)
          return room.roomMode === 'rank'; // 랭크 모드의 방만 보기
        else return false;
      }).length === 0 ? (
        <div className={styles.NoRoom}>
          <img src={roomSign} alt="roomSign" />
          {/* <img src={roomBird} alt="roomSign" /> */}
          <div className="FontM32">방이 없어용~!</div>
        </div>
      ) : (
        RoomWaitData.filter((room) => {
          if (roomSelectedMode === 0)
            return true; // 모든 방 보기
          else if (roomSelectedMode === 1)
            return room.roomMode === 'normal'; // 노말 모드의 방만 보기
          else if (roomSelectedMode === 2)
            return room.roomMode === 'rank'; // 랭크 모드의 방만 보기
          else return false;
        }).map((room, index) => (
          <li key={index} className={styles.OneRoom} onClick={roomEnterHandler}>
            <div className={`${styles.FirstRow}`}>
              <div className={`${styles.RoomName} FontM32`}>{room.roomName}</div>
              <div className={`${styles.RoomUsers} FontM20`}>
                {room.roomUsers.length}/{room.roomMaxCnt}
              </div>
              {room.roomPassword !== null ? <Lock className={styles.Lock} size={25} /> : <></>}
            </div>
            <div className={styles.SecondRow}>
              <div></div>
              {room.roomMode === 'rank' ? (
                <div className={`${styles.Mode} ${styles.Rank} FontM20`}>랭크</div>
              ) : (
                <div className={`${styles.Mode} ${styles.Normal} FontM20`}>노말</div>
              )}
            </div>
            <div>
              <img src={watingAvatar} alt="waitingAvatar" className={styles.Avatar} />
            </div>
            <Link to={`/rooms/${room.roomId}`}>
              <h6>
                {room.roomName} <span className="badge badge-info badge-pill">{room.roomUsers.length}</span>
              </h6>
            </Link>
          </li>
        ))
      )}
    </ul>
  );
};

export default RoomList;
