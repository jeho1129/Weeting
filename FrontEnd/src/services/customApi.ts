import { Axios } from '@/utils/axios';

export async function outfitAllApi({ userId }: { userId: number }) {
  try {
    const response = await Axios.get(`/outfit/${userId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function outfitNowApi({ userId }: { userId: number }) {
  try {
    const response = await Axios.get(`/outfit/${userId}/worn`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function outfitChangeApi() {
  try {
    const response = await Axios.put(`/outfit/change`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
