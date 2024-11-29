import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { PasswordInput } from '@/components/password-game/PasswordInput';
import { RulesList } from '@/components/password-game/RulesList';
import { passwordRules } from '@/lib/password-rules';
import { Button } from '@/components/ui/Button';

export const PasswordGamePage = () => {
  const [password, setPassword] = useState('');
  const [activeRules, setActiveRules] = useState(passwordRules.slice(0, 1));
  const [errors, setErrors] = useState<string[]>([]);

  // Calculate progress percentage
  const progressPercentage = (activeRules.length / passwordRules.length) * 100;

  const validatePassword = useCallback(
    (value: string) => {
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
    },
    [activeRules]
  );

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-100 py-16 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 dark:bg-purple-400/10 mb-4">
            <Lock className="w-8 h-8 text-purple-500 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-white dark:text-gray-900">
            The Password Game
          </h1>
          <p className="text-gray-400 dark:text-gray-500 max-w-lg mx-auto">
            Create a password that meets all the requirements. But be careful - new rules will appear as you progress!
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full bg-gray-800 dark:bg-gray-300 rounded-full h-4 mb-6"
        >
          <motion.div
            className="bg-purple-600 dark:bg-purple-500 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>

        {/* Password Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <PasswordInput
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password..."
            errors={errors}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800/50 dark:bg-gray-200 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-white dark:text-gray-900 mb-4">
              Current Rules
            </h2>
            <RulesList rules={activeRules} currentPassword={password} />
          </motion.div>

          {/* Button for Final Password */}
          {activeRules.length === passwordRules.length && errors.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-purple-600 dark:bg-purple-500 text-white dark:text-white"
              >
                Submit Final Password
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
