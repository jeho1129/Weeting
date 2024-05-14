import bird from '@/assets/audio/bird.mp3';

export function buttonClick() {
  const audio = new Audio(bird);
  audio.play();
}
