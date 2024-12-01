import React from 'react';
import { Keyboard } from 'lucide-react';
import { MAX_GUESSES, WORD_LENGTH } from '@/lib/wordle-utils';

export const WordleHeader: React.FC = () => (
  <div className="text-center space-y-4">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 dark:bg-purple-400/10 mb-4">
      <Keyboard className="w-8 h-8 text-purple-500 dark:text-purple-400" />
    </div>
    <h1 className="text-4xl font-bold">Wordle</h1>
    <p className="text-gray-400 dark:text-gray-600 max-w-lg mx-auto">
      Guess the word in {MAX_GUESSES} tries. Each guess must be a valid {WORD_LENGTH}-letter word.
    </p>
  </div>
);
