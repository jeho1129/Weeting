import GameWaitingFrame from '@/components/game/GameWaitingFrame';
import { Outlet } from 'react-router-dom';

const MainPage = () => {
  return (
    <>
      <Outlet />
      <GameWaitingFrame />;
    </>
  );
};

export default MainPage;
