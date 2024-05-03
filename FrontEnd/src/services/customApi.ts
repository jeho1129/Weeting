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

export async function outfitChangeApi(userId: number, outfitId: number) {
  try {
    const response = await Axios.patch(`/outfit/change`, { userId: userId, outfitId: outfitId });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
