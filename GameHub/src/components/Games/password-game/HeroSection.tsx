// components/Games/password-game/HeroSection.tsx
import React from 'react';
import { Lock } from 'lucide-react';

export const HeroSection: React.FC = () => (
  <div className="text-center space-y-4">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 dark:bg-purple-400/10 mb-4">
      <Lock className="w-8 h-8 text-purple-500 dark:text-purple-400" />
    </div>
    <h1 className="text-4xl font-bold text-white dark:text-gray-900">
      The Password Game
    </h1>
    <p className="text-gray-400 dark:text-gray-500 max-w-lg mx-auto">
      Create a password that meets all the requirements. But be careful - new
      rules will appear as you progress!
    </p>
  </div>
);
