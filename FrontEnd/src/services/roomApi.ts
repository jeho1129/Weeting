import { Axios } from '@/utils/axios';
import { RoomCreateProps } from '@/types/room';


export async function roomCreateApi(param: RoomCreateProps) {
  try {
    const response = await Axios.post(`uri`, param);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}