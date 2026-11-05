vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key === 'ui.delete_32f68a60' ? 'DELETE' : key, useLocale: () => 'en-IN' }));
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api';
import { useSuperadminGymsDirectoryGymDeleteModal } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryGymDeleteModal';
import { useSuperadminGymsDirectoryStore } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/state/useSuperadminGymsDirectoryStore';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api', () => ({ gymsApi: { deleteGym: vi.fn() } }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminGymsDirectoryGymDeleteModal', () => {
  it('requires the exact DELETE confirmation before calling the delete API', async () => {
    vi.mocked(gymsApi.deleteGym).mockResolvedValue({ success: true, message: 'Deleted', data: null , requestId: 'test-request-id'} as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    useSuperadminGymsDirectoryStore.getState().openDeleteModal?.({ id: 'gym-1', name: 'Gym Alpha' } as never);
    const { result } = renderHook(() => useSuperadminGymsDirectoryGymDeleteModal(), { wrapper });
    act(() => result.current.setConfirmText('NOPE'));
    act(() => result.current.handleConfirmDelete());
    expect(gymsApi.deleteGym).not.toHaveBeenCalled();
    act(() => result.current.setConfirmText('DELETE'));
    act(() => result.current.handleConfirmDelete());
    await waitFor(() => expect(gymsApi.deleteGym).toHaveBeenCalledWith('gym-1', expect.any(String)));
  });
});
