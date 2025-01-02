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
    const isValid = rule.validator(value); // Validate the current value against the rule
    if (!isValid) {
      newErrors.push(rule.errorMessage); // Collect error messages for rules that fail
    }
    return isValid; // Return whether the rule is valid
  });

  setErrors(newErrors); // Update the error state with the new errors

  // Only add a new rule if all current rules are completed
  if (allRulesCompleted && activeRules.length < passwordRules.length) {
    const nextRule = passwordRules[activeRules.length]; // Get the next rule to activate
    setActiveRules((prev) => [...prev, nextRule]); // Update active rules with the new rule
    toast.success('New rule unlocked!', {
      icon: '🎉',
      duration: 2000,
    }); // Notify the user of the new rule
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
          const current = romanValues[roman[i]]; // Get the value of the current Roman numeral
          const next = romanValues[roman[i + 1]] || 0; // Get the value of the next Roman numeral (default to 0 if none)
          if (current < next) {
              value -= current; // Subtract if the current numeral is smaller than the next
          } else {
              value += current; // Otherwise, add the value
          }
      }
      return value; // Return the calculated integer value
  };

  // Helper function to check if a character is a valid Roman numeral
  const isRomanChar = (char: string): boolean =>
      "IVXLCDM".includes(char); // Check if the character is one of the valid Roman numeral characters

  // Extract Roman numeral substrings manually and handle numeric context
  let currentRoman = ""; // Store the current Roman numeral sequence
  let totalValue = 0; // Accumulate the total value of all Roman numeral sequences
  let previousNumber = null; // Store the last encountered number for conflict checks

  for (const char of input) {
      if (!isNaN(Number(char))) {
          // If it's a number, store it for potential conflict
          previousNumber = Number(char);
      } else if (isRomanChar(char)) {
          currentRoman += char; // Append valid Roman numeral characters to the current sequence
      } else {
          // Handle end of a Roman numeral sequence
          if (currentRoman.length > 0) {
              const romanValue = romanToInt(currentRoman); // Convert the sequence to an integer value

              // Adjust for conflict with the previous number
              if (previousNumber !== null && previousNumber === romanValue) {
                  totalValue -= romanValue; // Subtract if conflict exists
              } else {
                  totalValue += romanValue; // Otherwise, add the value
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
          totalValue -= romanValue; // Subtract if conflict exists
      } else {
          totalValue += romanValue; // Otherwise, add the value
      }
  }

  return totalValue; // Return the total value of all Roman numeral sequences
}
