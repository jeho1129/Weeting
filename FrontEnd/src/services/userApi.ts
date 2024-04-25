import { Axios } from '@/services/axios';
import { Login, Signup } from '@/types/user';

export async function loginApi(param: Login) {
  try {
    const response = await Axios.post(`/user/login`, param);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function signupApi(param: Signup) {
  try {
    const response = await Axios.post(`/user/signup`, param);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
