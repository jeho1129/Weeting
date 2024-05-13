import { Axios } from '@/utils/axios';
import axios from 'axios';

export async function gameForbiddenWordApi() {
  try {
    const response = await Axios.get(`/chatroom/randomTheme`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function gameOutApi(roomId: string) {
  try {
    const response = await Axios.patch(`/chatroom/leave/${roomId}`);
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
    const response = axios.post('localhost:8000/forbidden', { userId: nickname, forbiddenWord: forbiddenWord });
    /////////////////////////////////////////^api주소 바꿈///////^이거 nickname으로 바꿔야함//////////////////////////
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}
