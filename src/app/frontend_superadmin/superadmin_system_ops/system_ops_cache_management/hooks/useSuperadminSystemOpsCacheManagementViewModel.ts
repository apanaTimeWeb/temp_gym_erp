import type { InfrastructureNode } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_cache_management/types/superadmin_system_ops_cache_management.types';

/** Owns derived infrastructure health metrics for the Superadmin infrastructure view. */
/**
 * @description Derives display-ready infrastructure node, cache, and telemetry view data from validated server state.
 * @dependencies Reads infrastructure query results and feature constants; performs no mutations or transport calls.
 * @edge-case Preserves explicit unavailable/null telemetry states instead of inventing fallback health values.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminSystemOpsCacheManagementViewModel → owning feature view/components.
/**
 * @description Owns the feature-local superadmin system ops infrastructure view model responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminSystemOpsCacheManagementViewModel(nodes: InfrastructureNode[]) {
  const withCpu = nodes.filter((node) => node.cpuPercent !== null);
  const withMem = nodes.filter((node) => node.memoryPercent !== null);
  const withDisk = nodes.filter((node) => node.diskPercent !== null);
  const avgCpu = withCpu.length ? Math.round(withCpu.reduce((sum, node) => sum + (node.cpuPercent ?? 0), 0) / withCpu.length) : null;
  const avgMem = withMem.length ? Math.round(withMem.reduce((sum, node) => sum + (node.memoryPercent ?? 0), 0) / withMem.length) : null;
  const avgDisk = withDisk.length ? Math.round(withDisk.reduce((sum, node) => sum + (node.diskPercent ?? 0), 0) / withDisk.length) : null;
  return { withCpuCount: withCpu.length, withMemCount: withMem.length, withDiskCount: withDisk.length, avgCpu, avgMem, avgDisk };
}
