import { Navigate, Outlet } from 'react-router-dom';
import { getCookie } from '@/utils/axios';
export default function PrivateRoute() {
  const token: string | undefined = getCookie('accessToken');

  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}
