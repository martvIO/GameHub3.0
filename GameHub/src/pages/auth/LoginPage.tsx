/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Gamepad2 } from 'lucide-react';
import { login } from '@/service/Auth';
import { SigninForm } from '@/components/layout/SigninForm';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

export const LoginPage: React.FC = () => {
  return (
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
        <SigninForm/>
      </div>
    </div>
  );
};
