import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useManagerGrievanceResolutionUrlState } from '@/app/frontend_manager/manager_grievances/grievance_resolution/hooks/useManagerGrievanceResolutionUrlState';

const replace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace }),
  usePathname: () => '/manager/grievance',
  useSearchParams: () => new URLSearchParams('page=2'),
}));

describe('useManagerGrievanceResolutionUrlState', () => {
  it('reads the grievance search parameter and preserves unrelated query parameters', () => {
    const { result } = renderHook(() => useManagerGrievanceResolutionUrlState());
    expect(result.current.search).toBe('');
    act(() => result.current.setSearch('  member  '));
    expect(replace).toHaveBeenCalledWith('/manager/grievance?page=2&search=member', { scroll: false });
  });

  it('removes the search parameter when cleared', () => {
    replace.mockClear();
    const { result } = renderHook(() => useManagerGrievanceResolutionUrlState());
    act(() => result.current.setSearch(''));
    expect(replace).toHaveBeenCalledWith('/manager/grievance?page=2', { scroll: false });
  });
});
