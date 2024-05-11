import styles from '@/styles/home/HomePage.module.css';
import Avatar from '../avatar/Avatar';
import HomeButton from './HomeButton';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { userState, outfitState } from '@/recoil/atom';
import { userInfoLoadApi } from '@/services/userApi';
import { AvatarProps } from '@/types/avatar';
const Home = () => {
  // 회원정보 조회 계속 해서 리코일에 반영하기
  const userInfo = useRecoilValue(userState);
  const setUserInfo = useSetRecoilState(userState);
  const [avatarFirstProps, setAvatarFirstProps] = useState<AvatarProps>({
    userId: userInfo.userId,
    size: 400,
    location: 'Home',
    options: { isNest: true },
  });
  const [clickCnt, setClickCnt] = useState(0);
  useEffect(() => {
    userInfoLoadApi()
      .then((data) => {
        console.log(data.dataBody);
        setUserInfo({
          userId: data.dataBody.id,
          nickname: data.dataBody.nickname,
          score: data.dataBody.score,
          ranking: data.dataBody.ranking,
        });
        return data.dataBody.id;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className={styles.ButtonContainer}>
        <HomeButton {...{ message: '로그아웃', direction: 'logout', size: 30 }} />
        <HomeButton {...{ message: '커스텀', direction: 'left', location: 'custom' }} />
        <HomeButton {...{ message: '랭킹', direction: 'down', location: 'ranking' }} />
        <HomeButton {...{ message: '게임', direction: 'right', location: 'room' }} />
      </div>
      <div className={styles.AvatarContainer} onClick={() => setClickCnt(clickCnt + 1)}>
        <Avatar {...avatarFirstProps} />
      </div>
      {clickCnt >= 7 && (
        <div style={{ position: 'absolute' }}>
          <button
            onClick={() => {
              setAvatarFirstProps({
                userId: userInfo.userId,
                size: 400,
                location: 'Home',
                options: { isNest: true, isAlive: false },
              });
            }}
          >
            응애나주거
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
