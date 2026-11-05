// RESPONSIBILITY: Tests for useDebounce hook — 90%+ branch coverage per Rule 15A.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/utils/useAdminNavigationLayoutDebounce.test.ts)

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useAdminNavigationLayoutDebounce } from '@/app/frontend_admin/admin_navigation/hooks/useAdminNavigationLayoutDebounce';

describe('useAdminNavigationLayoutDebounce', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useAdminNavigationLayoutDebounce('hello', 300));
    expect(result.current).toBe('hello');
  });

  it('does not update value before delay elapses', () => {
    const { result, rerender } = renderHook(({ value }) => useAdminNavigationLayoutDebounce(value, 300), {
      initialProps: { value: 'initial' },
    });
    rerender({ value: 'updated' });
    act(() => { vi.advanceTimersByTime(200); });
    expect(result.current).toBe('initial');
  });

  it('updates value after delay elapses', () => {
    const { result, rerender } = renderHook(({ value }) => useAdminNavigationLayoutDebounce(value, 300), {
      initialProps: { value: 'initial' },
    });
    rerender({ value: 'updated' });
    act(() => { vi.advanceTimersByTime(300); });
    expect(result.current).toBe('updated');
  });

  it('resets timer on rapid successive changes', () => {
    const { result, rerender } = renderHook(({ value }) => useAdminNavigationLayoutDebounce(value, 300), {
      initialProps: { value: 'a' },
    });
    rerender({ value: 'b' });
    act(() => { vi.advanceTimersByTime(200); });
    rerender({ value: 'c' });
    act(() => { vi.advanceTimersByTime(200); });
    expect(result.current).toBe('a'); // still not updated
    act(() => { vi.advanceTimersByTime(100); });
    expect(result.current).toBe('c'); // now updated to final value
  });

  it('uses default delay of 300ms when no delay provided', () => {
    const { result, rerender } = renderHook(({ value }) => useAdminNavigationLayoutDebounce(value), {
      initialProps: { value: 'x' },
    });
    rerender({ value: 'y' });
    act(() => { vi.advanceTimersByTime(299); });
    expect(result.current).toBe('x');
    act(() => { vi.advanceTimersByTime(1); });
    expect(result.current).toBe('y');
  });

  it('works with non-string types (number)', () => {
    const { result, rerender } = renderHook(({ value }) => useAdminNavigationLayoutDebounce(value, 300), {
      initialProps: { value: 1 },
    });
    rerender({ value: 42 });
    act(() => { vi.advanceTimersByTime(300); });
    expect(result.current).toBe(42);
  });
});
