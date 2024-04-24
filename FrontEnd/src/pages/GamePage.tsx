import GameWaitingFrame from '@/components/game/GameWaitingFrame';
import { Outlet } from 'react-router-dom';


const GamePage = () => {
  return (
    <>
       <Outlet />
      <GameWaitingFrame />
    </>
  );
};

export default GamePage;
