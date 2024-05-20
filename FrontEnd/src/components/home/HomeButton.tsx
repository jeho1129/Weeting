import { CaretDoubleLeft, CaretDoubleRight, CaretDoubleDown, CaretDoubleUp, SignOut } from '@phosphor-icons/react';
import styles from '@/styles/home/HomePage.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { removeCookie } from '@/utils/axios';
import { logoutApi } from '@/services/userApi';
import Swal from 'sweetalert2';

const HomeButton = ({
  message,
  direction,
  location,
  size,
}: {
  message: string;
  direction: 'up' | 'down' | 'right' | 'left' | 'back' | 'logout';
  location?: string;
  size?: number;
}) => {
  const navigate = useNavigate();
  const presentLocation = useLocation();

  // const HandleKeyPress = (event) => {
  //   switch (event.key)
  // }

  const logout = () => {
    logoutApi()
      .then(() => {
        removeCookie('accessToken');
        if (localStorage.getItem('localToken')) {
          localStorage.removeItem('localToken');
        }
      })
      .then(() => {
        Swal.fire({
          title: '로그아웃 성공',
          icon: 'success',
        });
        navigate('/');
      });
  };
  return (
    <>
      <div
        className={`${styles.ButtonArrow} ${direction === 'up' ? styles.ButtonArrowUp : direction === 'down' ? styles.ButtonArrowDown : direction === 'left' ? styles.ButtonArrowLeft : direction === 'right' ? styles.ButtonArrowRight : direction === 'back' ? styles.ButtonArrowBack : styles.ButtonLogout}`}
        onClick={() => {
          if (location !== undefined) {
            navigate(`/${location}`, { state: { previousLocationPathname: presentLocation.pathname } });
          }
        }}
      >
        {direction === 'up' ? (
          <CaretDoubleUp size={size ? size : 80} weight="bold" color="#ffffff" />
        ) : direction === 'down' ? (
          <CaretDoubleDown size={size ? size : 80} weight="bold" color="#ffffff" />
        ) : direction === 'left' || direction === 'back' ? (
          <CaretDoubleLeft size={size ? size : 80} weight="bold" color="#ffffff" />
        ) : direction === 'right' ? (
          <CaretDoubleRight size={size ? size : 80} weight="bold" color="#ffffff" />
        ) : (
          <SignOut size={size ? size : 80} weight="bold" color="#ffffff" />
        )}
        <div
          className={`${direction === 'back' ? 'FontM32' : 'FontM60'}`}
          style={{ color: '#ffffff', fontSize: size ? size : direction === 'back' ? 32 : 60 }}
          onClick={() => {
            if (direction === 'logout') {
              logout();
            }
          }}
        >
          {message}
        </div>
      </div>
    </>
  );
};

export default HomeButton;
