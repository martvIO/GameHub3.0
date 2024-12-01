import React from 'react';
import { motion } from 'framer-motion';
import { GameEndModal } from '@/components/ui/GameEndModal';
import { useNumberGuessingGame } from '@/hooks/useNumberGuessingGame';
import { InputControls } from '@/components/Games/number-guessing/Controls';
import { ArrowUp10 } from 'lucide-react';

export const NumberGuessingGame: React.FC = () => {
  const {
    guess,
    setGuess,
    feedback,
    attempts,
    maxAttempts,
    gameOver,
    hasWon,
    handleGuess,
    handleReplay,
  } = useNumberGuessingGame();

  return (
    <>  
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col justify-center items-center bg-gray-900 dark:bg-gray-100 text-white dark:text-black p-8"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-md w-full bg-gray-800 dark:bg-white rounded-lg p-6 shadow-lg text-center"
      >
        <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 dark:bg-purple-400/10 mb-4">
            <ArrowUp10 className="w-8 h-8 text-purple-500 dark:text-purple-400" />
            </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Number Guessing Game</h1>
        <p className="text-gray-400 dark:text-gray-600 mb-6">Guess the number between 1 and 100</p>
        
        <InputControls guess={guess} setGuess={setGuess} />

        <motion.button
          whileHover={{ scale: 1.1 }}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          onClick={handleGuess}
        >
          Submit Guess
        </motion.button>

        <p className="text-gray-400 dark:text-gray-600 mt-4">Attempts: {attempts} / {maxAttempts}</p>
        {feedback && !gameOver && <p className="text-lg text-purple-400 dark:text-purple-500 mt-4">{feedback}</p>}
      </motion.div>

      {gameOver && (
        <GameEndModal
          hasWon={hasWon}
          message={feedback}
          onReplay={handleReplay}
          onHome={() => (window.location.href = '/')}
        />
      )}
    </motion.div>
    </>
  );
};
