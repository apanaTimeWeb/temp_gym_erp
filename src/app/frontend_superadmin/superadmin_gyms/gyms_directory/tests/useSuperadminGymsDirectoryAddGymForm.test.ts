import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.query_keys';
import { useSuperadminGymsDirectoryGymEditModalPlans } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryGymEditModalPlans';
import { useSuperadminGymsDirectoryAddGymForm } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryAddGymForm';



vi.mock('next-intl', () => ({ useTranslations: vi.fn(() => (key: string) => key) }));
vi.mock('next/navigation', () => ({ useRouter: vi.fn(() => ({ push: vi.fn() })) }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryUnsavedChangesGuard', () => ({ useSuperadminGymsDirectoryUnsavedChangesGuard: vi.fn() }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryAddGymFormSubmit', () => ({
    useSuperadminGymsDirectoryAddGymFormSubmit: vi.fn(() => ({ onSubmit: vi.fn(), isProvisioning: false, provisioningLogs: [] })),
}));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api', () => ({
    gymsApi: { fetchSubscriptionPlans: vi.fn() },
}));

function createWrapper() {
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    return function Wrapper({ children }: { children: React.ReactNode }) {
        return createElement(QueryClientProvider, { client: queryClient }, children);
    };
}

describe('useSuperadminGymsDirectoryAddGymForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(gymsApi.fetchSubscriptionPlans).mockResolvedValue({
            success: true,
            message: 'Plans loaded',
            data: [{ id: 'plan-1', name: 'Premium' }],
        } as never);
    });

    it('loads subscription plans through the real TanStack Query path', async () => {
        const { result } = renderHook(() => useSuperadminGymsDirectoryAddGymForm(), { wrapper: createWrapper() });
        await waitFor(() => expect(result.current.loadingPlans).toBe(false));
        expect(gymsApi.fetchSubscriptionPlans).toHaveBeenCalledTimes(1);
        expect(result.current.plans).toEqual([{ id: 'plan-1', name: 'Premium' }]);
    });

    it('shares subscription plans as an array between the edit and onboarding forms', async () => {
        const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
        const wrapper = ({ children }: { children: React.ReactNode }) =>
            createElement(QueryClientProvider, { client: queryClient }, children);
        const editForm = renderHook(() => useSuperadminGymsDirectoryGymEditModalPlans(), { wrapper });

        await waitFor(() => expect(editForm.result.current.loadingPlans).toBe(false));
        expect(queryClient.getQueryData(SUPERADMIN_GYMS_QUERY_KEYS.subscriptionPlans)).toEqual([
            { id: 'plan-1', name: 'Premium' },
        ]);

        const addForm = renderHook(() => useSuperadminGymsDirectoryAddGymForm(), { wrapper });
        await waitFor(() => expect(addForm.result.current.loadingPlans).toBe(false));
        expect(addForm.result.current.plans).toEqual([{ id: 'plan-1', name: 'Premium' }]);
    });

    it('keeps form and provisioning concerns separated from the subscription-plan query', async () => {
        const { result } = renderHook(() => useSuperadminGymsDirectoryAddGymForm(), { wrapper: createWrapper() });
        await waitFor(() => expect(result.current.loadingPlans).toBe(false));
        expect(result.current.form.getValues('plan')).toBe('');
        expect(result.current.isProvisioning).toBe(false);
        expect(result.current.provisioningLogs).toEqual([]);
    });
});
