import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';

interface SigninLayoutProps {
  children: React.ReactNode;
  errorMessage?: string;
}

export const SigninLayout: React.FC<SigninLayoutProps> = ({ children, errorMessage }) => (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-100 flex items-center justify-center px-4">
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-purple-400 dark:text-purple-500">
          <Gamepad2 size={32} />
          <span>GameHub</span>
        </Link>
        <h2 className="mt-6 text-3xl font-bold text-white dark:text-gray-900">Welcome back</h2>
        <p className="mt-2 text-gray-400 dark:text-gray-500">
          Sign in to your account to continue
        </p>
      </div>
    
        {/* Error message display */}
        {errorMessage && (
            <p className="text-sm text-red-500 text-center">{errorMessage}</p>
        )}

        {children}
    </div>
    </div>
);
