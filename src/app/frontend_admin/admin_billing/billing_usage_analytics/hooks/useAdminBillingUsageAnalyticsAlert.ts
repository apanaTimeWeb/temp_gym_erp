"use client";
// RESPONSIBILITY: Fetches Admin subscription usage for the shell-level warning banner without owning business mutations.
// DATA FLOW: Admin usage query/state → useAdminUsageAlert → AdminUsageAlert shell component.

/**
 * @description useAdminUsageAlert derives the UI alert state for usage-limit messaging without owning server state.
 * @dependencies Consumes only the owning module form/schema/mutation contract.
 * @edge-case Preserves validation, cancel, and failed-submit recovery without leaking business state.
 */
import { ADMIN_USAGE_QUERY_KEYS } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/constants/AdminBillingUsageAnalyticsQueryKeys';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminUsageApi } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/api/admin_billing_usage_analytics_api';
import { USAGE_WARNING_THRESHOLD } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/constants/AdminBillingUsageAnalyticsConstants';

/** Coordinates UsageAlert state, data flow, and feature behavior. */
export function useAdminUsageAlert() {
  const [isVisible, setIsVisible] = useState(true);
  const query = useQuery({
    queryKey: ADMIN_USAGE_QUERY_KEYS.key('current'),
    queryFn: async () => (await AdminUsageApi.fetchMyUsage()).data,
    staleTime: 60_000,
  });

  const rawData = query.data as { data?: unknown } | null | undefined;
  const usageData = (rawData && typeof rawData === 'object' && 'data' in rawData && rawData.data ? rawData.data : query.data) as any ?? null;
  const getUsageRatio = (used: number, limit: number) => limit > 0 ? used / limit : 0;
  const maxRatio = usageData
    ? Math.max(
        getUsageRatio(usageData.smsSent, usageData.smsLimit),
        getUsageRatio(usageData.databaseGb + usageData.mediaGb, usageData.storageLimitGb),
        getUsageRatio(usageData.activeMembers, usageData.memberLimit),
        getUsageRatio(usageData.staffCount, usageData.staffLimit),
        getUsageRatio(usageData.branchCount, usageData.branchLimit),
        getUsageRatio(usageData.apiCallsToday, usageData.apiCallsLimit),
      )
    : 0;

  return {
    usageData,
    isVisible,
    setIsVisible,
    shouldShow: Boolean(usageData && isVisible && maxRatio >= USAGE_WARNING_THRESHOLD),
    isLimitReached: maxRatio >= 1,
    maxRatio,
  };
}
