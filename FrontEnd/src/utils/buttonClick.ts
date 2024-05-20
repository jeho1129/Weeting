import bird from '@/assets/audio/bird.mp3';
import error from '@/assets/audio/error.wav';
import over from '@/assets/audio/gameOver.mp3';

export function buttonClick() {
  const audio = new Audio(bird);
  audio.volume = 0.1;
  audio.play();
}

export function buttonError() {
  const audio = new Audio(error);
  audio.volume = 0.6;
  audio.play();
}

export function gameOver() {
  const audio = new Audio(over);
  audio.volume = 0.9;
  audio.play();
}
