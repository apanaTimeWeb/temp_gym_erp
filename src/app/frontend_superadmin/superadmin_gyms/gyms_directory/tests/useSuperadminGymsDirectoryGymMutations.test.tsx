import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api';
import { SUPERADMIN_GYM_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory.constants';
import { useSuperadminGymsDirectoryGymMutations } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryGymMutations';

import type { ReactNode } from 'react';


const mocks = vi.hoisted(() => ({
  confirm: vi.fn(),
  startGhostLogin: vi.fn(),
}));

vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api', () => ({
  gymsApi: { impersonateTenant: vi.fn(), setGhostLoginCookie: vi.fn(), updateGymStatus: vi.fn() },
}));
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm: mocks.confirm }) }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string, values?: Record<string, unknown>) => (values?.name ? `${key}:${values.name}` : key) }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryGhostLoginWorkflow', () => ({
  useSuperadminGymsDirectoryGhostLoginWorkflow: () => ({
    startGhostLogin: mocks.startGhostLogin,
    isStartingGhostLogin: false,
    activeGymId: null,
  }),
}));

describe('useSuperadminGymsDirectoryGymMutations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.confirm.mockResolvedValue(true);
    vi.mocked(gymsApi.updateGymStatus).mockResolvedValue({ success: true, message: 'Suspended', data: { id: 'gym-1' } , requestId: 'test-request-id'} as never);
  });

  it('does not mutate status when the suspension confirmation is cancelled', async () => {
    mocks.confirm.mockResolvedValue(false);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(
      () => useSuperadminGymsDirectoryGymMutations([{ id: 'gym-1', name: 'Gym Alpha', status: SUPERADMIN_GYM_STATUS_CODES.ACTIVE }] as never),
      { wrapper },
    );
    const event = { preventDefault: vi.fn(), stopPropagation: vi.fn() } as never;

    await result.current.onSuspendClick(event, 'gym-1', 'Gym Alpha', SUPERADMIN_GYM_STATUS_CODES.ACTIVE);

    expect(mocks.confirm).toHaveBeenCalledWith(expect.objectContaining({
      title: 'ui.suspend_gym_title_repair',
      message: expect.stringContaining('Gym Alpha'),
      type: 'danger',
    }));
    expect(gymsApi.updateGymStatus).not.toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalledOnce();
  });

  it('confirms suspension and forwards the tenant ID and canonical status to the API', async () => {
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(
      () => useSuperadminGymsDirectoryGymMutations([{ id: 'gym-1', name: 'Gym Alpha', status: SUPERADMIN_GYM_STATUS_CODES.ACTIVE }] as never),
      { wrapper },
    );
    const event = { preventDefault: vi.fn(), stopPropagation: vi.fn() } as never;

    await result.current.onSuspendClick(event, 'gym-1', 'Gym Alpha', SUPERADMIN_GYM_STATUS_CODES.ACTIVE);

    expect(mocks.confirm).toHaveBeenCalledWith(expect.objectContaining({
      title: 'ui.suspend_gym_title_repair',
      message: expect.stringContaining('Gym Alpha'),
      type: 'danger',
    }));
    await waitFor(() => {
      expect(gymsApi.updateGymStatus).toHaveBeenCalledWith(
        'gym-1',
        SUPERADMIN_GYM_STATUS_CODES.SUSPENDED,
        expect.any(String),
      );
    });
    expect(event.stopPropagation).toHaveBeenCalledOnce();
  });
});
