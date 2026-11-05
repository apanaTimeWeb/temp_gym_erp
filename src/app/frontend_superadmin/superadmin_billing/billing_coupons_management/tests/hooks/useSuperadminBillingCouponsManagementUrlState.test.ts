import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminBillingCouponsManagementUrlState } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/hooks/useSuperadminBillingCouponsManagementUrlState';

const routerReplace = vi.hoisted(() => vi.fn());
vi.mock('next/navigation', () => ({
  usePathname: () => '/frontend_superadmin/superadmin_billing/billing_coupons_management',
  useRouter: () => ({ replace: routerReplace }),
  useSearchParams: () => new URLSearchParams('range=this_month&keep=1'),
}));

describe('useSuperadminBillingCouponsManagementUrlState', () => {
  it('reads current URL state and updates one key without dropping unrelated parameters', () => {
    const { result } = renderHook(() => useSuperadminBillingCouponsManagementUrlState());
    expect(result.current.getParam('range', 'last_month')).toBe('this_month');
    act(() => result.current.setParam('page', '2'));
    expect(routerReplace).toHaveBeenCalledWith(
      '/frontend_superadmin/superadmin_billing/billing_coupons_management?range=this_month&keep=1&page=2',
      { scroll: false },
    );
  });
});
