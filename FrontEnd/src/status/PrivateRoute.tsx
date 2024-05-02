import { Navigate, Outlet } from 'react-router-dom';
import Frame from '@/components/home/HomeFrame';
import { getCookie } from '@/utils/axios';
export default function PrivateRoute() {
  const token: string | undefined = getCookie('accessToken');

  if (token) {
    return (
      <>
        <div style={{ width: '100vw', height: '100vh' }}>
          <Outlet />
        </div>
        <Frame />
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
}
