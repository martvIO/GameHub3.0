import React from 'react';
import { cn } from '@/lib/utils';
import type { LetterState } from '@/types/wordle';

interface WordleKeyboardProps {
  onKey: (key: string) => void;
  letterStates: Map<string, LetterState>;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
];

export const WordleKeyboard: React.FC<WordleKeyboardProps> = ({
  onKey,
  letterStates,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto space-y-2">
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1.5">
          {row.map((key) => {
            const state = letterStates.get(key.toLowerCase()) || 'empty';
            const width = key.length > 1 ? 'w-16' : 'w-10';

            return (
              <button
                key={key}
                onClick={() => onKey(key)}
                className={cn(
                  'h-14 rounded font-bold uppercase transition-colors',
                  width,
                  {
                    // Default (Light Mode)
                    'bg-gray-300 text-black': state === 'empty', // Light gray background
                    'bg-green-500 text-white': state === 'correct', // Green background
                    'bg-yellow-500 text-white': state === 'present', // Yellow background
                    'bg-gray-500 text-white': state === 'absent', // Darker gray background

                    // Dark Mode Overrides
                    'dark:bg-gray-600 dark:text-white': state === 'empty', // Dark gray background
                    'dark:bg-green-400 dark:text-black': state === 'correct', // Softer green background
                    'dark:bg-yellow-400 dark:text-black': state === 'present', // Softer yellow background
                    'dark:bg-gray-400 dark:text-black': state === 'absent', // Softer gray background

                    'text-sm': key.length > 1, // Smaller text for special keys
                  }
                )}
              >
                {key === 'Backspace' ? '←' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
