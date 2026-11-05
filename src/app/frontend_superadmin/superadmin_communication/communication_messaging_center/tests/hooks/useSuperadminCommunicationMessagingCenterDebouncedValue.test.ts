import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useSuperadminCommunicationMessagingCenterDebouncedValue } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/hooks/useSuperadminCommunicationMessagingCenterDebouncedValue';

afterEach(() => vi.useRealTimers());

describe('useSuperadminCommunicationMessagingCenterDebouncedValue', () => {
  it('publishes a changed value only after the configured delay', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useSuperadminCommunicationMessagingCenterDebouncedValue(value, 300), { initialProps: { value: 'first' } });
    rerender({ value: 'second' });
    expect(result.current).toBe('first');
    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe('second');
  });
});
