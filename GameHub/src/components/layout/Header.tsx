import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/75 dark:bg-white/95 dark:border-gray-200">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-purple-500">
            <Gamepad2 size={24} />
            <span>GameHub</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/browse" className="text-gray-300 hover:text-white dark:text-gray-600 dark:hover:text-gray-900 transition-colors">
              Browse Games
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-gray-300 hover:text-white dark:text-gray-600 dark:hover:text-gray-900 transition-colors">
            <Search size={20} />
          </button>
          <button className="text-gray-300 hover:text-white dark:text-gray-600 dark:hover:text-gray-900 transition-colors">
            <Bell size={20} />
          </button>
          <ThemeToggle />
          <Link to="/login">
            <Button variant="primary" size="sm">
              <User size={18} className="mr-2" />
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
