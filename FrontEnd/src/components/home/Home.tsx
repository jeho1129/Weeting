import styles from '@/styles/home/HomePage.module.css';
import Avatar from './../avatar/Avatar';
import HomeButton from './HomeButton';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { userState, outfitState } from '@/recoil/atom';
import { logoutApi, userInfoLoadApi } from '@/services/userApi';
import { useNavigate } from 'react-router-dom';
import { outfitNowApi } from '@/services/customApi';
const Home = () => {
  // 회원정보 조회 계속 해서 리코일에 반영하기
  const setUserInfo = useSetRecoilState(userState);
  const outfitInfo = useRecoilValue(outfitState);
  const setOutfitInfo = useSetRecoilState(outfitState);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

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
      .then((userId) => {
        outfitNowApi(userId).then((data) => {
          setOutfitInfo(data);
          setIsLoading(true);
        });
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
      <div className={styles.AvatarContainer}>
        {isLoading ? (
          <Avatar
            {...{
              size: 400,
              outfit: outfitInfo,
              location: 'Home',
              options: { isNest: true },
            }}
          />
        ) : (
          <></>
        )}
      </div>
      {/* <div className={styles.FrameContainer}>
        <HomeFrame />
      </div> */}
    </>
  );
};

export default Home;
