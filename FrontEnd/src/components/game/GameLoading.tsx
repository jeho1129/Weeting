import { useEffect, useState } from 'react';

// loading 틀만 만들어둠
const GameLoading = () => {
  const [countDown, setCountDown] = useState<string>('10');
  useEffect(() => {
    if (+countDown > 0) {
      setTimeout(() => {
        setCountDown(`${+countDown - 1}`);
      }, 1000);
    } else {
      setCountDown('게임 스타트!');
    }
  }, [countDown]);
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
          {countDown}
        </div>
      </div>
      <div style={{ position: 'fixed', backgroundColor: 'transparent', width: '5000px', height: '5000px' }}></div>
    </>
  );
};

export default GameLoading;
