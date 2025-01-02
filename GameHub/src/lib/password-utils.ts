import { toast } from 'react-hot-toast';
import { passwordRules } from './password-rules';

export const validatePassword = (
  value: string,
  activeRules: typeof passwordRules,
  setActiveRules: React.Dispatch<React.SetStateAction<typeof passwordRules>>,
  setErrors: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const newErrors: string[] = [];

  // Check all active rules
  const allRulesCompleted = activeRules.every((rule) => {
    const isValid = rule.validator(value);
    if (!isValid) {
      newErrors.push(rule.errorMessage);
    }
    return isValid;
  });

  setErrors(newErrors);

  // Only add a new rule if all current rules are completed
  if (allRulesCompleted && activeRules.length < passwordRules.length) {
    const nextRule = passwordRules[activeRules.length];
    setActiveRules((prev) => [...prev, nextRule]);
    toast.success('New rule unlocked!', {
      icon: '🎉',
      duration: 2000,
    });
  }
};

export function getRomanNumeralValue(input: string): number {
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