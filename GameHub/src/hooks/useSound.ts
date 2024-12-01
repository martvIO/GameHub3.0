import win from '@/assets/audio/win.mp3';
import lose from '@/assets/audio/lose.mp3';
export const playWinSound = () => {
    const audio = new Audio(win); // Adjust the path based on your file location
    audio.volume = 0.5;
    audio.play().catch((err) => console.error('Error playing sound:', err));
  };

export const playLoseSound = () => {
    const audio = new Audio(lose); // Adjust the path based on your file location
    audio.volume = 0.5;
    audio.play().catch((err) => console.error('Error playing sound:', err));
  };