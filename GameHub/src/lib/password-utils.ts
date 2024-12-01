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
