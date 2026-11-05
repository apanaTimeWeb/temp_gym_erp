// RESPONSIBILITY: Defines regression tests for useAdminBillingCouponsManagementUnsavedChangesGuard.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_coupons/coupons_management/tests/hooks/useAdminBillingCouponsManagementUnsavedChangesGuard.test.ts)

import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAdminBillingCouponsManagementUnsavedChangesGuard } from '@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementUnsavedChangesGuard';

const confirm = vi.fn();
const push = vi.fn();
beforeEach(() => { vi.clearAllMocks(); });
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => '/admin/current',
}));
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));
vi.mock('@/app/frontend_admin/admin_billing/billing_coupons_management/hooks/useAdminBillingCouponsManagementConfirm', () => ({
  useAdminNavigationLayoutConfirm: () => ({ confirm }),
}));

describe('useAdminBillingCouponsManagementUnsavedChangesGuard', () => {
  it('allows discard immediately when the form is not dirty', async () => {
    const { result } = renderHook(() => useAdminBillingCouponsManagementUnsavedChangesGuard(false));
    await expect(result.current.confirmDiscardIfDirty()).resolves.toBe(true);
    expect(confirm).not.toHaveBeenCalled();
  });

  it('delegates dirty-form discard to the shell confirmation contract', async () => {
    confirm.mockResolvedValueOnce(false);
    const { result } = renderHook(() => useAdminBillingCouponsManagementUnsavedChangesGuard(true));
    await act(async () => {
      await expect(result.current.confirmDiscardIfDirty()).resolves.toBe(false);
    });
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(push).not.toHaveBeenCalled();
  });

  it('preserves target=_blank, downloads, and rel=external links without confirmation', () => {
    renderHook(() => useAdminBillingCouponsManagementUnsavedChangesGuard(true));
    for (const attrs of [{ target: '_blank' }, { target: '_top' }, { download: 'report.csv' }, { rel: 'external' }]) {
      const anchor = document.createElement('a');
      anchor.href = `${window.location.origin}/admin/another-route`;
      for (const [key, value] of Object.entries(attrs)) anchor.setAttribute(key, value);
      document.body.append(anchor);
      const event = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
      anchor.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(false);
      anchor.remove();
    }
    expect(confirm).not.toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
  });

  it('still protects ordinary same-tab internal route navigation', async () => {
    confirm.mockResolvedValueOnce(true);
    renderHook(() => useAdminBillingCouponsManagementUnsavedChangesGuard(true));
    const anchor = document.createElement('a');
    anchor.href = `${window.location.origin}/admin/another-route`;
    document.body.append(anchor);
    const event = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
    await act(async () => { anchor.dispatchEvent(event); await Promise.resolve(); });
    expect(event.defaultPrevented).toBe(true);
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith('/admin/another-route');
    anchor.remove();
  });
});
