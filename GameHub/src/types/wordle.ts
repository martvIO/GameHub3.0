export interface WordleState {
  solution: string;
  guesses: string[];
  currentGuess: string;
  gameStatus: 'playing' | 'won' | 'lost';
  currentRow: number;
}

export type LetterState = 'correct' | 'present' | 'absent' | 'empty';

export interface KeyboardKey {
  key: string;
  state: LetterState;
  width?: number;
}