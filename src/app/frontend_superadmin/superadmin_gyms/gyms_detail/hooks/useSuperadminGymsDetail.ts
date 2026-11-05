'use client';
// DATA FLOW: MSW/Backend → fetchGymDetailBusinessOverview(gymId) → TanStack Query → Gym 360 Overview UI
// RESPONSIBILITY: Owns query orchestration for the route-specific Gym 360 Overview. No JSX.
import { useQuery } from '@tanstack/react-query';

import { fetchGymDetailBusinessOverview } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/api/superadmin_gyms_detail_business_overview.api';
import { SUPERADMIN_GYMS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_gyms/gyms_detail/api/superadmin_gyms_detail.query_keys';


/**
 * Purpose: Owns query orchestration for the route-specific Gym 360 Overview. No JSX.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
/**
 * @description Manages gyms state, queries, and UI interactions for useSuperadminGymsDetail.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminGymsDetail → consuming feature component.
/**
 * @description Coordinates the use Superadmin gyms gym detail concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminGymsDetail(gymId: string) {
    return useQuery({
        queryKey: SUPERADMIN_GYMS_QUERY_KEYS.detailBusinessOverview(gymId),
        queryFn: async () => {
            const response = await fetchGymDetailBusinessOverview(gymId);
            if (!response.success) throw new Error(response.message || 'Failed to load gym details');
            return response;
        },
        enabled: gymId.length > 0,
    });
}
