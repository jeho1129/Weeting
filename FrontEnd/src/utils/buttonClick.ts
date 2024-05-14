import bird from '@/assets/audio/bird.mp3';
import error from '@/assets/audio/error.wav';

export function buttonClick() {
  const audio = new Audio(bird);
  audio.play();
}

export function buttonError() {
  const audio = new Audio(error);
  audio.play();
}
