import { Navigate, Outlet } from 'react-router-dom';
import Layout from './TransitionGroup';

export default function PrivateRoute(token: { token: string | undefined }) {
  if (token.token) {
    return (
      <>
        <div style={{ width: '100vw', height: '100vh' }}>
          <Outlet />
        </div>
        <Layout />
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
}
