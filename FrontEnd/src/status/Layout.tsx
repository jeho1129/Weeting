import { Outlet } from 'react-router-dom';
import Frame from '@/components/home/HomeFrame';

export default function Layout() {
  return (
    <>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Outlet />
      </div>
      <Frame />
    </>
  );
}
