import { wordlist } from "../assets/output.json";
import { normal_wordlist } from "../assets/normal_output.json";

const reversedWordSet = new Set(
  wordlist.filter(word => word.length > 3)
);

export const passwordRules = [
  {
    id: 1,
    description: "Your password must be at least 6 characters long",
    validator: (password: string) => password.length >= 6,
    errorMessage: "Password is too short"
  },
  {
    id: 2,
    description: "Password cannot include the word 'password'",
    validator: (password: string) => !password.toLowerCase().includes('password'),
    errorMessage: "Password cannot contain the word 'password'"
  },
  {
    id: 3,
    description: "Must contain at least one repeated character",
    validator: (password: string) => {
      for (let i = 0; i < password.length - 1; i++) {
        if (password[i] === password[i + 1]) return true;
      }
      return false;
    },
    errorMessage: "Need at least one repeated character"
  },
  {
    id: 4,
    description: "Include at least one punctuation mark",
    validator: (password: string) => /[.,!?;:]/.test(password),
    errorMessage: "Missing punctuation mark"
  },
  {
    id: 5,
    description: "Start and end with different letters",
    validator: (password: string) => {
      if (password.length < 2) return false;
      return password[0].toLowerCase() !== password[password.length - 1].toLowerCase();
    },
    errorMessage: "First and last characters must be different"
  },
  {
    id: 6,
    description: "Must contain at least three vowels",
    validator: (password: string) => {
      const vowels = password.toLowerCase().match(/[aeiou]/g);
      return vowels ? vowels.length >= 3 : false;
    },
    errorMessage: "Need at least three vowels"
  },
  {
    id: 7,
    description: "Include at least one sequence of consecutive letters",
    validator: (password: string) => {
      const letters = password.toLowerCase();
      for (let i = 0; i < letters.length - 2; i++) {
        if (
          letters.charCodeAt(i) + 1 === letters.charCodeAt(i + 1) &&
          letters.charCodeAt(i + 1) + 1 === letters.charCodeAt(i + 2)
        ) {
          return true;
        }
      }
      return false;
    },
    errorMessage: "Need a sequence of consecutive letters (e.g., 'abc')"
  },
  {
    id: 8,
    description: "Must contain at least one palindrome",
    validator: (password: string) => {
      for (let i = 0; i < password.length - 2; i++) {
        for (let j = i + 2; j < password.length; j++) {
          const substr = password.slice(i, j + 1);
          if (substr === substr.split('').reverse().join('')) {
            return true;
          }
        }
      }
      return false;
    },
    errorMessage: "Need a palindrome (e.g., 'eye' or '121')"
  },
  {
    id: 9,
    description: "Include at least one digit that is a prime number",
    validator: (password: string) => {
      const primes = ['2', '3', '5', '7'];
      return primes.some(prime => password.includes(prime));
    },
    errorMessage: "Need a prime number (2, 3, 5, or 7)"
  },
  {
    id: 10,
    description: "Must contain a word spelled backward",
    validator: (password: string) => {
      // Generate all substrings of length > 3 from the password
      const lowerPassword = password.toLowerCase();
      for (let i = 0; i < lowerPassword.length - 3; i++) {
        for (let j = i + 4; j <= lowerPassword.length; j++) {
          const substring = lowerPassword.slice(i, j);
          if (reversedWordSet.has(substring)) {
            return true; // Match found
          }
        }
      }
      return false; // No matches
    },
    errorMessage: "Need a reversed word (e.g., 'tac' for 'cat')"
  },
  {
    id: 11,
    description: "All the numbers must add up to 30",
    validator: (password: string) => {
      const numbers = password.match(/\d/g)?.map(Number) || [];
      return numbers.reduce((sum, num) => sum + num, 0) === 30;
    },
    errorMessage: "The sum of all numbers in the password must equal 30",
  },
  {
    id: 12,
    description: "The password should include at least one Roman numeral",
    validator: (password: string) => {
      return getRomanNumeralValue(password) > 0;
    },
    errorMessage: "Password must include at least one Roman numeral (e.g., I, V, X)",
  },
  {
    id: 13,
    description: "All Roman numeral values must add up to 35",
    validator: (password: string) => {
      return getRomanNumeralValue(password) == 35;
    },
    errorMessage: "The sum of all Roman numeral values in the password must equal 35",
  }
  ,
  {
    id: 14,
    description: "The product of all numbers must be greater than 10,000",
    validator: (password: string) => {
      const numbers = password.match(/\d/g)?.map(Number) || [];
      if (numbers.length === 0) return false;
      const product = numbers.reduce((prod, num) => prod * num, 1);
      return product > 10_000;
    },
    errorMessage: "The product of all numbers in the password must be greater than 10,000",
  },
  {
    id:15,
    description: "the password must only contain valid words",
    validator: (password: string) => {
      // Split password into words by removing numbers and symbols
      const words = password.split(/[^a-zA-Z]+/).filter(Boolean);

      // Check if all words are valid based on normal_wordlist
      return words.every((word) => normal_wordlist.includes(word.toLowerCase()));
    },
    errorMessage: "password should contain only valid words"
  },
] as const;

function getRomanNumeralValue(input: string): number {
  // Define the Roman numeral values
  const romanValues: { [key: string]: number } = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000
  };

  // Function to convert a Roman numeral string to an integer
  const romanToInt = (roman: string): number => {
      let value = 0;
      for (let i = 0; i < roman.length; i++) {
          const current = romanValues[roman[i]];
          const next = romanValues[roman[i + 1]] || 0;
          if (current < next) {
              value -= current;
          } else {
              value += current;
          }
      }
      return value;
  };

  // Helper function to check if a character is a valid Roman numeral
  const isRomanChar = (char: string): boolean =>
      "IVXLCDM".includes(char);

  // Extract Roman numeral substrings manually and handle numeric context
  let currentRoman = "";
  let totalValue = 0;
  let previousNumber = null;

  for (const char of input) {
      if (!isNaN(Number(char))) {
          // If it's a number, store it for potential conflict
          previousNumber = Number(char);
      } else if (isRomanChar(char)) {
          currentRoman += char;
      } else {
          // Handle end of a Roman numeral sequence
          if (currentRoman.length > 0) {
              const romanValue = romanToInt(currentRoman);

              // Adjust for conflict with the previous number
              if (previousNumber !== null && previousNumber === romanValue) {
                  totalValue -= romanValue; // Subtract if conflict
              } else {
                  totalValue += romanValue;
              }

              currentRoman = ""; // Reset for the next sequence
          }
          previousNumber = null; // Reset number context
      }
  }

  // Add the last Roman numeral sequence if it exists
  if (currentRoman.length > 0) {
      const romanValue = romanToInt(currentRoman);
      if (previousNumber !== null && previousNumber === romanValue) {
          totalValue -= romanValue;
      } else {
          totalValue += romanValue;
      }
  }
  console.log(totalValue);
  return totalValue;
}