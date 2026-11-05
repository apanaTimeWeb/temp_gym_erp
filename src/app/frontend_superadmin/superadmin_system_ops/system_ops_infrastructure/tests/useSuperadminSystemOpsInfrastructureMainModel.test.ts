import { describe, expect, it } from 'vitest';

import { useSuperadminSystemOpsInfrastructureMainModel } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureMainModel';


describe('useSuperadminSystemOpsInfrastructureMainModel', () => {
  it('preserves missing telemetry as unavailable rather than measured zero', () => {
    const result = useSuperadminSystemOpsInfrastructureMainModel([
      { id: 'n1', cpuPercent: null, memoryPercent: null, diskPercent: null },
    ] as never);
    expect(result).toMatchObject({ withCpuCount: 0, withMemCount: 0, withDiskCount: 0, avgCpu: null, avgMem: null, avgDisk: null });
  });

  it('preserves real measured zero values', () => {
    const result = useSuperadminSystemOpsInfrastructureMainModel([
      { id: 'n1', cpuPercent: 0, memoryPercent: 0, diskPercent: 0 },
    ] as never);
    expect(result).toMatchObject({ withCpuCount: 1, withMemCount: 1, withDiskCount: 1, avgCpu: 0, avgMem: 0, avgDisk: 0 });
  });

  it('calculates resource averages and counts from node input', () => {
    const result = useSuperadminSystemOpsInfrastructureMainModel([
      { id: 'n1', cpuPercent: 20, memoryPercent: 40, diskPercent: 60 },
      { id: 'n2', cpuPercent: 40, memoryPercent: 60, diskPercent: 80 },
    ] as never);
    expect(result).toMatchObject({ withCpuCount: 2, withMemCount: 2, withDiskCount: 2, avgCpu: 30, avgMem: 50, avgDisk: 70 });
  });
});
