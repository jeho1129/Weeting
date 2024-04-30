import { Axios } from '@/utils/axios';

export async function rankingListApi() {
  try {
    const response = await Axios.get(`/ranking`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
