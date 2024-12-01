import React from 'react';
import { motion } from 'framer-motion';

interface GameEndModalProps {
  hasWon: boolean; // New prop to determine if the player won or lost
  message: string;
  onReplay: () => void;
  onHome: () => void;
}

export const GameEndModal: React.FC<GameEndModalProps> = ({ hasWon, message, onReplay, onHome }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-800 dark:bg-white p-8 rounded-lg shadow-lg text-center"
      >
        <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
          {hasWon ? 'You Won! 🎉' : 'You Lost! 😢'}
        </h2>
        <p className="text-gray-400 dark:text-gray-600 mb-6">
          {message}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onReplay}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Replay
          </button>
          <button
            onClick={onHome}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};
