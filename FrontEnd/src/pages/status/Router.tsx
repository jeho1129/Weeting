import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../login/MainGuestPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
