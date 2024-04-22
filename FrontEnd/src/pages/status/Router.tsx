import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../login/LoginPage';
import MainPage from '../main/MainPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
