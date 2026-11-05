"use client";
// RESPONSIBILITY: Fetches Admin usage server state and derives presentation metrics.
// DATA FLOW: Admin usage API → TanStack Query → useAdminUsageLogic → AdminUsageMain

import { ADMIN_USAGE_QUERY_KEYS } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/constants/AdminBillingUsageAnalyticsQueryKeys';

import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { AdminUsageApi } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/api/admin_billing_usage_analytics_api';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/hooks/useAdminBillingUsageAnalyticsConfirm';
import { useAdminNavigationLayoutToastStore } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/state/useAdminBillingUsageAnalyticsToastStore';
import { PLAN_TIERS, USAGE_WARNING_THRESHOLD, USAGE_CRITICAL_THRESHOLD } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/constants/AdminBillingUsageAnalyticsConstants';
import type { AdminUsageData, AdminUsageMetric } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/types/AdminBillingUsageAnalyticsTypes';
import { useAdminUsageMutations } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/hooks/useAdminBillingUsageAnalyticsMutations';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/utils/AdminBillingUsageAnalyticsIdempotencyIntentStore';
/** @description useAdminUsageLogic: Fetches Admin usage server state and derives presentation metrics. @dependencies Consumes AdminUsageQueryKeys, AdminUsageApi, useAdminNavigationLayoutConfirm, useAdminNavigationLayoutToastStore, AdminNavigationLayoutBackendMessage, AdminUsageConstants. @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminUsageLogic() {
  const t = useTranslations();
  const query = useQuery({
    queryKey: ADMIN_USAGE_QUERY_KEYS.key('current'),
    queryFn: async () => {
      const response = await AdminUsageApi.fetchMyUsage();
      return response.data;
    },
    staleTime: 60_000,
  });

  const data = query.data as AdminUsageData | null | undefined;
  const { confirm } = useAdminNavigationLayoutConfirm();
  const { showToast } = useAdminNavigationLayoutToastStore();
  const [pendingUpgradePlan, setPendingUpgradePlan] = useState<string | null>(null);
  // A ref locks the entire confirmation + request lifecycle, not just the HTTP phase.
  const upgradeInFlightRef = useRef(false);
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);

  const { upgradeMutation } = useAdminUsageMutations();

  const metrics = useMemo<AdminUsageMetric[]>(() => {
    if (!data) return [];
    const safeUsage = (value: number): number => Number.isFinite(value) && value >= 0 ? value : 0;
    return [
      { label: t('usage.admin_usage_main.auto_members'), used: safeUsage(data.activeMembers), limit: safeUsage(data.memberLimit), unit: t('usage.admin_usage_main.auto_unitMembers'), warningThreshold: USAGE_WARNING_THRESHOLD, criticalThreshold: USAGE_CRITICAL_THRESHOLD },
      { label: t('usage.admin_usage_main.auto_staffSeats'), used: safeUsage(data.staffCount), limit: safeUsage(data.staffLimit), unit: t('usage.admin_usage_main.auto_unitSeats'), warningThreshold: USAGE_WARNING_THRESHOLD, criticalThreshold: USAGE_CRITICAL_THRESHOLD },
      { label: t('usage.admin_usage_main.auto_branches'), used: safeUsage(data.branchCount), limit: safeUsage(data.branchLimit), unit: t('usage.admin_usage_main.auto_unitBranches'), warningThreshold: USAGE_WARNING_THRESHOLD, criticalThreshold: USAGE_CRITICAL_THRESHOLD },
      { label: t('usage.admin_usage_main.auto_smsThisMonth'), used: safeUsage(data.smsSent), limit: safeUsage(data.smsLimit), unit: t('usage.admin_usage_main.auto_unitSms'), warningThreshold: USAGE_WARNING_THRESHOLD, criticalThreshold: USAGE_CRITICAL_THRESHOLD },
      { label: t('usage.admin_usage_main.auto_storageUsed'), used: safeUsage(data.databaseGb) + safeUsage(data.mediaGb), limit: safeUsage(data.storageLimitGb), unit: t('usage.admin_usage_main.auto_unitGb'), warningThreshold: USAGE_WARNING_THRESHOLD, criticalThreshold: USAGE_CRITICAL_THRESHOLD },
      { label: t('usage.admin_usage_main.auto_apiCallsToday'), used: safeUsage(data.apiCallsToday), limit: safeUsage(data.apiCallsLimit), unit: t('usage.admin_usage_main.auto_unitCalls'), warningThreshold: USAGE_WARNING_THRESHOLD, criticalThreshold: USAGE_CRITICAL_THRESHOLD },
    ];
  }, [data, t]);

  const requestUpgrade = async (planName: string): Promise<void> => {
    // Only known strictly higher tiers may submit an upgrade intent; server remains authoritative.
    const currentIndex = PLAN_TIERS.findIndex((plan) => plan.name === data?.planTier);
    const targetIndex = PLAN_TIERS.findIndex((plan) => plan.name === planName);
    if (!data || currentIndex < 0 || targetIndex <= currentIndex || upgradeInFlightRef.current) return;
    upgradeInFlightRef.current = true;
    const intentId = `upgrade-request:${planName}`;
    setPendingUpgradePlan(planName);
    try {
      const confirmed = await confirm({
        title: t('usage.admin_usage_main.auto_upgradeTitle', { planName }),
        message: t('usage.admin_usage_main.auto_upgradeMessage', { planName }),
        confirmText: t('usage.admin_usage_main.auto_upgradeConfirm'),
        cancelText: t('usage.admin_usage_main.auto_upgradeCancel'),
        type: 'warning',
      });
      if (!confirmed) { clearIntentKey(intentId); return; }
      const response = await upgradeMutation.mutateAsync({ planName, idempotencyKey: getIntentKey(intentId) });
      clearIntentKey(intentId);
      showToast(response.message, 'success', `usage-upgrade-success-${planName}`);
    } catch {
      showToast(t('usage.admin_usage_main.upgradeError'), 'error', `usage-upgrade-error-${planName}`);
      // Preserve the same intent key so an explicit retry reuses the original key.
    } finally {
      upgradeInFlightRef.current = false;
      setPendingUpgradePlan(null);
    }
  };

  return {
    data: data ?? null,
    metrics,
    planTiers: PLAN_TIERS.map((plan) => ({ ...plan, isCurrent: plan.name === data?.planTier })),
    status: query.status,
    isFetching: query.isFetching,
    error: query.error ? t('usage.admin_usage_main.loadError') : '',
    refresh: query.refetch,
    requestUpgrade,
    upgradeError: upgradeMutation.error ? t('usage.admin_usage_main.upgradeError') : '',
    pendingUpgradePlan,
  };
}
