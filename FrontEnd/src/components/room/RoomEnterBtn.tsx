import styles from '@/styles/room/RoomEnterBtn.module.css';
import { useNavigate } from 'react-router-dom';
import { roomFastEnterApi } from '@/services/roomApi';
import Swal from 'sweetalert2';

const RoomEnterBtn = () => {
  const navigate = useNavigate();
  const enterHandler = async () => {
    try {
      const response = await roomFastEnterApi();
      if (response.dataHeader.successCode === 0) {
        const { roomId } = response.dataBody;
        navigate(`/room/${roomId}`);
      } else {
        Swal.fire({
          title: '현재 입장할 수 있는 방이 없습니다.',
          icon: 'error',
        });
        // console.log('방 입장 실패:');
      }
    } catch (error) {
      console.error('방 입장 중 에러 발생:', error);
    }
  };

  return (
    <button onClick={enterHandler} className={`${styles.QuickEnterBtn} FontM32`}>
      빠른입장
    </button>
  );
};

export default RoomEnterBtn;
