import { Outlet } from 'react-router-dom';
import Frame from '@/components/home/HomeFrame';
import { useEffect, useRef, useState } from 'react';
import { getResizeEventListener } from '@/utils/responsiveFrame';
import bgMusic from '@/assets/audio/School.mp3';
import { SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';
import styles from '@/styles/home/HomePage.module.css';
export default function Layout() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(bgMusic));

  const playMusic = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      audio.autoplay;
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const FixRatio = getResizeEventListener(1536, 833);
    window.onresize = FixRatio;
    FixRatio();
  }, []);
  return (
    <>
      <div className="MusicPlayer" style={{ position: 'absolute', top: '0', zIndex: 9999999 }} onClick={playMusic}>
        <div className={styles.RadioBtn}>
          <div className={styles.RadioBtninside}>
            {isPlaying ? <SpeakerHigh size={60} weight="bold" /> : <SpeakerSlash size={60} weight="bold" />}
          </div>
        </div>
      </div>
      <div id="outletContainer">
        <div id="outlet">
          {/* <div id="outlet" style={{ width: '100vw', height: '100vh' }}> */}
          <Outlet />
        </div>
      </div>
      <Frame />
    </>
  );
}
