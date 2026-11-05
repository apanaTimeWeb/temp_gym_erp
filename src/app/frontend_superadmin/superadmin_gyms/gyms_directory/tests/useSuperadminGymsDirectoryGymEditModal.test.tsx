import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api';
import { useSuperadminGymsDirectoryGymEditModal } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryGymEditModal';

import type { ReactNode } from 'react';

vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api', () => ({
  gymsApi: { fetchSubscriptionPlans: vi.fn(), updateGym: vi.fn() },
}));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm: vi.fn().mockResolvedValue(true) }) }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryUnsavedChangesGuard', () => ({ useSuperadminGymsDirectoryUnsavedChangesGuard: vi.fn() }));

describe('useSuperadminGymsDirectoryGymEditModal', () => {
  it('loads subscription plans through the owning API and exposes a completed query state', async () => {
    vi.mocked(gymsApi.fetchSubscriptionPlans).mockResolvedValue({ success: true, message: 'ok', data: [] , requestId: 'test-request-id'} as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminGymsDirectoryGymEditModal(), { wrapper });
    await waitFor(() => expect(result.current.loadingPlans).toBe(false));
    expect(result.current.plans).toEqual([]);
  });
});
