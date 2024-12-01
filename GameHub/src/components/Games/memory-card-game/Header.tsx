// components/Games/memory-card-game/Header.tsx
import React from 'react';
import { FaReact } from 'react-icons/fa';

export const Header: React.FC = () => (
  <div className="text-center space-y-4">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 dark:bg-purple-400/10 mb-4">
      <FaReact className="w-8 h-8 text-purple-500 dark:text-purple-400" />
    </div>
    <h1 className="text-4xl font-bold text-white dark:text-gray-900">Memory Card Game</h1>
    <p className="text-gray-400 dark:text-gray-600 max-w-lg mx-auto">
      Match the pairs of icons. Try to remember their positions!
    </p>
  </div>
);
