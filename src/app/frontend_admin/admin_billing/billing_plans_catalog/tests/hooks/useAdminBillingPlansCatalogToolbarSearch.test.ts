// RESPONSIBILITY: Defines regression tests for useAdminBillingPlansCatalogToolbarSearch.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_plans/plans_catalog/tests/hooks/useAdminBillingPlansCatalogToolbarSearch.test.ts)

import { describe, expect, it, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminPlansToolbarSearch } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/hooks/useAdminBillingPlansCatalogToolbarSearch';

describe('useAdminPlansToolbarSearch', () => {
  afterEach(() => vi.useRealTimers());

  it('debounces local search changes and respects the 300ms boundary', () => {
    vi.useFakeTimers();
    const setSearch = vi.fn();
    const { result } = renderHook(() => useAdminPlansToolbarSearch('', setSearch));
    act(() => result.current.setLocalSearch('premium'));
    act(() => vi.advanceTimersByTime(299));
    expect(setSearch).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1));
    expect(setSearch).toHaveBeenCalledWith('premium');
  });
});
