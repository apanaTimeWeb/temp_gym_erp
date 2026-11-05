// RESPONSIBILITY: Defines regression tests for useAdminNavigationLayoutUnsavedChangesGuard.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/utils/useAdminNavigationLayoutUnsavedChangesGuard.test.ts)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAdminNavigationLayoutUnsavedChangesGuard } from '@/app/frontend_admin/admin_navigation/hooks/useAdminNavigationLayoutUnsavedChangesGuard';

const push = vi.fn();
const replace = vi.fn();
const confirm = vi.fn();
let searchParams = new URLSearchParams();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push, replace }),
  usePathname: () => '/admin/settings',
  useSearchParams: () => searchParams,
}));
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));
vi.mock('@/app/frontend_admin/admin_navigation/hooks/useAdminNavigationLayoutConfirm', () => ({
  useAdminNavigationLayoutConfirm: () => ({ confirm }),
}));

describe('useAdminNavigationLayoutUnsavedChangesGuard', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/admin/settings');
    searchParams = new URLSearchParams();
    push.mockReset();
    replace.mockReset();
    confirm.mockReset();
  });

  it('allows clean forms to discard without prompting', async () => {
    const { result } = renderHook(() => useAdminNavigationLayoutUnsavedChangesGuard(false));
    await expect(result.current.confirmDiscardIfDirty()).resolves.toBe(true);
    expect(confirm).not.toHaveBeenCalled();
  });

  it('uses the module confirmation service for dirty-form discard', async () => {
    confirm.mockResolvedValue(true);
    const { result } = renderHook(() => useAdminNavigationLayoutUnsavedChangesGuard(true));
    await act(async () => {
      await expect(result.current.confirmDiscardIfDirty()).resolves.toBe(true);
    });
    expect(confirm).toHaveBeenCalledWith(expect.objectContaining({ type: 'warning' }));
  });

  it('does not navigate when the user cancels a dirty-form route change', async () => {
    confirm.mockResolvedValue(false);
    const { result } = renderHook(() => useAdminNavigationLayoutUnsavedChangesGuard(true));
    await act(async () => {
      await expect(result.current.guardedPush('/admin/members')).resolves.toBe(false);
    });
    expect(push).not.toHaveBeenCalled();
  });

  it('navigates through the router after the dirty-form confirmation is approved', async () => {
    confirm.mockResolvedValue(true);
    const { result } = renderHook(() => useAdminNavigationLayoutUnsavedChangesGuard(true));
    await act(async () => {
      await expect(result.current.guardedReplace('/admin/profile')).resolves.toBe(true);
    });
    expect(replace).toHaveBeenCalledWith('/admin/profile');
  });

  it('intercepts browser Back/Forward while dirty and restores the current URL when the user cancels', async () => {
    confirm.mockResolvedValue(false);
    const { unmount } = renderHook(() => useAdminNavigationLayoutUnsavedChangesGuard(true));
    await act(async () => { await Promise.resolve(); });
    window.history.pushState({}, '', '/admin/members');
    act(() => window.dispatchEvent(new PopStateEvent('popstate', { state: {} })));
    await waitFor(() => expect(confirm).toHaveBeenCalledWith(expect.objectContaining({ type: 'warning' })));
    expect(window.location.pathname).toBe('/admin/settings');
    expect(push).not.toHaveBeenCalled();
    unmount();
  });

});
