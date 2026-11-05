import { describe, expect, it } from 'vitest';
import { createMockSuperadminInfrastructureUptime, MOCK_SUPERADMIN_INFRASTRUCTURE_UPTIME } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/SuperadminSystemOpsInfrastructureUptimeMockFixtures';

describe('Infrastructure uptime mock series', () => {
  it('spans exactly the trailing 24 hours at hourly intervals', () => {
    const now = Date.parse('2026-10-17T10:37:00.000Z');
    const points = createMockSuperadminInfrastructureUptime(now);
    expect(points).toHaveLength(25);
    expect(Date.parse(points[0].timestamp)).toBe(Date.parse('2026-10-16T10:37:00.000Z'));
    expect(Date.parse(points[24].timestamp)).toBe(Date.parse('2026-10-17T10:37:00.000Z'));
    expect(points.every((point, index) => index === 0 || Date.parse(point.timestamp) - Date.parse(points[index - 1].timestamp) === 3_600_000)).toBe(true);
    expect(MOCK_SUPERADMIN_INFRASTRUCTURE_UPTIME).toHaveLength(25);
  });
});
