'use client';
// DATA FLOW: API → useSuperadminTeamManagementPage.ts → SuperadminTeamMain.tsx
// RESPONSIBILITY: Owns TanStack Query state for this Superadmin page.
import { useQuery } from '@tanstack/react-query';

import { fetchTeam } from '@/app/frontend_superadmin/superadmin_team/team_management/api/superadmin_team_management.api';
import { SUPERADMIN_TEAM_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_team/team_management/api/superadmin_team_management.query_keys';


/**
 * Purpose: Owns TanStack Query state for this Superadmin page.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages team state, queries, and UI interactions for useSuperadminTeamManagementPage.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminTeamManagementPage → consuming feature component.
/**
 * @description Coordinates the use Superadmin team page concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminTeamManagementPage() {
  const query = useQuery({
    queryKey: SUPERADMIN_TEAM_QUERY_KEYS.overview,
    queryFn: async () => {
      const response = await fetchTeam();
      if (!response.success) throw new Error(response.message || 'Failed to load team');
      return response;
    },
  });
  return { data: query.data?.data ?? null, isPending: query.isPending, isFetching: query.isFetching, isError: query.isError, refetch: query.refetch };
}
