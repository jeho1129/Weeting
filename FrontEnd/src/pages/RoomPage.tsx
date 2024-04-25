import MainGuestFrame from '@/components/main/MainGuestFrame';
import { Outlet } from 'react-router-dom';

const RoomPage = () => {
  return (
    <>
      <Outlet />
      <MainGuestFrame />
    </>
  );
};

export default RoomPage;
