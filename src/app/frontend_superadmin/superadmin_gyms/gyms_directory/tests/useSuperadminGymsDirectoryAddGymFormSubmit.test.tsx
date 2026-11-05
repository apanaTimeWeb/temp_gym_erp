import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api';
import { useSuperadminGymsDirectoryAddGymFormSubmit } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryAddGymFormSubmit';

import type { ReactNode } from 'react';



const confirm = vi.fn().mockResolvedValue(true);
const push = vi.fn();
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm }) }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api', () => ({ gymsApi: { provisionGym: vi.fn() } }));

describe('useSuperadminGymsDirectoryAddGymFormSubmit', () => {
  it('requires confirmation and provisions the gym through the feature API before navigating', async () => {
    confirm.mockResolvedValue(true);
    vi.mocked(gymsApi.provisionGym).mockResolvedValue({ success: true, message: 'Provisioned', data: { id: 'gym-1', name: 'Gym Alpha' } , requestId: 'test-request-id'} as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminGymsDirectoryAddGymFormSubmit(), { wrapper });
    const form = { gymName: 'Gym Alpha', ownerName: 'Owner', adminEmail: 'owner@example.com', phone: '9876543210', plan: 'pro', temporaryPassword: 'Password123' } as never;
    await act(async () => { await result.current.onSubmit(form); });
    await waitFor(() => expect(gymsApi.provisionGym).toHaveBeenCalledTimes(1));
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalled();
  });
});
