import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminGymsDirectoryUrlState } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryUrlState';

const routerReplace = vi.hoisted(() => vi.fn());
vi.mock('next/navigation', () => ({
  usePathname: () => '/frontend_superadmin/superadmin_gyms/gyms_directory',
  useRouter: () => ({ replace: routerReplace }),
  useSearchParams: () => new URLSearchParams('statusFilter=ACTIVE&keep=1'),
}));

describe('useSuperadminGymsDirectoryUrlState', () => {
  it('reads filter state and removes cleared parameters while preserving the rest', () => {
    const { result } = renderHook(() => useSuperadminGymsDirectoryUrlState());
    expect(result.current.getParam('statusFilter', 'All')).toBe('ACTIVE');
    act(() => result.current.setParam('statusFilter', null));
    expect(routerReplace).toHaveBeenCalledWith(
      '/frontend_superadmin/superadmin_gyms/gyms_directory?keep=1',
      { scroll: false },
    );
  });
});
