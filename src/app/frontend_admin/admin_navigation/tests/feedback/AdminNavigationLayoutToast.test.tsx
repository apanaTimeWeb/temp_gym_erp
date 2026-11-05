// RESPONSIBILITY: Defines regression tests for AdminNavigationLayoutToast.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/feedback/AdminNavigationLayoutToast.test.tsx)

import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, render } from '@testing-library/react';
import AdminNavigationLayoutToast from '@/app/frontend_admin/admin_navigation/components/feedback/AdminNavigationLayoutToast';

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

describe('AdminNavigationLayoutToast timer lifecycle', () => {
  afterEach(() => { vi.useRealTimers(); });
  it('announces error messages and uses a safe-area-aware narrow viewport width', () => {
    const { getByRole } = render(<AdminNavigationLayoutToast id="toast-error" message="Permission update failed" type="error" onClose={vi.fn()} />);
    const alert = getByRole('alert');
    expect(alert.getAttribute('aria-live')).toBe('assertive');
    expect(alert.className).toContain('env(safe-area-inset-bottom)');
    expect(alert.className).toContain('w-[min(320px,calc(100vw-24px))]');
  });

  it('cancels an old toast close timer when its identity is replaced', () => {
    vi.useFakeTimers();
    const closeA = vi.fn();
    const closeB = vi.fn();
    const { rerender, getByText } = render(<AdminNavigationLayoutToast id="toast-a" message="First" type="info" onClose={closeA} />);
    act(() => { vi.advanceTimersByTime(4000); });
    rerender(<AdminNavigationLayoutToast id="toast-b" message="Second" type="success" onClose={closeB} />);
    act(() => { vi.advanceTimersByTime(300); });
    expect(closeA).not.toHaveBeenCalled();
    expect(closeB).not.toHaveBeenCalled();
    expect(getByText('Second')).toBeTruthy();
  });
});
