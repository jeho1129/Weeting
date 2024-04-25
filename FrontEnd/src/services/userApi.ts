import { Axios } from '@/services/axios';
import { Login, Signup } from '@/types/user';

export async function loginApi(param: Login) {
  return Axios.post(`/user/login`, param);
}

export async function signupApi(param: Signup) {
  return Axios.post(`/user/signup`, param);
}

