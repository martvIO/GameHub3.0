/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { login } from '@/service/Auth';
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    login(data['email'],data['password']);
  };

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

    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      <div className="space-y-4">
        <Input
          type="email"
          placeholder="Email address"
          {...register('email')}
          error={errors.username?.message?.toString() || ''}
          className="bg-gray-800 dark:bg-gray-200 text-gray-100 dark:text-gray-900"
        />
        <Input
          type="password"
          placeholder="Password"
          {...register('password')}
          error={errors.username?.message?.toString() || ''}
          className="bg-gray-800 dark:bg-gray-200 text-gray-100 dark:text-gray-900"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('rememberMe')}
            className="rounded border-gray-700 bg-gray-800 dark:bg-gray-200 dark:text-purple-500 focus:ring-purple-500"
          />
          <span className="text-sm text-gray-300 dark:text-gray-500">Remember me</span>
        </label>
        <Link to="/forgot-password" className="text-sm text-purple-400 dark:text-purple-500 hover:text-purple-300 dark:hover:text-purple-400">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full">
        Sign in
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-800 dark:border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
        </div>
      </div>
      <p className="text-center text-sm text-gray-400 dark:text-gray-500">
        Don't have an account?{' '}
        <Link to="/signup" className="text-purple-400 dark:text-purple-500 hover:text-purple-300 dark:hover:text-purple-400">
          Sign up
        </Link>
      </p>
    </form>
  </div>
</div>

  );
};