import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login/LoginPage';
import MainGuestPage from '../pages/login/MainGuestPage';
import SignupPage from '../pages/login/SignupPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainGuestPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
