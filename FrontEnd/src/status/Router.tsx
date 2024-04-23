import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../components/main/MainLogin';
import MainGuestPage from '../components/main/MainGuest';
import SignupPage from '../components/main/MainSignup';

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
