import { useState } from 'react';
import { generateRandomNumber } from '@/lib/utils';

export function useNumberGuessingGame(maxAttempts: number = 10) {
  const [randomNumber, setRandomNumber] = useState<number>(generateRandomNumber(1, 100));
  const [guess, setGuess] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);

  const handleGuess = () => {
    if (gameOver) return;

    setAttempts((prev) => prev + 1);

    if (guess === randomNumber) {
      setFeedback(`🎉 Correct! The number was ${randomNumber}`);
      setHasWon(true);
      setGameOver(true);
    } else if (guess < randomNumber) {
      setFeedback(`📉 Too Low!`);
    } else {
      setFeedback(`📈 Too High!`);
    }

    if (attempts + 1 >= maxAttempts && guess !== randomNumber) {
      setFeedback(`😢 You've run out of attempts! The number was ${randomNumber}`);
      setHasWon(false);
      setGameOver(true);
    }
  };

  const handleReplay = () => {
    setRandomNumber(generateRandomNumber(1, 100));
    setGuess(0);
    setFeedback('');
    setAttempts(0);
    setGameOver(false);
    setHasWon(false);
  };

  return {
    guess,
    setGuess,
    feedback,
    attempts,
    maxAttempts,
    gameOver,
    hasWon,
    handleGuess,
    handleReplay,
  };
}
