"use client";
// RESPONSIBILITY: Owns Admin Usage upgrade-request mutation and server-state refresh.
// DATA FLOW: Upgrade action → mutation hook → AdminUsageApi → TanStack Query invalidation → Usage UI and backend feedback.

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_USAGE_QUERY_KEYS } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/constants/AdminBillingUsageAnalyticsQueryKeys';
import { AdminUsageApi } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/api/admin_billing_usage_analytics_api';
/** @description useAdminUsageMutations: Owns Admin Usage upgrade-request mutation and server-state refresh. @dependencies Consumes AdminUsageQueryKeys, AdminUsageApi. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminUsageMutations() {
  const queryClient = useQueryClient();
  const upgradeMutation = useMutation({
    mutationFn: ({ planName, idempotencyKey }: { planName: string; idempotencyKey: string }) => AdminUsageApi.requestUpgrade(planName, idempotencyKey),
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: ADMIN_USAGE_QUERY_KEYS.key() }); },
  });
  return { upgradeMutation };
}
