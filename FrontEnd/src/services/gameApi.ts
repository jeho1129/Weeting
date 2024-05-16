import { Axios } from '@/utils/axios';
import axios from 'axios';
import { getCookie } from '@/utils/axios';

export async function gameForbiddenWordApi() {
  try {
    const response = await Axios.get(`/chatroom/randomTheme`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

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

export async function gameStatusUpdateApi(roomId: string) {
  try {
    const response = await Axios.patch(`api/v1/chatroom/game/status/${roomId}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
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

export async function shuffleMemberApi(num: number) {
  try {
    const response = await Axios.patch(`/chatroom/randomNumbers/${num}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function forbiddenWordSettingApi({
  nickname,
  forbiddenWord,
}: {
  nickname: string;
  forbiddenWord: string;
}) {
  try {
    const response = axios.post(
      'localhost:8000/forbidden',
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
