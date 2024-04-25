import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute(token: { token: string | undefined }) {
  if (token.token) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}
