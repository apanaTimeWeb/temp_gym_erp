import { describe, expect, it } from 'vitest';
import { MOCK_INFRASTRUCTURE_NODES_TIER_1_SMALL, MOCK_INFRASTRUCTURE_NODES_TIER_2_MEDIUM, MOCK_INFRASTRUCTURE_NODES_TIER_3_STRESS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/mocks/SuperadminSystemOpsInfrastructureMockData';

describe('System Ops infrastructure scale tiers', () => {
  it('provides deterministic 10, 100, and 500-node datasets', () => {
    expect(MOCK_INFRASTRUCTURE_NODES_TIER_1_SMALL).toHaveLength(10);
    expect(MOCK_INFRASTRUCTURE_NODES_TIER_2_MEDIUM).toHaveLength(100);
    expect(MOCK_INFRASTRUCTURE_NODES_TIER_3_STRESS).toHaveLength(500);
    expect(new Set(MOCK_INFRASTRUCTURE_NODES_TIER_3_STRESS.map((node) => node.id)).size).toBe(500);
    expect(MOCK_INFRASTRUCTURE_NODES_TIER_3_STRESS.every((node) => node.lastChecked === '2026-10-01T00:00:00.000Z')).toBe(true);
  });
});
