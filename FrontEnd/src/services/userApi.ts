import { Login, Signup, SignupIdCheck, SignupNicknameCheck } from '@/types/user';
import { Axios } from '@/utils/axios';
import { getCookie } from '@/utils/axios';

export async function loginApi(param: Login) {
  try {
    const response = await Axios.post(`/user/login`, param);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function logoutApi() {
  try {
    const response = await Axios.post(`/user/logout`, {});
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

export async function userInfoLoadApi() {
  try {
    console.log('accessToken', getCookie('accessToken'));
    const response = await Axios.get(`/user/info`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function userUpdateApi(nickname: string) {
  try {
    console.log('accessToken', getCookie('accessToken'));
    const response = await Axios.patch(`/user/update`, { nickname: nickname });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
