import { toast } from 'react-hot-toast';
import { passwordRules } from './password-rules';

// Function to validate the password based on active rules and manage state accordingly
export const validatePassword = (
  value: string,
  activeRules: typeof passwordRules,
  setActiveRules: React.Dispatch<React.SetStateAction<typeof passwordRules>>,
  setErrors: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const errors: string[] = [];

  // Validate each active rule and collect errors
  const allRulesValid = activeRules.every((rule) => {
    const isValid = rule.validator(value);
    if (!isValid) errors.push(rule.errorMessage);
    return isValid;
  });

  // Update errors state
  setErrors(errors);

  // Unlock the next rule if all current rules are satisfied
  if (allRulesValid && activeRules.length < passwordRules.length) {
    const nextRule = passwordRules[activeRules.length];
    setActiveRules((prev) => [...prev, nextRule]);
    toast.success('New rule unlocked!', { icon: '🎉', duration: 2000 });
  }
};

// Function to convert Roman numeral strings to integer values
export function getRomanNumeralValue(input: string): number {
  const romanValues: Record<string, number> = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  // Helper function to convert a Roman numeral string to an integer
  const romanToInt = (roman: string): number => {
    let total = 0;
    for (let i = 0; i < roman.length; i++) {
      const current = romanValues[roman[i]];
      const next = romanValues[roman[i + 1]] || 0;
      total += current < next ? -current : current;
    }
    return total;
  };

  // Helper to check if a character is a valid Roman numeral
  const isRomanChar = (char: string): boolean => 'IVXLCDM'.includes(char);

  let currentRoman = '';
  let totalValue = 0;
  let previousNumber: number | null = null;

  // Parse the input string to handle both Roman numerals and numbers
  for (const char of input) {
    if (!isNaN(Number(char))) {
      previousNumber = Number(char);
    } else if (isRomanChar(char)) {
      currentRoman += char;
    } else {
      if (currentRoman) {
        const romanValue = romanToInt(currentRoman);
        totalValue += previousNumber === romanValue ? -romanValue : romanValue;
        currentRoman = '';
      }
      previousNumber = null;
    }
  }

  // Add any remaining Roman numeral sequence
  if (currentRoman) {
    const romanValue = romanToInt(currentRoman);
    totalValue += previousNumber === romanValue ? -romanValue : romanValue;
  }

  return totalValue;
}
