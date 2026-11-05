// RESPONSIBILITY: Defines regression tests for useAdminMembersBlacklistManagementUnsavedChangesGuard.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_blacklist/blacklist_management/tests/hooks/useAdminMembersBlacklistManagementUnsavedChangesGuard.test.ts)

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAdminBlacklistUnsavedChangesGuard } from '@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementUnsavedChangesGuard';

const confirm = vi.fn();
const push = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => '/admin/current',
}));
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));
vi.mock('@/app/frontend_admin/admin_members/members_blacklist_management/hooks/useAdminMembersBlacklistManagementConfirm', () => ({
  useAdminNavigationLayoutConfirm: () => ({ confirm }),
}));

describe('useAdminBlacklistUnsavedChangesGuard', () => {
  it('allows discard immediately when the form is not dirty', async () => {
    const { result } = renderHook(() => useAdminBlacklistUnsavedChangesGuard(false));
    await expect(result.current.confirmDiscardIfDirty()).resolves.toBe(true);
    expect(confirm).not.toHaveBeenCalled();
  });

  it('delegates dirty-form discard to the shell confirmation contract', async () => {
    confirm.mockResolvedValueOnce(false);
    const { result } = renderHook(() => useAdminBlacklistUnsavedChangesGuard(true));
    await act(async () => {
      await expect(result.current.confirmDiscardIfDirty()).resolves.toBe(false);
    });
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(push).not.toHaveBeenCalled();
  });
});
