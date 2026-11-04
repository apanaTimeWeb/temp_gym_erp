import { renderHook } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { useAuthLoginUnsavedChangesGuard } from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/hooks/useAuthLoginCredentialsAndDemoAccessLoginUnsavedChangesGuard';



describe('useAuthLoginUnsavedChangesGuard', () => {
  it('blocks browser-level navigation while the Login form is dirty and cleans up after it becomes clean', () => {
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { rerender, unmount } = renderHook(
      ({ isDirty }) => useAuthLoginUnsavedChangesGuard(isDirty),
      { initialProps: { isDirty: true } },
    );

    const listener = addSpy.mock.calls.find(([type]) => type === 'beforeunload')?.[1] as EventListener | undefined;
    expect(listener).toBeDefined();

    const event = new Event('beforeunload', { cancelable: true }) as BeforeUnloadEvent;
    Object.defineProperty(event, 'returnValue', { writable: true, value: '' });
    listener?.(event);
    expect(event.defaultPrevented).toBe(true);
    expect(event.returnValue).toBe('');

    rerender({ isDirty: false });
    unmount();
    expect(removeSpy).toHaveBeenCalled();

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });
});
