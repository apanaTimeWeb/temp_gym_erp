import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTrainerProgressTrackingFilters } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/useTrainerCoachingIndividualProgressProgressTrackingFilters';
import { TRAINER_PROGRESS_TRACKING_URLS } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/config/trainer_coaching_individual_progress.url_config';

const push = vi.fn();
const replace = vi.fn();
const pathname = TRAINER_PROGRESS_TRACKING_URLS.ROUTES.LIST;
let params = new URLSearchParams();
vi.mock('next/navigation', () => ({ useSearchParams: () => params, useRouter: () => ({ push, replace }), usePathname: () => pathname }));

beforeEach(() => { push.mockClear(); replace.mockClear(); params = new URLSearchParams(); });

describe('useTrainerProgressTrackingFilters', () => {
  it('updates shareable page state without discarding the selected member', () => {
    params = new URLSearchParams('view=compare&memberId=m-1&sortBy=date&sortDirection=desc');
    const { result } = renderHook(() => useTrainerProgressTrackingFilters());
    act(() => result.current.setCurrentPage(2));
    const url = new URL(`http://localhost${push.mock.calls[0]![0]}`);
    expect(url.searchParams.get('page')).toBe('2');
    expect(url.searchParams.get('view')).toBe('compare');
    expect(url.searchParams.get('memberId')).toBe('m-1');
    expect(url.searchParams.get('sortDirection')).toBe('desc');
  });

  it('normalizes obsolete tab deep links without dropping member or sort query parameters', () => {
    params = new URLSearchParams('view=compare&tab=obsolete&memberId=m-2&page=3&sortBy=date&sortDirection=asc');
    const { result } = renderHook(() => useTrainerProgressTrackingFilters());
    expect(result.current.activeTab).toBe('compare');
    expect(replace).toHaveBeenCalledWith('/frontend_trainer/trainer_coaching/coaching_individual_progress?memberId=m-2&page=3&sortBy=date&sortDirection=asc&view=compare', { scroll: false });
  });

  it('writes view state on screen change and preserves the memberId', () => {
    params = new URLSearchParams('view=individual&tab=obsolete&memberId=m-7&page=2');
    const { result } = renderHook(() => useTrainerProgressTrackingFilters());
    act(() => result.current.setActiveTab('compare'));
    const url = new URL(`http://localhost${push.mock.calls[0]![0]}`);
    expect(url.searchParams.get('view')).toBe('compare');
    expect(url.searchParams.has('tab')).toBe(false);
    expect(url.searchParams.get('memberId')).toBe('m-7');
    expect(url.searchParams.get('page')).toBe('2');
  });
});
