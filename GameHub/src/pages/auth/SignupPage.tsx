import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { signup } from '@/service/Auth';

const signupSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const SignupPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setErrorMessage(null);
    try {
      const response = await signup(data['username'], data['email'], data['password']);
      
      if (response.success) {
        setErrorMessage(null); // Clear any previous error message on success
        console.log('Signup successful:', response.message);
        // navigate to the home page when the submit is successful
        navigate('/home');
      } else {
        setErrorMessage(response.message); // Show the error message from the signup function
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again later.');
      console.error('Signup error:', error.message || error);
    }
  };  

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-2xl font-bold text-purple-500 dark:text-purple-400"
          >
            <Gamepad2 size={32} />
            <span>GameHub</span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-white dark:text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-gray-400 dark:text-gray-600">
            Join the gaming community today
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              placeholder="Username"
              {...register('username')}
              error={errors.username?.message?.toString() || ''}
              className="bg-gray-800 dark:bg-gray-200 text-gray-100 dark:text-gray-900"
            />
            <Input
              type="email"
              placeholder="Email address"
              {...register('email')}
              error={errors.email?.message?.toString() || ''}
              className="bg-gray-800 dark:bg-gray-200 text-gray-100 dark:text-gray-900"
            />
            <Input
              type="password"
              placeholder="Password"
              {...register('password')}
              error={errors.password?.message?.toString() || ''}
              className="bg-gray-800 dark:bg-gray-200 text-gray-100 dark:text-gray-900"
            />
            <Input
              type="password"
              placeholder="Confirm password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message?.toString() || ''}
              className="bg-gray-800 dark:bg-gray-200 text-gray-100 dark:text-gray-900"
            />
          </div>

          {/* Error message display */}
          {errorMessage && (
            <p className="text-sm text-red-500 text-center">{errorMessage}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
          >
            Create account
          </Button>

          <p className="text-center text-sm text-gray-400 dark:text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-purple-500 hover:text-purple-400 dark:text-purple-400 dark:hover:text-purple-300"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
