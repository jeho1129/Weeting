import { CaretDoubleLeft, CaretDoubleRight, CaretDoubleDown, CaretDoubleUp } from '@phosphor-icons/react';
import styles from '@/styles/home/HomePage.module.css';
import { useNavigate } from 'react-router-dom';
const HomeButton = ({
  message,
  direction,
  location,
}: {
  message: string;
  direction: 'up' | 'down' | 'right' | 'left';
  location: string;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`${styles.ButtonArrow} ${direction === 'up' ? styles.ButtonArrowUp : direction === 'down' ? styles.ButtonArrowDown : direction === 'left' ? styles.ButtonArrowLeft : styles.ButtonArrowRight}`}
        onClick={() => navigate(`/${location}`)}
      >
        {direction === 'up' ? (
          <CaretDoubleUp size={80} weight="bold" color="#ffffff" />
        ) : direction === 'down' ? (
          <CaretDoubleDown size={80} weight="bold" color="#ffffff" />
        ) : direction === 'left' ? (
          <CaretDoubleLeft size={80} weight="bold" color="#ffffff" />
        ) : (
          <CaretDoubleRight size={80} weight="bold" color="#ffffff" />
        )}
        <div className="FontM60" style={{ color: '#ffffff' }}>
          {message}
        </div>
      </div>
    </>
  );
};

export default HomeButton;
