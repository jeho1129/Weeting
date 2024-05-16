import { Axios } from '@/utils/axios';
import { RoomCreateProps } from '@/types/room';
import { getCookie } from '@/utils/axios';

export async function roomCreateApi(param: RoomCreateProps) {
  try {
    const response = await Axios.post(`/chatroom/create`, param, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function roomEnterApi(roomId: string) {
  try {
    const response = await Axios.patch(`/chatroom/${roomId}`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function roomFastEnterApi() {
  try {
    const response = await Axios.patch(`/chatroom/fastenter`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
