import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminPlatformShellLayoutUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_layout/hooks/useSuperadminPlatformShellLayoutUnsavedChangesGuard';

describe('useSuperadminPlatformShellLayoutUnsavedChangesGuard', () => {
  it('blocks browser exit when the form is dirty and removes listeners when clean', () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
    const { rerender, unmount } = renderHook(({ dirty }) => useSuperadminPlatformShellLayoutUnsavedChangesGuard(dirty, 'Unsaved'), { initialProps: { dirty: true } });
    const event = new Event('beforeunload', { cancelable: true });
    window.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    rerender({ dirty: false });
    unmount();
    expect(confirmSpy).not.toHaveBeenCalled();
    confirmSpy.mockRestore();
  });
});


describe('useSuperadminPlatformShellLayoutUnsavedChangesGuard popstate lock', () => {
  it('suppresses a re-entrant popstate while confirmation is pending', async () => {
    const forwardSpy = vi.spyOn(window.history, 'forward').mockImplementation(() => undefined);
    const { unmount } = renderHook(() => useSuperadminPlatformShellLayoutUnsavedChangesGuard(true, 'Unsaved'));
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.dispatchEvent(new PopStateEvent('popstate'));
    expect(forwardSpy).toHaveBeenCalledTimes(1);
    unmount();
    forwardSpy.mockRestore();
  });
});
