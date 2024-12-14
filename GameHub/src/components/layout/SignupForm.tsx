import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { signup } from '@/service/Auth';
import { useNavigate } from 'react-router-dom';
import { signupSchema } from '@/validation/signupSchema';

export const SignupForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    setErrorMessage(null);
    try {
      const response = await signup(data.username, data.email, data.password);

      if (response.success) {
        console.log('Signup successful:', response.message);
        navigate('/');
        window.location.reload(); // Force a page refresh
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred. Please try again later.');
      console.error('Signup error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      <div className="space-y-4">
        <Input
          placeholder="Username"
          {...register('username')}
          error={errors.username?.message || ''}
          className="bg-gray-800 dark:bg-gray-200 text-gray-100 dark:text-gray-900"
        />
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
        <Input
          type="password"
          placeholder="Confirm password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message || ''}
          className="bg-gray-800 dark:bg-gray-200 text-gray-100 dark:text-gray-900"
        />
      </div>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      <Button
        type="submit"
        className="w-full bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
      >
        Create account
      </Button>
    </form>
  );
};
