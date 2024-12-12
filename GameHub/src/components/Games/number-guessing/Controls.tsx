import React from 'react';
import { motion } from 'framer-motion';
import { Buttons } from '@/components/Games/number-guessing/Buttons';
interface InputControlsProps {
  guess: number;
  setGuess: React.Dispatch<React.SetStateAction<number>>;
}

export const InputControls: React.FC<InputControlsProps> = ({ guess, setGuess }) => {
  const setGuesserValue = (e: React.ChangeEvent<HTMLInputElement>) => setGuess(Number(e.target.value));

  return (
    <div className="flex items-center justify-center mb-4">
      <Buttons KeyLists={[-1,-5,-10]} setGuess={setGuess}/>
      <motion.input
        type="number"
        value={guess}
        onChange={(e) => setGuesserValue(e)}
        className="w-20 p-2 text-center text-black dark:text-gray-900 border border-gray-400 dark:border-gray-700 focus:outline-none appearance-none"
      />
      <Buttons KeyLists={[1,5,10]} setGuess={setGuess}/>
    </div>
  );
};
