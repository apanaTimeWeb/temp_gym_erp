'use client';
// DATA FLOW: Inputs enter useSuperadminBillingCouponsManagementCouponRedemptions, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Loads the redemption history for one coupon through the Coupons API/query boundary.
import { useQuery } from '@tanstack/react-query';

import { couponsApi } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/api/superadmin_billing_coupons_management.api';
import { SUPERADMIN_BILLING_COUPONS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/api/superadmin_billing_coupons_management.query_keys';



/**
 * Purpose: Keep coupon redemption records in TanStack Query rather than component fallback state.
 * Inputs: selected coupon id or null.
 * Output: query state for redemption history.
 * Side effects: network/cache activity only.
 * Invariant: the query is enabled only for the selected coupon resource.
 */
/**
 * @description Manages coupons state, queries, and UI interactions for useSuperadminBillingCouponsManagementCouponRedemptions.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminBillingCouponsManagementCouponRedemptions → consuming feature component.
/**
 * @description Coordinates the use Superadmin coupons coupon redemptions concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminBillingCouponsManagementCouponRedemptions(couponId: string | null) {
  return useQuery({
    queryKey: SUPERADMIN_BILLING_COUPONS_QUERY_KEYS.redemptions(couponId),
    queryFn: async () => {
      const response = await couponsApi.fetchRedemptions(couponId as string);
      if (!response.success) throw new Error(response.message || 'Failed to load coupon redemptions');
      return response;
    },
    enabled: Boolean(couponId),
  });
}
