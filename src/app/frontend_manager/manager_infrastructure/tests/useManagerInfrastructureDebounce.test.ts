import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useManagerInfrastructureDebounce } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDebounce';

afterEach(() => vi.useRealTimers());

describe('useManagerInfrastructureDebounce', () => {
  it('emits the latest value only after the configured delay', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useManagerInfrastructureDebounce(value, 300), { initialProps: { value: 'a' } });
    rerender({ value: 'ab' });
    act(() => { vi.advanceTimersByTime(299); });
    expect(result.current).toBe('a');
    act(() => { vi.advanceTimersByTime(1); });
    expect(result.current).toBe('ab');
  });

  it('cancels a superseded pending value', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useManagerInfrastructureDebounce(value, 300), { initialProps: { value: 'first' } });
    rerender({ value: 'stale' });
    act(() => { vi.advanceTimersByTime(150); });
    rerender({ value: 'latest' });
    act(() => { vi.advanceTimersByTime(300); });
    expect(result.current).toBe('latest');
  });
});
