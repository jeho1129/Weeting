import { Axios } from '@/utils/axios';

export async function gameForbiddenWordApi() {
  try {
    const response = await Axios.get(`/chatroom/randomTheme`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function gameOutApi(roomId:string) {
  try {
    const response = await Axios.patch(`/chatroom/leave/${roomId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}