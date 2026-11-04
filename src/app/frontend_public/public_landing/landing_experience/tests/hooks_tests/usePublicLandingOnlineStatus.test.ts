import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { usePublicLandingOnlineStatus } from '@/app/frontend_public/public_landing/landing_experience/hooks/usePublicLandingExperienceOnlineStatus';

const originalOnlineDescriptor = Object.getOwnPropertyDescriptor(window.navigator, 'onLine');

function setNavigatorOnline(value: boolean): void {
  Object.defineProperty(window.navigator, 'onLine', { configurable: true, value });
}

afterEach(() => {
  if (originalOnlineDescriptor) {
    Object.defineProperty(window.navigator, 'onLine', originalOnlineDescriptor);
  } else {
    Reflect.deleteProperty(window.navigator, 'onLine');
  }
});

describe('usePublicLandingOnlineStatus', () => {
  it('reflects the initial browser state and reacts to online/offline events', () => {
    setNavigatorOnline(true);
    const { result } = renderHook(() => usePublicLandingOnlineStatus());
    expect(result.current).toBe(true);

    act(() => window.dispatchEvent(new Event('offline')));
    expect(result.current).toBe(false);

    act(() => window.dispatchEvent(new Event('online')));
    expect(result.current).toBe(true);
  });

  it('initializes as offline when the browser is already disconnected', () => {
    setNavigatorOnline(false);
    const { result } = renderHook(() => usePublicLandingOnlineStatus());
    expect(result.current).toBe(false);
  });
});
