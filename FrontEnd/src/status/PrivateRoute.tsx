import { Navigate, Outlet } from 'react-router-dom';
import Frame from '@/components/home/HomeFrame';

export default function PrivateRoute(token: { token: string | undefined }) {
  if (token.token) {
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
