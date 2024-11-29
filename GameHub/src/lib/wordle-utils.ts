import { LetterState } from '@/types/wordle';
import { normal_wordlist } from '../assets/normal_output.json';

// Define constants for the game
export const WORD_LENGTH = 5; // The length of each word in the game
export const MAX_GUESSES = 6; // The maximum number of guesses allowed

// Filter the word list to include only words with the correct length and remove duplicates
export const VALID_WORDS = Array.from(new Set(normal_wordlist.filter((word) => word.length === WORD_LENGTH)));

/**
 * Get a random word from the list of valid words.
 * This word will act as the solution for the game.
 * @returns {string} A random word from the VALID_WORDS array
 */
export function getRandomWord(): string {
  return VALID_WORDS[Math.floor(Math.random() * VALID_WORDS.length)];
}

/**
 * Check the player's guess against the solution.
 * Each letter in the guess is assigned a state:
 * - 'correct': Letter is in the correct position.
 * - 'present': Letter is in the word but in the wrong position.
 * - 'absent': Letter is not in the word.
 *
 * @param {string} guess - The player's guessed word
 * @param {string} solution - The correct word to guess
 * @returns {LetterState[]} An array of states ('correct', 'present', 'absent') for each letter in the guess
 */
export function checkGuess(guess: string, solution: string): LetterState[] {
  const result: LetterState[] = Array(WORD_LENGTH).fill('absent'); // Initialize all letters as 'absent'
  const solutionArray = [...solution]; // Convert the solution to an array for easier manipulation
  const guessArray = [...guess]; // Convert the guess to an array for easier manipulation

  // First pass: Mark correct letters
  guessArray.forEach((letter, i) => {
    if (letter === solutionArray[i]) {
      result[i] = 'correct'; // Letter is in the correct position
      solutionArray[i] = '#'; // Mark the letter in the solution as used
      guessArray[i] = '*'; // Mark the letter in the guess as processed
    }
  });

  // Second pass: Mark present letters
  guessArray.forEach((letter, i) => {
    if (letter === '*') return; // Skip letters already processed in the first pass
    const solutionIndex = solutionArray.indexOf(letter); // Check if the letter exists in the solution
    if (solutionIndex !== -1) {
      result[i] = 'present'; // Letter is in the solution but in the wrong position
      solutionArray[solutionIndex] = '#'; // Mark the letter in the solution as used
    }
  });

  return result; // Return the array of letter states
}

/**
 * Check if a given word is valid (i.e., exists in the valid words list).
 * @param {string} word - The word to validate
 * @returns {boolean} True if the word is valid, false otherwise
 */
export function isValidWord(word: string): boolean {
  return VALID_WORDS.includes(word.toLowerCase()); // Convert to lowercase for case-insensitive matching
}
