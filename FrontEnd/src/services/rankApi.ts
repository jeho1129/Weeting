import { Axios, getCookie } from '@/utils/axios';

export async function rankingListApi() {
  try {
    const response = await Axios.get(`/user/ranking`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
