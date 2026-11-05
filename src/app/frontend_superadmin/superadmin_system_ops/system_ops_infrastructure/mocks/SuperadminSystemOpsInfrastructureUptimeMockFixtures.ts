/** Module-owned rolling 24-hour uptime series for the Infrastructure MSW contract. */
import type { SuperadminInfrastructureUptimePoint } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/types/superadmin_system_ops_infrastructure_uptime.types';

const UPTIME_PATTERN = [99.98, 100, 99.95, 99.99, 100, 100, 99.97, 99.96, 99.92, 100, 99.99, 99.98, 100, 100, 99.94, 99.96, 99.99, 100, 100, 99.98, 100, 100, 99.97, 100, 99.99] as const;

export function createMockSuperadminInfrastructureUptime(now = Date.now()): SuperadminInfrastructureUptimePoint[] {
  return UPTIME_PATTERN.map((uptimePercent, index) => ({
    timestamp: new Date(now - (24 - index) * 3_600_000).toISOString(),
    uptimePercent,
  }));
}

export const MOCK_SUPERADMIN_INFRASTRUCTURE_UPTIME = createMockSuperadminInfrastructureUptime();
