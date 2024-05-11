import axios from 'axios';
import { Cookies } from 'react-cookie';
import { CookieSetOptions } from 'universal-cookie';
// React Cookie
const cookies = new Cookies();

const setCookie = (key: string, value: string, option?: CookieSetOptions) => {
  return cookies.set(key, value, { ...option });
};
const getCookie = (key: string) => {
  return cookies.get(key);
};
const removeCookie = (key: string, option?: CookieSetOptions) => {
  return cookies.remove(key, { ...option });
};

// 인터셉터 설정
const createAxiosInstance = () => {
  const instance = axios.create({
    withCredentials: false,
    baseURL: import.meta.env.VITE_API_URL || '',
    headers: {
      Accept: '*',
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const accessToken = cookies.get('accessToken');
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return instance;
};

const Axios = createAxiosInstance();

export { Axios, getCookie, removeCookie, setCookie };
