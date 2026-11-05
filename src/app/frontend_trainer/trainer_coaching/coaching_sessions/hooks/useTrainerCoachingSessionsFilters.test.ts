import { renderHook, act } from '@testing-library/react';

import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useTrainerSessionsFilters } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsFilters';

import { TRAINER_SESSIONS_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/trainer_coaching_sessions.url_config';






const push = vi.fn();
const pathname = TRAINER_SESSIONS_URLS.ROUTES.LIST;
let params = new URLSearchParams();
vi.mock('next/navigation', () => ({ useSearchParams: () => params, useRouter: () => ({ push, replace: push }), usePathname: () => pathname }));

beforeEach(() => { push.mockClear(); params = new URLSearchParams(); });

describe('useTrainerSessionsFilters', () => {
  it('updates shareable URL state from a user action', () => {
    const { result } = renderHook(() => useTrainerSessionsFilters());
    act(() => { result.current.setFilter("PT"); });
    expect(push).toHaveBeenCalledWith(expect.stringContaining("filter=PT"), { scroll: false });
  });

  it('rejects impossible calendar dates before they can become query state and removes them from the URL', () => {
    params = new URLSearchParams('date=2026-02-30&filter=PT');
    const { result } = renderHook(() => useTrainerSessionsFilters());
    expect(result.current.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(result.current.date).not.toBe('2026-02-30');
    expect(push).toHaveBeenCalledWith(`${pathname}?filter=PT`, { scroll: false });
  });

  it('does not rewrite a valid date-only parameter', () => {
    params = new URLSearchParams('date=2026-10-16');
    const { result } = renderHook(() => useTrainerSessionsFilters());
    expect(result.current.date).toBe('2026-10-16');
    expect(push).not.toHaveBeenCalled();
  });
});
