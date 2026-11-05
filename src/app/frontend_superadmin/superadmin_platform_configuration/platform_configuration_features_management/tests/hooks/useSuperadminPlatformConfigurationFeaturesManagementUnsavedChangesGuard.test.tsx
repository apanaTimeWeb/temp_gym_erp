import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSuperadminPlatformConfigurationFeaturesManagementUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementUnsavedChangesGuard';

const mocks = vi.hoisted(() => ({ confirm: vi.fn(), push: vi.fn() }));
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm: mocks.confirm }) }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: mocks.push }) }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

beforeEach(() => {
  vi.clearAllMocks();
  vi.restoreAllMocks();
  vi.spyOn(window.history, 'forward').mockImplementation(() => undefined);
});

describe('useSuperadminPlatformConfigurationFeaturesManagementUnsavedChangesGuard', () => {
  it('keeps popstate confirmation single-flight while history restoration re-enters', async () => {
    let resolveConfirmation: ((approved: boolean) => void) | undefined;
    mocks.confirm.mockImplementation(() => new Promise<boolean>((resolve) => { resolveConfirmation = resolve; }));
    renderHook(() => useSuperadminPlatformConfigurationFeaturesManagementUnsavedChangesGuard(true));

    act(() => window.dispatchEvent(new PopStateEvent('popstate')));
    await waitFor(() => expect(mocks.confirm).toHaveBeenCalledTimes(1));
    act(() => window.dispatchEvent(new PopStateEvent('popstate')));

    expect(mocks.confirm).toHaveBeenCalledTimes(1);
    expect(window.history.forward).toHaveBeenCalledTimes(1);
    await act(async () => { resolveConfirmation?.(false); });
  });
});
