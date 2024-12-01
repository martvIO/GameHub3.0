import React from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { cn } from '@/lib/utils';

interface CardProps {
  index: number;
  Icon: IconType;
  flipped: boolean;
  matched: boolean;
  onClick: (index: number) => void;
}

export const Card: React.FC<CardProps> = ({ index, Icon, flipped, matched, onClick }) => {
  return (
    <motion.div
      key={index}
      initial={{ rotateY: 0 }}
      animate={{
        rotateY: flipped || matched ? 180 : 0,
      }}
      transition={{ duration: 0.6 }}
      className={cn(
        'w-full aspect-square border-2 flex items-center justify-center text-4xl font-bold rounded cursor-pointer transform preserve-3d',
        {
          'bg-purple-600 border-purple-700 text-white dark:bg-purple-500 dark:border-purple-600': flipped || matched,
          'bg-gray-800 border-gray-700 dark:bg-gray-200 dark:border-gray-300': !flipped && !matched,
        }
      )}
      onClick={() => onClick(index)}
    >
      <div className="backface-hidden">
        {(flipped || matched) && <Icon className="text-4xl transform -scale-x-100" />}
      </div>
    </motion.div>
  );
};
