import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useTheme } from '@/lib/theme';
import { Header } from '@/components/layout/Header';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { SignupPage } from '@/pages/auth/SignupPage';
import { BrowseGamesPage } from '@/pages/BrowseGamesPage';
import { PasswordGamePage } from '@/pages/games/PasswordGamePage';
import { WordlePage } from '@/pages/games/WordlePage';
import { ThemeProvider } from '@/lib/theme/ThemeProvider';

function App() {
  const { theme } = useTheme();

  return (
    <ThemeProvider>
      <Router>
        <div className={theme}>
          <div className="min-h-screen bg-gray-900 text-gray-100 dark:bg-gray-100 dark:text-gray-900">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/browse" element={<BrowseGamesPage />} />
              <Route path="/games/password-game" element={<PasswordGamePage />} />
              <Route path="/games/wordle" element={<WordlePage />} />
            </Routes>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: theme === 'dark' ? '#1f2937' : '#ffffff',
                  color: theme === 'dark' ? '#ffffff' : '#1f2937',
                },
              }}
            />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;