// RESPONSIBILITY: Tests browser history query removals, state hydration, and unrelated query preservation.
// DATA FLOW: Mock Next.js navigation -> hook -> controlled React state -> router.replace observations.
import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAdminNavigationLayoutUrlQuerySync } from '@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementUrlQuerySync';

const replace = vi.fn();
let routeQuery = '';
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace }),
  usePathname: () => '/frontend_admin/admin_billing/billing_coupons_management',
  useSearchParams: () => new URLSearchParams(routeQuery),
}));

function useQueryHarness() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  useAdminNavigationLayoutUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: (value) => setSearch(String(value)) },
    { key: 'status', value: status, defaultValue: 'all', setValue: (value) => setStatus(String(value)) },
    { key: 'page', value: page, defaultValue: 1, setValue: (value) => setPage(Number(value)) },
  ]);
  return { search, status, page, setSearch };
}

describe('Coupons bidirectional URL synchronization', () => {
  beforeEach(() => { routeQuery = ''; replace.mockReset(); });

  it('reads existing URL parameters on first render, then resets removed keys on Back navigation', () => {
    routeQuery = 'search=welcome&status=active&page=4&tab=overview';
    const { result, rerender } = renderHook(useQueryHarness);
    expect(result.current.search).toBe('welcome');
    expect(result.current.status).toBe('active');
    expect(result.current.page).toBe(4);
    act(() => { routeQuery = 'tab=overview'; rerender(); });
    expect(result.current.search).toBe('');
    expect(result.current.status).toBe('all');
    expect(result.current.page).toBe(1);
    expect(replace).not.toHaveBeenCalledWith(expect.stringContaining('search=welcome'), expect.anything());
  });

  it('serializes user search changes without deleting unrelated parameters', () => {
    routeQuery = 'tab=overview';
    const { result } = renderHook(useQueryHarness);
    act(() => result.current.setSearch('SAVE'));
    expect(replace).toHaveBeenCalledWith(expect.stringContaining('tab=overview'), { scroll: false });
    expect(replace).toHaveBeenCalledWith(expect.stringContaining('search=SAVE'), { scroll: false });
  });
});
