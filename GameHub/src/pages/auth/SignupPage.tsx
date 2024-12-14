import React from 'react';
import { SignupLayout } from '@/components/layout/SignupLayout';
import { SignupForm } from '@/components/layout/SignupForm';

export const SignupPage = () => {
  return (
    <SignupLayout>
      <SignupForm />
    </SignupLayout>
  );
};
