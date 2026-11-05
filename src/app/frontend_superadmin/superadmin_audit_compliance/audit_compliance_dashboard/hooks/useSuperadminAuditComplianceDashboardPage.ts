'use client';
// DATA FLOW: API → useSuperadminAuditComplianceDashboardPage.ts → SuperadminAuditComplianceMain.tsx
// RESPONSIBILITY: Owns TanStack Query state for this Superadmin page.
import { useQuery } from '@tanstack/react-query';

import { fetchComplianceOverview } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/api/superadmin_audit_compliance_dashboard.api';
import { SUPERADMIN_AUDIT_COMPLIANCE_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_audit_compliance/audit_compliance_dashboard/api/superadmin_audit_compliance_dashboard.query_keys';


/**
 * Purpose: Owns TanStack Query state for this Superadmin page.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages compliance state, queries, and UI interactions for useSuperadminAuditComplianceDashboardPage.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminAuditComplianceDashboardPage → consuming feature component.
/**
 * @description Coordinates the use Superadmin compliance page concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminAuditComplianceDashboardPage() {
  const query = useQuery({
    queryKey: SUPERADMIN_AUDIT_COMPLIANCE_QUERY_KEYS.overview,
    queryFn: async () => {
      const response = await fetchComplianceOverview();
      if (!response.success) throw new Error(response.message || 'Failed to load compliance overview');
      return response;
    },
  });
  return { data: query.data?.data ?? null, isPending: query.isPending, isError: query.isError, refetch: query.refetch };
}
