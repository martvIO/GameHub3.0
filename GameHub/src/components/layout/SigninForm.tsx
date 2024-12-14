import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from '@/validation/signinSchema';
import { login } from '@/service/Auth';

export const SigninForm: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(loginSchema),
    });
    const navigate = useNavigate();
  
    const onSubmit = async (data: any) => {
      setErrorMessage(null); // Reset error message before new attempt
      try {
        const response = await login(data.email, data.password);
  
        if (response.success) {
          console.log('Login successful:', response.message);
          // Navigate to home or dashboard page on successful login
          navigate('/');
          window.location.reload(); // Force a page refresh
        } else {
          // Display error message returned from the API
          setErrorMessage(response.message);
        }
      } catch (error: any) {
        console.error('Unexpected login error:', error.message || error);
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    };

  return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              {...register('email')}
              error={errors.email?.message || ''}
              className="bg-gray-800 dark:bg-gray-200 text-gray-100 dark:text-gray-900"
            />
            <Input
              type="password"
              placeholder="Password"
              {...register('password')}
              error={errors.password?.message || ''}
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

          {/* Error message display */}
          {errorMessage && (
            <p className="text-sm text-red-500 text-center">{errorMessage}</p>
          )}

          <Button type="submit" className="w-full">
            Sign in
          </Button>

          <p className="text-center text-sm text-gray-400 dark:text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-400 dark:text-purple-500 hover:text-purple-300 dark:hover:text-purple-400">
              Sign up
            </Link>
          </p>
        </form>
  );
};
