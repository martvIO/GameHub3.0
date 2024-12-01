import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { FaApple, FaAndroid, FaWindows, FaLinux, FaReact, FaVuejs, FaAngular, FaNodeJs } from 'react-icons/fa';
import { GiGamepad, GiChessKnight } from 'react-icons/gi';
import { cn } from '@/lib/utils';

// Update the icon set with additional or alternative icons
const icons: IconType[] = [FaApple, FaAndroid, FaWindows, FaLinux, FaReact, FaVuejs, FaAngular, FaNodeJs, GiGamepad, GiChessKnight];
const shuffledIcons = [...icons, ...icons].sort(() => Math.random() - 0.5);

export const MemoryCardGamePage = () => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      if (shuffledIcons[firstIndex] === shuffledIcons[secondIndex]) {
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
      setMoves((prev) => prev + 1);
    }
  }, [flippedCards]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedCards.includes(index)) {
      setFlippedCards((prev) => [...prev, index]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 py-16 px-4">
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
            <FaReact className="w-8 h-8 text-purple-500 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-white dark:text-gray-900">Memory Card Game</h1>
          <p className="text-gray-400 dark:text-gray-600 max-w-lg mx-auto">Match the pairs of icons. Try to remember their positions!</p>
        </motion.div>

        <p className="text-center text-gray-400 dark:text-gray-500">Moves: {moves}</p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {shuffledIcons.map((Icon, index) => (
            <motion.div
              key={index}
              initial={{ rotateY: 0 }}
              animate={{
                rotateY: flippedCards.includes(index) || matchedCards.includes(index) ? 180 : 0,
              }}
              transition={{ duration: 0.6 }}
              className={cn(
                'w-full aspect-square border-2 flex items-center justify-center text-4xl font-bold rounded cursor-pointer transform preserve-3d',
                {
                  'bg-purple-600 border-purple-700 text-white dark:bg-purple-500 dark:border-purple-600':
                    flippedCards.includes(index) || matchedCards.includes(index),
                  'bg-gray-800 border-gray-700 dark:bg-gray-200 dark:border-gray-300':
                    !flippedCards.includes(index) && !matchedCards.includes(index),
                }
              )}
              onClick={() => handleCardClick(index)}
            >
              <div className="backface-hidden">
                {(flippedCards.includes(index) || matchedCards.includes(index)) && (
                  <Icon className="text-4xl transform -scale-x-100" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {matchedCards.length === icons.length * 2 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">You Won! 🎉</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Congratulations! You matched all the pairs in {moves} moves.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Replay
              </button>
              <button
                onClick={() => window.location.href = '/'}
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
