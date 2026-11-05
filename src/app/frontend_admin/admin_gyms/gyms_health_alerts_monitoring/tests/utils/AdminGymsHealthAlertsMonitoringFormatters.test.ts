// RESPONSIBILITY: Defines regression tests for AdminGymsHealthAlertsMonitoringFormatters.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_gym_health_alerts/gym_health_alerts_monitoring/tests/utils/AdminGymsHealthAlertsMonitoringFormatters.test.ts)

import { describe, expect, it } from 'vitest';
import { formatDateTime } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/utils/AdminGymsHealthAlertsMonitoringFormatters';

describe('AdminGymHealthAlertsFormatters', () => {
  it('formats detected-at timestamps using the requested locale', () => {
    expect(formatDateTime('2026-01-05T13:04:05Z', 'en-IN')).toMatch(/05 Jan 2026|5 Jan 2026/);
  });
});
