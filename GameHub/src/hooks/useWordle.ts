import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { WORD_LENGTH, MAX_GUESSES, getRandomWord, isValidWord, checkGuess } from '@/lib/wordle-utils';
import { LetterState } from '@/types/wordle';

export const useWordle = () => {
  const [gameState, setGameState] = useState({
    solution: getRandomWord(),
    guesses: [] as string[],
    currentGuess: '',
    gameStatus: 'playing',
    currentRow: 0,
  });
  const [letterStates] = useState<Map<string, LetterState>>(new Map());

  const addGuess = useCallback((guess: string) => {
    if (guess.length !== WORD_LENGTH || !isValidWord(guess)) {
      toast.error('Invalid word!');
      return;
    }

    const newGuesses = [...gameState.guesses, guess];
    const states = checkGuess(guess, gameState.solution);

    states.forEach((state, i) => {
      const letter = guess[i].toLowerCase();
      const currentState = letterStates.get(letter);
      if (state === 'correct' || (state === 'present' && currentState !== 'correct')) {
        letterStates.set(letter, state);
      } else if (!currentState && state === 'absent') {
        letterStates.set(letter, state);
      }
    });

    let status = gameState.gameStatus;
    if (guess === gameState.solution) {
      status = 'won';
      toast.success('Congratulations! You won! 🎉');
    } else if (newGuesses.length === MAX_GUESSES) {
      status = 'lost';
      toast.error(`Game Over! The word was: ${gameState.solution.toUpperCase()}`);
    }

    setGameState((prev) => ({
      ...prev,
      guesses: newGuesses,
      currentGuess: '',
      gameStatus: status,
      currentRow: prev.currentRow + 1,
    }));
  }, [gameState, letterStates]);

  const onKey = useCallback(
    (key: string) => {
      if (gameState.gameStatus !== 'playing') return;

      if (key === 'Backspace') {
        setGameState((prev) => ({
          ...prev,
          currentGuess: prev.currentGuess.slice(0, -1),
        }));
      } else if (key === 'Enter') {
        addGuess(gameState.currentGuess);
      } else if (/^[a-zA-Z]$/.test(key) && gameState.currentGuess.length < WORD_LENGTH) {
        setGameState((prev) => ({
          ...prev,
          currentGuess: prev.currentGuess + key.toLowerCase(),
        }));
      }
    },
    [gameState, addGuess]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace' || e.key === 'Enter' || /^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault(); // Prevent default browser actions
        onKey(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKey]);

  return {
    gameState,
    letterStates,
    addGuess,
    onKey,
  };
};
