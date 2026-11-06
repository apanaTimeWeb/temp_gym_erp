import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { ThemeToggle } from '@/components/ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('defaults to light mode when no preference is set', () => {
    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    // In light mode, Moon icon is rendered to allow switching to dark mode
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it('toggles from light to dark mode and saves preference to localStorage', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });

    // Initial state: light mode
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Click to switch to dark mode
    act(() => {
      fireEvent.click(button);
    });
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');

    // Click to switch back to light mode
    act(() => {
      fireEvent.click(button);
    });
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('respects existing dark mode preference if stored in localStorage', () => {
    localStorage.setItem('theme', 'dark');
    render(<ThemeToggle />);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
