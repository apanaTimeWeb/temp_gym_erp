import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
const mocks = vi.hoisted(() => {
  let settleConfirmation: ((approved: boolean) => void) | undefined;
  const confirm = vi.fn(() => new Promise<boolean>((resolve) => { settleConfirmation = resolve; }));
  return { confirm, push: vi.fn(), cancel: () => settleConfirmation?.(false) };
});
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: mocks.push }) }));
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm: mocks.confirm }) }));
import { useSuperadminAffiliatesManagementUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/hooks/useSuperadminAffiliatesManagementUnsavedChangesGuard';
describe('useSuperadminAffiliatesManagementUnsavedChangesGuard', () => {
  beforeEach(() => { mocks.confirm.mockClear(); mocks.push.mockClear(); });
  it('suppresses re-entrant popstate events while one confirmation is pending', async () => {
    const forward = vi.spyOn(window.history, 'forward').mockImplementation(() => undefined);
    const { unmount } = renderHook(() => useSuperadminAffiliatesManagementUnsavedChangesGuard(true, 'Unsaved changes'));
    act(() => window.dispatchEvent(new PopStateEvent('popstate')));
    act(() => window.dispatchEvent(new PopStateEvent('popstate')));
    expect(mocks.confirm).toHaveBeenCalledTimes(1);
    expect(forward).toHaveBeenCalledTimes(1);
    await act(async () => { mocks.cancel(); await Promise.resolve(); });
    expect(mocks.push).not.toHaveBeenCalled();
    unmount(); forward.mockRestore();
  });
});
