// RESPONSIBILITY: Defines regression tests for useAdminGymsHealthAlertsMonitoringStore.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_gym_health_alerts/gym_health_alerts_monitoring/tests/store/useAdminGymsHealthAlertsMonitoringStore.test.ts)

import { beforeEach, describe, expect, it } from 'vitest';
import { useAdminGymHealthAlertsStore } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/state/useAdminGymsHealthAlertsMonitoringStore';

describe('useAdminGymHealthAlertsStore', () => {
  beforeEach(() => useAdminGymHealthAlertsStore.setState({ severityFilter: 'all', search: '' }));

  it('stores severity filtering as UI state', () => {
    useAdminGymHealthAlertsStore.getState().setSeverityFilter('critical');
    expect(useAdminGymHealthAlertsStore.getState().severityFilter).toBe('critical');
  });

  it('stores search text without owning alert response data', () => {
    useAdminGymHealthAlertsStore.getState().setSearch('payment');
    const state = useAdminGymHealthAlertsStore.getState();
    expect(state.search).toBe('payment');
    expect('alerts' in state).toBe(false);
  });
});
