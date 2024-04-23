import MainGuestFrame from '@/components/main/MainGuestFrame';
import { Outlet } from 'react-router-dom';

const MainPage = () => {
  return (
    <>
      <Outlet />
      <MainGuestFrame />;
    </>
  );
};

export default MainPage;
