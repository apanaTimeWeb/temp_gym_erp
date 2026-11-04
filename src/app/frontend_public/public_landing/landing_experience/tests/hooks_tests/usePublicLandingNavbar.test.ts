import { renderHook, act } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { usePublicLandingNavbar } from '@/app/frontend_public/public_landing/landing_experience/hooks/usePublicLandingNavbar';

describe('usePublicLandingNavbar', () => {
  afterEach(() => {
    vi.useRealTimers();
    document.body.style.overflow = '';
  });
  it('opens and closes the mobile menu through the returned controller actions', () => {
    const { result } = renderHook(() => usePublicLandingNavbar());
    act(() => result.current.handleToggleMenu());
    expect(result.current.menuOpen).toBe(true);
    act(() => result.current.handleCloseMenu());
    expect(result.current.menuOpen).toBe(false);
  });

  it('locks body scrolling while open and restores it when closed', () => {
    document.body.style.overflow = 'auto';
    const { result, unmount } = renderHook(() => usePublicLandingNavbar());
    act(() => result.current.handleToggleMenu());
    expect(document.body.style.overflow).toBe('hidden');
    act(() => result.current.handleCloseMenu());
    expect(document.body.style.overflow).toBe('auto');
    unmount();
  });

  it('cancels pending initial-focus work when the drawer closes immediately', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => usePublicLandingNavbar());
    act(() => result.current.handleToggleMenu());
    act(() => result.current.handleCloseMenu());
    expect(() => vi.runOnlyPendingTimers()).not.toThrow();
  });

  it('reacts to the documented scroll threshold', () => {
    const { result } = renderHook(() => usePublicLandingNavbar());
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 60 });
    act(() => window.dispatchEvent(new Event('scroll')));
    expect(result.current.scrolled).toBe(true);
  });
});
