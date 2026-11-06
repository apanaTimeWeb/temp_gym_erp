'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        root.classList.add('dark');
      } else if (savedTheme === 'light') {
        root.classList.remove('dark');
      }
    } catch (_) {}

    const syncTheme = () => {
      setIsDark(root.classList.contains('dark'));
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const willBeDark = !root.classList.contains('dark');
    if (willBeDark) {
      root.classList.add('dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch (_) {}
      setIsDark(true);
    } else {
      root.classList.remove('dark');
      try {
        localStorage.setItem('theme', 'light');
      } catch (_) {}
      setIsDark(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-text-primary transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {isDark ? <Sun className="h-4 w-4 text-primary" /> : <Moon className="h-4 w-4 text-primary" />}
    </button>
  );
}

export default ThemeToggle;

