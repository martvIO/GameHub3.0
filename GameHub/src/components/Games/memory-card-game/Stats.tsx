// components/Games/memory-card-game/Stats.tsx
import React from 'react';

interface StatsProps {
  moves: number;
  time: string;
}

export const Stats: React.FC<StatsProps> = ({ moves, time }) => (
  <div className="flex justify-center space-x-8 text-gray-400 dark:text-gray-500">
    <p>Moves: {moves}</p>
    <p>Time: {time}</p>
  </div>
);
