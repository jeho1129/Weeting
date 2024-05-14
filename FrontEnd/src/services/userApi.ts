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
    const response = await Axios.post(`/user/logout`, {},, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function signupApi(param: Signup) {
  try {
    const response = await Axios.post(`/user/signup`, param,, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function idCheckApi(param: SignupIdCheck) {
  try {
    const response = await Axios.post(`/user/idCheck`, param,, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function nicknameCheckApi(param: SignupNicknameCheck) {
  try {
    const response = await Axios.post(`/user/nicknameCheck`, param,, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function userInfoLoadApi() {
  try {
    const response = await Axios.get(`/user/info`, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function userUpdateApi(nickname: string) {
  try {
    const response = await Axios.patch(`/user/update`, { nickname: nickname }, {
      headers: {
        Authorization: `Bearer ${getCookie('accessToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
