import { useEffect, useState } from 'react';
import { RoomInfo } from '@/types/game';

// ((new Date(forbiddenTime!).getTime() - new Date().getTime()) / 1000).toFixed(0).toString(),
// loading 틀만 만들어둠
const GameLoading = ({ roomInfo }: { roomInfo: RoomInfo }) => {
  const forbiddenTime: string | null = roomInfo.roomForbiddenTime;
  const [loadingTimeLeft, setloadingTimeLeft] = useState('');

  useEffect(() => {
    if (forbiddenTime != null) {
      setloadingTimeLeft(
        ((new Date(forbiddenTime).getTime() + 10 * 1000 - new Date().getTime()) / 1000).toFixed(0).toString(),
      );
    }
  }, [roomInfo]);

  useEffect(() => {
    if (roomInfo.roomStatus === 'wordfinish') {
      const timerId = setInterval(() => {
        setloadingTimeLeft(
          ((new Date(forbiddenTime!).getTime() + 10 * 1000 - new Date().getTime()) / 1000).toFixed(0).toString(),
        );
      }, 1000);

      setTimeout(() => {
        clearInterval(timerId);
        setloadingTimeLeft('0');
      }, 15000);
    } else {
    }
  }, [roomInfo]);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          zIndex: '999',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className={`FontM60`} style={{}}>
          {loadingTimeLeft}
        </div>
      </div>
      <div style={{ position: 'fixed', backgroundColor: 'transparent', width: '5000px', height: '5000px' }}></div>
    </>
  );
};

export default GameLoading;
