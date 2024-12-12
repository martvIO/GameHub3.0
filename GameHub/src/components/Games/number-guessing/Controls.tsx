import React from 'react';
import { motion } from 'framer-motion';
import { Buttons } from '@/components/Games/number-guessing/Buttons';
interface InputControlsProps {
  guess: number;
  setGuess: React.Dispatch<React.SetStateAction<number>>;
}

export const InputControls: React.FC<InputControlsProps> = ({ guess, setGuess }) => {
  const adjustGuess = (value: number) => setGuess((prev) => prev + value);

  return (
    <div className="flex items-center justify-center mb-4">
      <Buttons KeyLists={[-1,-5,-10]} setGuess={setGuess}></Buttons>
      <motion.input
        type="number"
        value={guess}
        onChange={(e) => setGuess(Number(e.target.value))}
        className="w-20 p-2 text-center text-black dark:text-gray-900 border border-gray-400 dark:border-gray-700 focus:outline-none appearance-none"
      />
      {[1, 5, 10].map((val) => (
        <motion.button
          key={val}
          whileHover={{ scale: 1.1 }}
          className="px-3 py-2 bg-gray-700 dark:bg-gray-200 text-white dark:text-black hover:bg-gray-600 dark:hover:bg-gray-300"
          onClick={() => adjustGuess(val)}
        >
          {`+${val}`}
        </motion.button>
      ))}
    </div>
  );
};
