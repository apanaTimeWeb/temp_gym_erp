// RESPONSIBILITY: Defines regression tests for useAdminGymsHealthAlertsMonitoringMutations.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_gym_health_alerts/gym_health_alerts_monitoring/tests/hooks/useAdminGymsHealthAlertsMonitoringMutations.test.tsx)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminGymHealthAlertsApi } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/api/admin_gyms_health_alerts_monitoring_api';
import { useAdminGymHealthAlertsMutations } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/hooks/useAdminGymsHealthAlertsMonitoringMutations';

vi.mock('@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/api/admin_gyms_health_alerts_monitoring_api', () => ({
  AdminGymHealthAlertsApi: {
    dismissAlert: vi.fn().mockResolvedValue({ message: 'ok' })
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useAdminGymHealthAlertsMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('executes the mutation through the module API boundary', async () => {
    const { result } = renderHook(() => useAdminGymHealthAlertsMutations(), { wrapper });
    await act(async () => { await result.current.dismissMutation.mutateAsync({ id: 'id-1', staffId: 'staff-1', planId: 'plan-1', permission: 'view', enabled: true, payload: {}, data: {}, planName: 'Pro', intentId: 'intent-1', idempotencyKey: 'idem-1' } as never); });
    await waitFor(() => expect(AdminGymHealthAlertsApi.dismissAlert).toHaveBeenCalled());
  });
});
