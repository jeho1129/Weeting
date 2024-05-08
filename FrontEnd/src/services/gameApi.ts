import { Axios } from '@/utils/axios';

export async function gameForbiddenWordApi() {
  try {
    const response = await Axios.get(`/chatroom/randomTheme`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
