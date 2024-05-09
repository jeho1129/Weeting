import styles from '@/styles/room/RoomEnterBtn.module.css';
import { useNavigate } from 'react-router-dom';

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const RoomEnterBtn = () => {
  const navigate = useNavigate();
  const enterHandler = () => {
    const randomNumber = getRandom(1, 9);
    navigate(`/room/${randomNumber}`);
  };

  return (
    <button onClick={enterHandler} className={`${styles.QuickEnterBtn} FontM32`}>
      빠른입장
    </button>
  );
};

export default RoomEnterBtn;
