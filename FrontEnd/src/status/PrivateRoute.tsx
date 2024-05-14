import { Navigate, Outlet } from 'react-router-dom';
import { getCookie, setCookie } from '@/utils/axios';

export default function PrivateRoute() {
  const accessToken: string | undefined = getCookie('accessToken');

  if (accessToken) {
    // 매 이동마다 localStorage에 토큰 갱신
    localStorage.setItem('localToken', `${accessToken} ${new Date().getTime() + 3600000}`); // 한시간 뒤 만료
    return <Outlet />;
  } else {
    const localToken: string | null = localStorage.getItem('localToken');
    // localStorage에 토큰 값이 없을 때 로그인화면으로 이동
    if (localToken === null) {
      return <Navigate to="/" />;
    } else {
      const [token, expireTime] = localToken.split(' ');
      // 만료시간이 지났으면 localStorage의 토큰값 지우고 로그인화면으로 이동
      if (+expireTime < new Date().getTime()) {
        localStorage.removeItem('localToken');
        return <Navigate to="/" />;
      }
      // 만료시간이 지나지 않았으면 Cookie에 값을 넣고 outlet 반환
      else {
        setCookie('accessToken', token);
        return <Outlet />;
      }
    }
  }
}
