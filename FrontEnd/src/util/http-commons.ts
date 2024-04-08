// http-commons.ts
import axios from "axios";
import { Cookies } from "react-cookie";

const { VITE_REACT_API_URL } = import.meta.env;
const cookies = new Cookies();

// Axios 인스턴스 생성 함수
const createAxiosInstance = (baseURL?: string) => {
  const instance = axios.create({
    withCredentials: true,
    baseURL: baseURL || "",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  // 요청 인터셉터 설정
  instance.interceptors.request.use(
    (config) => {
      // js-cookie를 사용하여 쿠키에서 accessToken 가져오기
      const accessToken = cookies.get("accessToken");
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

// 설정된 API URL을 사용하는 Axios 인스턴스
const local = createAxiosInstance(VITE_REACT_API_URL);

export { local };
