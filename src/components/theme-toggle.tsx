'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className='relative p-2.5 rounded-lg border border-border bg-background/50 hover:bg-card hover:border-primary/30 transition-all duration-300'
      aria-label='Toggle theme'
    >
      <div className='relative w-5 h-5'>
        <Sun
          className={`absolute h-5 w-5 text-yellow-500 transition-all duration-300 ${
            isDark
              ? 'scale-0 rotate-90 opacity-0'
              : 'scale-100 rotate-0 opacity-100'
          }`}
        />
        <Moon
          className={`absolute h-5 w-5 text-blue-300 transition-all duration-300 ${
            isDark
              ? 'scale-100 rotate-0 opacity-100'
              : 'scale-0 rotate-90 opacity-0'
          }`}
        />
      </div>
    </button>
  );
}
