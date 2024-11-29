import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Keyboard } from 'lucide-react';
import { WordleGrid } from '@/components/wordle/WordleGrid';
import { WordleKeyboard } from '@/components/wordle/WordleKeyboard';
import { WORD_LENGTH, MAX_GUESSES, getRandomWord, isValidWord, checkGuess } from '@/lib/wordle-utils';
import { useNavigate } from 'react-router-dom';
import { LetterState } from '@/types/wordle';

export const WordlePage = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState({
    solution: getRandomWord(),
    guesses: [],
    currentGuess: '',
    gameStatus: 'playing',
    currentRow: 0,
  });
  const [letterStates, setLetterStates] = useState<Map<string, LetterState>>(new Map());

  const addGuess = useCallback((guess: string) => {
    if (guess.length !== WORD_LENGTH) return;
    if (!isValidWord(guess)) {
      toast.error('Not a valid word!');
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
  }, [gameState.guesses, gameState.solution, letterStates]);

  const onKey = useCallback((key: string) => {
    if (gameState.gameStatus !== 'playing') return;

    if (key === 'Backspace') {
      setGameState((prev) => ({
        ...prev,
        currentGuess: prev.currentGuess.slice(0, -1),
      }));
    } else if (key === 'Enter') {
      addGuess(gameState.currentGuess);
    } else if (/^[A-Z]$/.test(key) && gameState.currentGuess.length < WORD_LENGTH) {
      setGameState((prev) => ({
        ...prev,
        currentGuess: prev.currentGuess + key.toLowerCase(),
      }));
    }
  }, [gameState.currentGuess, gameState.gameStatus, addGuess]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        onKey('Backspace');
      } else if (e.key === 'Enter') {
        onKey('Enter');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        onKey(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKey]);

  const handleReplay = () => {
    window.location.reload();
  };

  const handleHome = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 py-16 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 dark:bg-purple-400/10 mb-4">
            <Keyboard className="w-8 h-8 text-purple-500 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold">
            Wordle
          </h1>
          <p className="text-gray-400 dark:text-gray-600 max-w-lg mx-auto">
            Guess the word in {MAX_GUESSES} tries. Each guess must be a valid {WORD_LENGTH}-letter word.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <WordleGrid
            guesses={gameState.guesses}
            currentGuess={gameState.currentGuess}
            solution={gameState.solution}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <WordleKeyboard onKey={onKey} letterStates={letterStates} />
        </motion.div>
      </motion.div>

      {gameState.gameStatus !== 'playing' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {gameState.gameStatus === 'won' ? 'You Won! 🎉' : 'Game Over! 😞'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {gameState.gameStatus === 'lost' && `The word was: ${gameState.solution.toUpperCase()}`}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleReplay}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Replay
              </button>
              <button
                onClick={handleHome}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                Home
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
