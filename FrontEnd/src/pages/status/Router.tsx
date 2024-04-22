import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../login/LoginPage';
import MainGuestPage from '../login/MainGuestPage';
import SignupPage from '../login/SignupPage';

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
