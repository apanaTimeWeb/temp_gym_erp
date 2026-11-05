import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useManagerInfrastructureDebouncedValueCommit } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDebouncedValueCommit';

describe('useManagerInfrastructureDebouncedValueCommit', () => {
  it('commits only after the debounce window and skips equal values', () => {
    vi.useFakeTimers();
    const commit = vi.fn();
    const { rerender } = renderHook(({ value, committed }) => useManagerInfrastructureDebouncedValueCommit(value, committed, commit, 300), { initialProps: { value: 'a', committed: 'a' } });
    rerender({ value: 'b', committed: 'a' });
    expect(commit).not.toHaveBeenCalled();
    act(() => { vi.advanceTimersByTime(300); });
    expect(commit).toHaveBeenCalledWith('b');
    vi.useRealTimers();
  });
});
