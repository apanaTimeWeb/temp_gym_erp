// RESPONSIBILITY: Defines regression tests for useAdminCommunicationNoticesAndAnnouncementsDebounce.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_communication/communication_notices_and_announcements/tests/hooks/useAdminCommunicationNoticesAndAnnouncementsDebounce.test.ts)

import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useAdminAnnouncementsDebounce } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/hooks/useAdminCommunicationNoticesAndAnnouncementsDebounce';

describe('useAdminAnnouncementsDebounce', () => {
  afterEach(() => vi.useRealTimers());
  it('propagates the most recent value only after the configured delay', async () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useAdminAnnouncementsDebounce(value, 300), { initialProps: { value: 'initial' } });
    rerender({ value: 'first' });
    act(() => { vi.advanceTimersByTime(200); });
    rerender({ value: 'latest' });
    act(() => { vi.advanceTimersByTime(299); });
    expect(result.current).toBe('initial');
    act(() => { vi.advanceTimersByTime(1); });
    expect(result.current).toBe('latest');
  });
});
