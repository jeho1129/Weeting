import { Outlet } from 'react-router-dom';
import { getCookie } from '@/utils/axios';
import { Navigate } from 'react-router-dom';

export default function PublicRoute() {
  const accessToken: string | undefined = getCookie('accessToken');
  if (accessToken) {
    // 매 이동마다 localStorage에 토큰 갱신
    localStorage.setItem('localToken', `${accessToken} ${new Date().getTime() + 3600000}`); // 한시간 뒤 만료
    return <Navigate to="/home" />;
  }

  return <Outlet />;
}
