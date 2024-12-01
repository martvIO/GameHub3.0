// components/Games/password-game/PasswordGamePage.tsx
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/Games/password-game/HeroSection';
import { ProgressBar } from '@/components/Games/password-game/ProgressBar';
import { PasswordInput } from '@/components/Games/password-game/PasswordInput';
import { RulesList } from '@/components/Games/password-game/RulesList';
import { Button } from '@/components/ui/Button';
import { passwordRules } from '@/lib/password-rules';
import { validatePassword } from '@/lib/password-utils';
export const PasswordGamePage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [activeRules, setActiveRules] = useState(passwordRules.slice(0, 1));
  const [errors, setErrors] = useState<string[]>([]);

  // Calculate progress percentage
  const progressPercentage = (activeRules.length / passwordRules.length) * 100;

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value, activeRules, setActiveRules, setErrors);
  }, [activeRules]);

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-100 py-16 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        {/* Hero Section */}
        <HeroSection />

        {/* Progress Bar */}
        <ProgressBar progressPercentage={progressPercentage} />

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
