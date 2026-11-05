'use client';
// DATA FLOW: Superadmin UI → useSuperadminBillingCouponsManagementMutation → TanStack Query mutation → caller callback.
// RESPONSIBILITY: Provides the Coupons feature's shared mutation lifecycle without owning server data.


import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { SUPERADMIN_BILLING_COUPONS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/api/superadmin_billing_coupons_management.query_keys';
import { createSuperadminBillingCouponsFormApiError } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/utils/SuperadminBillingCouponsManagementFormApiErrors';

import type { SuperadminBillingCouponsMutationExecutor, SuperadminBillingCouponsMutationOptions } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management_mutation.types';

/** Runs one coupon mutation while TanStack Query owns the asynchronous lifecycle and the hook owns user feedback. */
/**
 * @description Manages coupons state, queries, and UI interactions for useSuperadminBillingCouponsManagementMutation.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminBillingCouponsManagementMutation → consuming feature component.
/**
 * @description Coordinates the use Superadmin coupons mutation concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminBillingCouponsManagementMutation() {
  const queryClient = useQueryClient();
  const t = useTranslations('superadmin_coupons');
  const mutation = useMutation({
    mutationFn: async ({ execute, options }: { execute: SuperadminBillingCouponsMutationExecutor<unknown>; options: SuperadminBillingCouponsMutationOptions }) => {
      const response = await execute();
      if (!response.success) throw createSuperadminBillingCouponsFormApiError(response);
      if (response.message) toast.success(response.message, { id: options.toastId });
      return response.data ?? null;
    },
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_BILLING_COUPONS_QUERY_KEYS.all });
      variables.options.onSuccess?.(data);
    },
    onError: (error: unknown, variables) => {
      // Only validated API envelope messages are safe to surface verbatim. Unknown
      // exceptions (network, parsing, coding/runtime errors) use generic localized copy.
      const message = error instanceof Error && error.name === 'SuperadminBillingCouponsFormApiError' && error.message.trim()
        ? error.message
        : t('ui.mutation_error_fallback');
      toast.error(message || t('ui.mutation_error_fallback'), { id: variables.options.toastId });
      variables.options.onError?.(error instanceof Error && error.name === 'SuperadminBillingCouponsFormApiError' ? error : new Error(message));
    },
  });
  const mutate = <T,>(execute: SuperadminBillingCouponsMutationExecutor<T>, options: SuperadminBillingCouponsMutationOptions) =>
    mutation.mutateAsync({ execute: execute as SuperadminBillingCouponsMutationExecutor<unknown>, options }) as Promise<T | null>;
  return { mutate, isMutating: mutation.isPending };
}
