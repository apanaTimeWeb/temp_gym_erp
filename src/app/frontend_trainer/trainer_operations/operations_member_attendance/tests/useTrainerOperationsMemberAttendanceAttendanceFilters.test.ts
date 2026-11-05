import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTrainerAttendanceFilters } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/hooks/useTrainerOperationsMemberAttendanceAttendanceFilters';
import { TRAINER_ATTENDANCE_URLS } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/config/trainer_operations_member_attendance.url_config';

const push = vi.fn();
const replace = vi.fn();
const pathname = TRAINER_ATTENDANCE_URLS.ROUTES.LIST;
let params = new URLSearchParams();
vi.mock('next/navigation', () => ({ useSearchParams: () => params, useRouter: () => ({ push, replace }), usePathname: () => pathname }));

beforeEach(() => { push.mockClear(); replace.mockClear(); params = new URLSearchParams(); });

describe('useTrainerAttendanceFilters', () => {
  it('updates shareable search state while preserving the canonical view', () => {
    params = new URLSearchParams('view=my-attendance&date=TODAY');
    const { result } = renderHook(() => useTrainerAttendanceFilters());
    act(() => result.current.setSearch('Rahul'));
    expect(push).toHaveBeenCalledWith(expect.stringContaining('view=my-attendance'), { scroll: false });
    expect(push).toHaveBeenCalledWith(expect.stringContaining('search=Rahul'), { scroll: false });
    expect(push).toHaveBeenCalledWith(expect.stringContaining('date=TODAY'), { scroll: false });
  });

  it('uses and canonicalizes a obsolete deep link without adding a history entry', () => {
    params = new URLSearchParams('view=my-attendance&tab=obsolete&search=Riya&page=2&sortBy=date&sortDirection=asc');
    const { result } = renderHook(() => useTrainerAttendanceFilters());
    expect(result.current.tab).toBe('MY_ATTENDANCE');
    expect(replace).toHaveBeenCalledWith('/frontend_trainer/trainer_operations/operations_member_attendance?search=Riya&page=2&sortBy=date&sortDirection=asc&view=my-attendance', { scroll: false });
  });

  it('writes canonical view values on screen change and removes an obsolete key', () => {
    params = new URLSearchParams('view=members&tab=obsolete&search=Riya&page=2&sortBy=date');
    const { result } = renderHook(() => useTrainerAttendanceFilters());
    act(() => result.current.setTab('MY_ATTENDANCE'));
    const url = new URL(`http://localhost${push.mock.calls[0]![0]}`);
    expect(url.searchParams.get('view')).toBe('my-attendance');
    expect(url.searchParams.has('tab')).toBe(false);
    expect(url.searchParams.get('search')).toBe('Riya');
    expect(url.searchParams.get('sortBy')).toBe('date');
  });
});
