import Room from '@/components/room/Room';
import ErrorPage from '@/pages/ErrorPage';
import GamePage from '@/pages/GamePage';
import MainPage from '@/pages/MainPage';
import RoomPage from '@/pages/RoomPage';
import { getCookie } from '@/services/axios';
import PrivateRoute from '@/status/PrivateRoute';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GameWaiting from '../components/game/GameWaiting';
import MainGuest from '../components/main/MainGuest';
import MainLogin from '../components/main/MainLogin';
import MainSignup from '../components/main/MainSignup';

const Router = () => {
  const token: string | undefined = getCookie('accessToken');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<MainGuest />} />
          <Route path="login" element={<MainLogin />} />
          <Route path="signup" element={<MainSignup />} />
        </Route>
        <Route element={<PrivateRoute token={token} />}>
          <Route path="/game" element={<GamePage />}>
            <Route index element={<GameWaiting />} />
          </Route>
          <Route path="/room" element={<RoomPage />}>
            <Route index element={<Room />} />
          </Route>
          <Route path="/custom" />
          <Route path="/ranking" />
          {/* <Route path="/home" element={<HomePage />} /> */}
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
