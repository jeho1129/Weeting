import { Outlet } from 'react-router-dom';
import Frame from '@/components/home/HomeFrame';
import { useEffect } from 'react';
import { getResizeEventListener } from '@/utils/responsiveFrame';

export default function Layout() {
  useEffect(() => {
    const FixRatio = getResizeEventListener(1536, 833);
    window.onresize = FixRatio;
    FixRatio();
  }, []);
  return (
    <>
      <div id="outletContainer">
        <div id="outlet">
          {/* <div id="outlet" style={{ width: '100vw', height: '100vh' }}> */}
          <Outlet />
        </div>
      </div>
      <Frame />
    </>
  );
}
