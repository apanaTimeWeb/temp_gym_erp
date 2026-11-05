// RESPONSIBILITY: Defines regression tests for useAdminGymsHealthAlertsMonitoringLogic.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_gym_health_alerts/gym_health_alerts_monitoring/tests/hooks/useAdminGymsHealthAlertsMonitoringLogic.test.ts)

import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminGymHealthAlertsLogic } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/hooks/useAdminGymsHealthAlertsMonitoringLogic';

const confirm = vi.fn();
const dismissMutation = { mutate: vi.fn(), isPending: false };
const getIntentKey = vi.fn((id: string) => `idem:${id}`);
const clearIntentKey = vi.fn();
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/hooks/useAdminGymsHealthAlertsMonitoringConfirm', () => ({ useAdminNavigationLayoutConfirm: () => ({ confirm }) }));
vi.mock('@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/state/useAdminGymsHealthAlertsMonitoringStore', () => ({ useAdminGymHealthAlertsStore: () => ({ severityFilter: 'high', search: 'expired', setSeverityFilter: vi.fn(), setSearch: vi.fn() }) }));
vi.mock('@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/hooks/useAdminGymsHealthAlertsMonitoringMutations', () => ({ useAdminGymHealthAlertsMutations: () => ({ dismissMutation, getIntentKey, clearIntentKey }) }));

describe('useAdminGymHealthAlertsLogic', () => {
  beforeEach(() => {
    vi.mocked(useQuery).mockReset().mockReturnValueOnce({ data: { data: [{ id: 'a1' }] }, status: 'success' } as never).mockReturnValueOnce({ data: { data: { high: 1 } }, status: 'success' } as never);
    confirm.mockReset().mockResolvedValue(true);
    dismissMutation.mutate.mockReset();
    clearIntentKey.mockReset();
  });

  it('maps alert/summary state and confirms dismiss actions before mutation', async () => {
    const { result } = renderHook(() => useAdminGymHealthAlertsLogic());
    expect(result.current.alerts).toEqual([{ id: 'a1' }]);
    expect(result.current.kpis).toEqual({ high: 1 });
    await result.current.dismissAlert('a1', 'Expired member');
    expect(confirm).toHaveBeenCalledWith(expect.objectContaining({ type: 'warning' }));
    expect(dismissMutation.mutate).toHaveBeenCalledWith({ id: 'a1', idempotencyKey: 'idem:dismiss:a1' });
  });
});
