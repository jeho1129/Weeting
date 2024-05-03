import styles from '@/styles/home/HomePage.module.css';
import Avatar from './../avatar/Avatar';
import HomeButton from './HomeButton';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import { userState, outfitState } from '@/recoil/atom';
import { logoutApi, userInfoLoadApi } from '@/services/userApi';
import { removeCookie } from '@/utils/axios';
import { useNavigate } from 'react-router-dom';
import { outfitNowApi } from '@/services/customApi';
const Home = () => {
  // 회원정보 조회 계속 해서 리코일에 반영하기
  const setUserInfo = useSetRecoilState(userState);
  const outfitInfo = useRecoilValue(outfitState);
  const setOutfitInfo = useSetRecoilState(outfitState);
  const navigate = useNavigate();
  useEffect(() => {
    userInfoLoadApi()
      .then((data) => {
        console.log(data.dataBody);
        setUserInfo({
          userId: data.dataBody.id,
          nickname: data.dataBody.nickname,
          score: data.dataBody.score,
          ranking: data.dataBody.rank,
        });
        return data.dataBody.id;
      })
      .then((userId) => {
        outfitNowApi(userId).then((data) => {
          setOutfitInfo(data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logOut = () => {
    logoutApi()
      .then(() => {
        alert('로그아웃');
        removeCookie('accessToken');
      })
      .then(() => {
        navigate('/');
      });
  };

  return (
    <>
      <div className={styles.ButtonContainer}>
        <div style={{ backgroundColor: 'aqua' }} onClick={logOut}>
          로그아웃
        </div>
        <HomeButton {...{ message: '커스텀', direction: 'left', location: 'custom' }} />
        <HomeButton {...{ message: '랭킹', direction: 'down', location: 'ranking' }} />
        <HomeButton {...{ message: '게임', direction: 'right', location: 'room' }} />
      </div>
      <div className={styles.AvatarContainer}>
        <Avatar {...{ move: true, size: 400, isNest: true, outfit: outfitInfo }} />
      </div>
      {/* <div className={styles.FrameContainer}>
        <HomeFrame />
      </div> */}
    </>
  );
};

export default Home;
