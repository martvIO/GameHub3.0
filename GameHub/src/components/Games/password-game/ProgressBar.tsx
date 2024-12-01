// components/Games/password-game/ProgressBar.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progressPercentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progressPercentage }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="w-full bg-gray-800 dark:bg-gray-300 rounded-full h-4 mb-6"
  >
    <motion.div
      className="bg-purple-600 dark:bg-purple-500 h-full rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${progressPercentage}%` }}
      transition={{ duration: 0.8 }}
    />
  </motion.div>
);
