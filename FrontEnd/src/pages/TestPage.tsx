// import React, { useState, useEffect } from 'react';
// import * as Stomp from 'stompjs';
// // import SockJS from 'sockjs-client';

// const TestPage: React.FC = () => {
//   const [client, setClient] = useState<Stomp.Client | null>(null);
//   const [messages, setMessages] = useState<string[]>([]);
//   const [inputMessage, setInputMessage] = useState('');

//   useEffect(() => {
//     connect();
//     return () => {
//       disconnect();
//     };
//   }, []);

//   const connect = () => {
//     const socket = new WebSocket('ws://k10c103.p.ssafy.io:9002/chatroom/{roomId}');
//     // const stompClient = Stomp.over(socket);
//     // stompClient.connect({}, (frame) => {
//     //   console.log('Connected: ' + frame);
//     //   stompClient.subscribe('/{roomId}', (messageOutput) => {
//     //     displayMessage(messageOutput.body);
//     //   });
//     // });
//     // setClient(stompClient);
//   };

//   const disconnect = () => {
//     if (socket) {
//         socket.disconnect(() => {
//         console.log('Disconnected');
//       });
//     }
//   };

//   const sendMessage = () => {
//     if (socket && inputMessage.trim() !== '') {
//         socket.send('/app/sendMessage', {}, inputMessage);
//       setInputMessage('');
//     }
//   };

//   const displayMessage = (message: string) => {
//     console.log(messages);

//     setMessages((prevMessages) => [...prevMessages, message]);
//   };

//   return (
//     <div>
//       <h2>Chat Room</h2>
//       <div id="chatWindow" style={{ height: '300px', overflow: 'auto', border: '1px solid #ccc', padding: '10px' }}>
//         {messages.map((message, index) => (
//           <div key={index}>{message}</div>
//         ))}
//       </div>
//       <input
//         type="text"
//         value={inputMessage}
//         onChange={(e) => setInputMessage(e.target.value)}
//         placeholder="Type your message here..."
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default TestPage;
import React, { useState, useEffect, useRef } from 'react';

interface Message {
  text: string;
}

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const websocket = useRef<WebSocket | null>(null);

  useEffect(() => {
    connectWebSocket();
    return () => {
      websocket.current?.close();
    };
  }, []);

  const connectWebSocket = () => {
    const roomId = 1;
    // websocket.current = new WebSocket(`ws://localhost:8080/chatroom/${roomId}`);
    websocket.current = new WebSocket(`ws://localhost:8080/chatroom/${roomId}`);

    websocket.current.onopen = () => {
      console.log('Connected to the chat server');
      displayMessage('Connected to the chat server');
    };

    websocket.current.onmessage = (event) => {
      console.log('Received message: ' + event.data);
      displayMessage(event.data);
    };

    websocket.current.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };

    websocket.current.onclose = () => {
      console.log('Disconnected from the chat server');
      displayMessage('Disconnected from the chat server');
    };
  };

  const sendMessage = (message: string) => {
    websocket.current?.send(message);
  };

  const displayMessage = (message: string) => {
    setMessages((prevMessages) => [...prevMessages, { text: message }]);
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div id="chatWindow" style={{ height: '300px', overflow: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((message, index) => (
          <div key={index}>{message.text}</div>
        ))}
      </div>
      <input
        type="text"
        id="messageInput"
        placeholder="Type your message here..."
        onKeyDown={(e) => e.key === 'Enter' && sendMessage(e.currentTarget.value)}
      />
      <button
        onClick={() => {
          const input = document.getElementById('messageInput') as HTMLInputElement;
          sendMessage(input.value);
          input.value = '';
        }}
      >
        Send
      </button>
    </div>
  );
};

export default ChatRoom;
