import { Axios } from '@/utils/axios';
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

export async function idCheckApi(param: SignupIdCheck) {
  try {
    const response = await Axios.post(`/user/idCheck`, param);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function nicknameCheckApi(param: SignupNicknameCheck) {
  try {
    const response = await Axios.post(`/user/nicknameCheck`, param);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
