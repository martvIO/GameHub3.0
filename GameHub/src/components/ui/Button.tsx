import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500',
          {
            // Primary Variant
            'bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-600 dark:text-white dark:hover:bg-purple-700':
              variant === 'primary',

            // Secondary Variant
            'bg-gray-800 text-gray-100 hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200':
              variant === 'secondary',

            // Ghost Variant
            'hover:bg-gray-800/10 dark:hover:bg-gray-200/10':
              variant === 'ghost',

            // Button Sizes
            'h-9 px-4 text-sm': size === 'sm',
            'h-11 px-6': size === 'md',
            'h-14 px-8 text-lg': size === 'lg',
          },
          className
        )}
        onClick={onClick} // Explicitly type onClick
        {...props}
      >
        {children}
      </button>
    );
  }
);
