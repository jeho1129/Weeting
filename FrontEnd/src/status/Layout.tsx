import { Outlet } from 'react-router-dom';
import Frame from '@/components/home/HomeFrame';
import { useEffect, useRef, useState } from 'react';
import { getResizeEventListener } from '@/utils/responsiveFrame';
import bgMusic from '@/assets/audio/School.mp3';
import { SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react';
import styles from '@/styles/home/HomePage.module.css';

export default function Layout() {
  const [isPlaying, setIsPlaying] = useState(false);
  let audioRef = useRef(new Audio(bgMusic));

  const playMusic = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      audio.onended = () => {
        audio.currentTime = 0;
        audio.play();
      };
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(!isPlaying);
  };

  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = ''; // for chrome. deprectaed.
  };
  useEffect(() => {
    const FixRatio = getResizeEventListener(1536, 833);
    window.onresize = FixRatio;
    FixRatio();
    window.addEventListener('beforeunload', preventClose);
    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
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
          <Outlet />
        </div>
      </div>
      <Frame />
    </>
  );
}
