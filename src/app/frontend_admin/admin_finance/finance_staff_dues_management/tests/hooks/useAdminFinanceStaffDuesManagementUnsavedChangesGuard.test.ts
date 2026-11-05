// RESPONSIBILITY: Defines regression tests for useAdminFinanceStaffDuesManagementUnsavedChangesGuard.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_staff_dues_management/tests/hooks/useAdminFinanceStaffDuesManagementUnsavedChangesGuard.test.ts)

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAdminFinanceStaffDuesManagementUnsavedChangesGuard } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/hooks/useAdminFinanceStaffDuesManagementUnsavedChangesGuard';

const confirm = vi.fn();
const push = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => '/admin/current',
}));
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));
vi.mock('@/app/frontend_admin/admin_finance/finance_staff_dues_management/hooks/useAdminFinanceStaffDuesManagementConfirm', () => ({
  useAdminNavigationLayoutConfirm: () => ({ confirm }),
}));

describe('useAdminFinanceStaffDuesManagementUnsavedChangesGuard', () => {
  it('allows discard immediately when the form is not dirty', async () => {
    const { result } = renderHook(() => useAdminFinanceStaffDuesManagementUnsavedChangesGuard(false));
    await expect(result.current.confirmDiscardIfDirty()).resolves.toBe(true);
    expect(confirm).not.toHaveBeenCalled();
  });

  it('delegates dirty-form discard to the shell confirmation contract', async () => {
    confirm.mockResolvedValueOnce(false);
    const { result } = renderHook(() => useAdminFinanceStaffDuesManagementUnsavedChangesGuard(true));
    await act(async () => {
      await expect(result.current.confirmDiscardIfDirty()).resolves.toBe(false);
    });
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(push).not.toHaveBeenCalled();
  });
});
