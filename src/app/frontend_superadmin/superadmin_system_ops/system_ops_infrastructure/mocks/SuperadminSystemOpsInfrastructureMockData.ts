/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsInfrastructureMockData owned by the superadmin_system_ops_infrastructure feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/constants/superadmin_system_ops_infrastructure.constants, @/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/types/superadmin_system_ops_infrastructure.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Module-owned mock fixture data for Superadmin.
import { SUPERADMIN_INFRASTRUCTURE_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/constants/superadmin_system_ops_infrastructure.constants';

import type { InfrastructureNode, RedisTelemetry } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/types/superadmin_system_ops_infrastructure.types';


export const MOCK_INFRASTRUCTURE_NODES: InfrastructureNode[] = [
    { id: 'node-1', name: 'Web-01 (API)', region: 'us-east-1', cpuPercent: 45, memoryPercent: 60, diskPercent: 30, status: SUPERADMIN_INFRASTRUCTURE_STATUS_CODES.HEALTHY, uptime: '99.9%', lastChecked: new Date().toISOString() },
    { id: 'node-2', name: 'Web-02 (API)', region: 'us-east-1', cpuPercent: 42, memoryPercent: 55, diskPercent: 30, status: SUPERADMIN_INFRASTRUCTURE_STATUS_CODES.HEALTHY, uptime: '99.9%', lastChecked: new Date().toISOString() },
    { id: 'node-3', name: 'DB-Primary', region: 'us-east-1', cpuPercent: 65, memoryPercent: 85, diskPercent: 70, status: SUPERADMIN_INFRASTRUCTURE_STATUS_CODES.DEGRADED, uptime: '99.8%', lastChecked: new Date().toISOString() },
    { id: 'node-4', name: 'Worker-01', region: 'us-east-1', cpuPercent: 12, memoryPercent: 40, diskPercent: 20, status: SUPERADMIN_INFRASTRUCTURE_STATUS_CODES.HEALTHY, uptime: '99.9%', lastChecked: new Date().toISOString() },
    { id: 'node-5', name: 'Worker-02', region: 'eu-west-1', cpuPercent: 71, memoryPercent: 78, diskPercent: 82, status: SUPERADMIN_INFRASTRUCTURE_STATUS_CODES.DEGRADED, uptime: '99.6%', lastChecked: new Date().toISOString() },
    { id: 'node-6', name: 'Cache-01', region: 'ap-south-1', cpuPercent: 24, memoryPercent: 48, diskPercent: 22, status: SUPERADMIN_INFRASTRUCTURE_STATUS_CODES.HEALTHY, uptime: '99.95%', lastChecked: new Date().toISOString() },
    { id: 'node-7', name: 'Search-01', region: 'ap-south-1', cpuPercent: 92, memoryPercent: 94, diskPercent: 88, status: SUPERADMIN_INFRASTRUCTURE_STATUS_CODES.DOWN, uptime: '96.2%', lastChecked: new Date().toISOString() },
    { id: 'node-8', name: 'Reports-01', region: 'eu-west-1', cpuPercent: 58, memoryPercent: 61, diskPercent: 54, status: SUPERADMIN_INFRASTRUCTURE_STATUS_CODES.HEALTHY, uptime: '99.7%', lastChecked: new Date().toISOString() },
];

export const MOCK_REDIS_TELEMETRY: RedisTelemetry = {
    memoryUsagePercent: 65,
    hitRatioPercent: 94,
    totalKeysCached: 1450230,
    uptimeHours: 342,
    status: SUPERADMIN_INFRASTRUCTURE_STATUS_CODES.CONNECTED
};

/** Deterministic load tiers for infrastructure table scale and stress tests. */
export const createSuperadminInfrastructureNodesScale = (count: number): InfrastructureNode[] =>
    Array.from({ length: Math.max(0, Math.floor(count)) }, (_, index) => {
        const ordinal = index + 1;
        const base = MOCK_INFRASTRUCTURE_NODES[index % MOCK_INFRASTRUCTURE_NODES.length]!;
        if (!base) throw new Error('Fixture seed must not be empty');
        return { ...base, id: `node-scale-${ordinal}`, name: `Infrastructure Node ${ordinal}`, region: ['us-east-1', 'eu-west-1', 'ap-south-1'][index % 3] ?? 'us-east-1', cpuPercent: (ordinal * 17) % 101, memoryPercent: (ordinal * 23) % 101, diskPercent: (ordinal * 13) % 101, lastChecked: '2026-10-01T00:00:00.000Z' };
    });
export const MOCK_INFRASTRUCTURE_NODES_TIER_1_SMALL = createSuperadminInfrastructureNodesScale(10);
export const MOCK_INFRASTRUCTURE_NODES_TIER_2_MEDIUM = createSuperadminInfrastructureNodesScale(100);
export const MOCK_INFRASTRUCTURE_NODES_TIER_3_STRESS = createSuperadminInfrastructureNodesScale(500);
