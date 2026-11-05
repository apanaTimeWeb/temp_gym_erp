import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  let settleConfirmation: ((approved: boolean) => void) | undefined;
  const confirm = vi.fn(() => new Promise<boolean>((resolve) => { settleConfirmation = resolve; }));
  return {
    confirm,
    push: vi.fn(),
    cancelConfirmation: () => settleConfirmation?.(false),
  };
});

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: mocks.push }) }));
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm: mocks.confirm }) }));

import { useSuperadminGymsDirectoryUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryUnsavedChangesGuard';

describe('useSuperadminGymsDirectoryUnsavedChangesGuard', () => {
  beforeEach(() => {
    mocks.confirm.mockClear();
    mocks.push.mockClear();
  });

  it('suppresses a synthetic/re-entrant popstate while the dirty-navigation confirmation is pending', async () => {
    const forwardSpy = vi.spyOn(window.history, 'forward').mockImplementation(() => undefined);
    const { unmount } = renderHook(() => useSuperadminGymsDirectoryUnsavedChangesGuard(true, 'Unsaved changes'));

    act(() => window.dispatchEvent(new PopStateEvent('popstate')));
    expect(mocks.confirm).toHaveBeenCalledTimes(1);
    expect(forwardSpy).toHaveBeenCalledTimes(1);

    act(() => window.dispatchEvent(new PopStateEvent('popstate')));
    expect(mocks.confirm).toHaveBeenCalledTimes(1);
    expect(forwardSpy).toHaveBeenCalledTimes(1);

    await act(async () => {
      mocks.cancelConfirmation();
      await Promise.resolve();
    });
    expect(mocks.push).not.toHaveBeenCalled();

    unmount();
    forwardSpy.mockRestore();
  });
});
