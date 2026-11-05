// RESPONSIBILITY: Defines regression tests for useAdminSettingsManagementUnsavedChangesGuard.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_settings/settings_management/tests/hooks/useAdminSettingsManagementUnsavedChangesGuard.test.ts)

import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAdminSettingsUnsavedChangesGuard } from '@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementUnsavedChangesGuard';

const confirm = vi.fn();
const push = vi.fn();
let searchParams = new URLSearchParams();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => '/admin/current',
  useSearchParams: () => searchParams,
}));
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));
vi.mock('@/app/frontend_admin/admin_settings/settings_management/hooks/useAdminSettingsManagementConfirm', () => ({
  useAdminNavigationLayoutConfirm: () => ({ confirm }),
}));

describe('useAdminSettingsUnsavedChangesGuard', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/admin/current');
    searchParams = new URLSearchParams();
    confirm.mockReset();
    push.mockReset();
  });
  it('allows discard immediately when the form is not dirty', async () => {
    const { result } = renderHook(() => useAdminSettingsUnsavedChangesGuard(false));
    await expect(result.current.confirmDiscardIfDirty()).resolves.toBe(true);
    expect(confirm).not.toHaveBeenCalled();
  });

  it('delegates dirty-form discard to the shell confirmation contract', async () => {
    confirm.mockResolvedValueOnce(false);
    const { result } = renderHook(() => useAdminSettingsUnsavedChangesGuard(true));
    await act(async () => {
      await expect(result.current.confirmDiscardIfDirty()).resolves.toBe(false);
    });
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(push).not.toHaveBeenCalled();
  });
  it('restores dirty Settings when browser Back/Forward is cancelled', async () => {
    confirm.mockResolvedValue(false);
    const { unmount } = renderHook(() => useAdminSettingsUnsavedChangesGuard(true));
    window.history.pushState({}, '', '/admin/other');
    act(() => window.dispatchEvent(new PopStateEvent('popstate', { state: {} })));
    await waitFor(() => expect(confirm).toHaveBeenCalledTimes(1));
    expect(window.location.pathname).toBe('/admin/current');
    expect(push).not.toHaveBeenCalled();
    unmount();
  });
  it('continues to the requested destination only after explicit confirmation', async () => {
    confirm.mockResolvedValue(true);
    const { unmount } = renderHook(() => useAdminSettingsUnsavedChangesGuard(true));
    window.history.pushState({}, '', '/admin/other');
    act(() => window.dispatchEvent(new PopStateEvent('popstate', { state: {} })));
    await waitFor(() => expect(push).toHaveBeenCalledWith('/admin/other'));
    unmount();
  });
  it('does not hijack download or new-tab links', async () => {
    const { unmount } = renderHook(() => useAdminSettingsUnsavedChangesGuard(true));
    const anchor = document.createElement('a');
    anchor.href = '/admin/other';
    anchor.target = '_blank';
    document.body.appendChild(anchor);
    act(() => anchor.click());
    expect(confirm).not.toHaveBeenCalled();
    anchor.remove();
    unmount();
  });
});
