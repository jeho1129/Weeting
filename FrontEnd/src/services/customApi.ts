import { Axios } from '@/utils/axios';

export async function outfitAllApi(userId: number) {
  try {
    const response = await Axios.get(`/outfit/${userId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function outfitNowApi(userId: number) {
  try {
    const response = await Axios.get(`/outfit/${userId}/worn`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function outfitChangeApi(userId: number, outfitIds: number[]) {
  try {
    const response = await Axios.put(`/outfit/${userId}/wear`, { outfitId: outfitIds });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
