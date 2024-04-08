/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_API_URL: string;
  readonly BASE_URL: string;
  // 여기에 추가 환경 변수 선언 가능
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
