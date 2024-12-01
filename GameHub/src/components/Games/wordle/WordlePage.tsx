import React from 'react';
import { motion } from 'framer-motion';
import { WordleGrid } from '@/components/Games/wordle/WordleGrid';
import { WordleKeyboard } from '@/components/Games/wordle/WordleKeyboard';
import { GameEndModal } from '@/components/ui/GameEndModal';
import { WordleHeader } from '@/components/Games/wordle/WordleHeader';
import { useWordle } from '@/hooks/useWordle';
import { useNavigate } from 'react-router-dom';

export const WordlePage: React.FC = () => {
  const navigate = useNavigate();
  const { gameState, letterStates, onKey } = useWordle();

  const handleReplay = () => window.location.reload();
  const handleHome = () => navigate('/home');

  return (
    <div className="min-h-screen bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 py-16 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <WordleHeader />

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
        <GameEndModal
          hasWon={gameState.gameStatus === 'won'}
          message={
            gameState.gameStatus === 'won'
              ? 'Congratulations!'
              : `The word was: ${gameState.solution.toUpperCase()}`
          }
          onReplay={handleReplay}
          onHome={handleHome}
        />
      )}
    </div>
  );
};
