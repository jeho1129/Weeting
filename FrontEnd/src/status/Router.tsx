import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from '@/status/PrivateRoute';
import PublicRoute from '@/status/PublicRoute';
import Layout from '@/status/Layout';

// components
import Room from '@/components/room/Room';
import MainLogin from '@/components/main/MainLogin';
import MainGuest from '@/components/main/MainGuest';
import MainSignup from '@/components/main/MainSignup';
import GameWaiting from '@/components/game/GameWaiting';

//pages
import CustomPage from '@/pages/CustomPage';
import RankingPage from '@/pages/RankingPage';
import RoomPage from '@/pages/RoomPage';
import MainPage from '@/pages/MainPage';
import GamePage from '@/pages/GamePage';
import HomePage from '@/pages/HomePage';
import TestPage from '@/pages/TestPage';
import ErrorPage from '@/pages/ErrorPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<MainPage />}>
              <Route index element={<MainGuest />} />
              <Route path="login" element={<MainLogin />} />
              <Route path="signup" element={<MainSignup />} />
            </Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/custom" element={<CustomPage />} />
            <Route path="/room/:id" element={<GamePage />}>
              <Route index element={<GameWaiting />} />
            </Route>
            <Route path="/room" element={<RoomPage />}>
              <Route index element={<Room />} />
            </Route>
          </Route>
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<Navigate replace to="/error" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
