import { motion } from 'framer-motion';
import { List } from 'postcss/lib/list';
import React from 'react';

interface Buttons {
    KeyLists: number[]
      setGuess: React.Dispatch<React.SetStateAction<number>>;
    
}

export const Buttons: React.FC<Buttons> = ({ KeyLists, setGuess }) => {
  const adjustGuess = (value: number) => setGuess((prev) => prev + value);
    const writeValue = (value) => `+${value}` ? KeyLists[0] > 0: value;
    return (
        {KeyLists.map((val) => (
            <motion.button
              key={val}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-2 bg-gray-700 dark:bg-gray-200 text-white dark:text-black hover:bg-gray-600 dark:hover:bg-gray-300"
              onClick={() => adjustGuess(val)}
            >
              {writeValue(val)}
            </motion.button>
          ))}
        )
}
