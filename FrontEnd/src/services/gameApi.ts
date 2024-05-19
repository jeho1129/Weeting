import { Axios } from '@/utils/axios';
import axios from 'axios';
import { getCookie } from '@/utils/axios';

export async function gameReadyApi(roomId: string) {
  try {
    const response = await Axios.patch(`/chatroom/game/ready/${roomId}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function gameDeadApi(roomId: string) {
  try {
    const response = await Axios.patch(`/chatroom/game/dead/${roomId}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

// export async function gameAllReadyApi(roomId: string) {
//   try {
//     const response = await Axios.patch(`/chatroom/game/status/${roomId}`, {roomId});
//     return response.data;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// }

export async function gameStartApi(roomId: string) {
  try {
    const response = await Axios.patch(`/chatroom/game/start/${roomId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function chatroomHistory(roomId: string) {
  try {
    const response = await Axios.get(`/chat/history/${roomId}`);
    // , {
    //   headers: {
    //     Authorization: `Bearer ${getCookie('accessToken')}`,
    //   },
    // });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function gameOutApi(roomId: string) {
  try {
    const response = await Axios.patch(`/chatroom/leave/${roomId}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

// api 문제있는듯
export async function forbiddenWordSettingDataApi({
  nickname,
  forbiddenWord,
}: {
  nickname: string;
  forbiddenWord: string;
}) {
  try {
    const response = axios.post(
      'http://3.39.208.35:8000/api/v1/forbidden',
      // 'localhost:8000/api/v1/forbidden',
      { userId: nickname, forbiddenWord: forbiddenWord },
      {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      },
    );
    /////////////////////////////////////////^api주소 바꿈///////^이거 nickname으로 바꿔야함//////////////////////////
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function forbiddenWordSettingApi({ roomId, forbiddenWord }: { roomId: string; forbiddenWord: string }) {
  try {
    const response = await Axios.patch(
      `/chatroom/game/wordsetting/${roomId}`,
      { word: forbiddenWord },
      {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      },
    );
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function gameOverApi(roomId: string) {
  try {
    const response = await Axios.patch(`/chatroom/game/dead/${roomId}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
