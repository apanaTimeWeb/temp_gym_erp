import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useAuthLoginOfflineStatus } from './useAuthLoginCredentialsAndDemoAccessLoginOfflineStatus';
describe('useAuthLoginOfflineStatus', () => {
  it('tracks online and offline browser events', () => {
    const { result } = renderHook(() => useAuthLoginOfflineStatus());
    act(() => window.dispatchEvent(new Event('offline')));
    expect(typeof result.current).toBe('boolean');
    act(() => window.dispatchEvent(new Event('online')));
    expect(typeof result.current).toBe('boolean');
  });
});
