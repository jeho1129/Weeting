import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLogin from '../components/main/MainLogin';
import MainGuest from '../components/main/MainGuest';
import MainSignup from '../components/main/MainSignup';
import MainPage from '@/pages/MainPage';
import GameWaiting from '../components/game/GameWaiting';
import GamePage from '@/pages/GamePage';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<MainGuest />} />
          <Route path="login" element={<MainLogin />} />
          <Route path="signup" element={<MainSignup />} />
        </Route>
        <Route path="/game" element={<GamePage />}>
          <Route index element={<GameWaiting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
