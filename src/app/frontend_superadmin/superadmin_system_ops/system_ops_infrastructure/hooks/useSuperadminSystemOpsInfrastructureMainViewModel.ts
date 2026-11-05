'use client';
import { useMemo, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';
import { useUrlState } from '@/hooks/useUrlState';

import { SUPERADMIN_INFRASTRUCTURE_STATUS_OPTIONS, SUPERADMIN_INFRASTRUCTURE_FILTER_ALL } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/constants/superadmin_system_ops_infrastructure.constants';
import { useSuperadminSystemOpsInfrastructureActions } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureActions';
import { useSuperadminSystemOpsInfrastructureData } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureData';
import { useSuperadminSystemOpsInfrastructureMainModel } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_infrastructure/hooks/useSuperadminSystemOpsInfrastructureMainModel';



// DATA FLOW: API / URL state / module client state → useMemo → superadmin_system_ops_infrastructure view components.
/**
 * @description Owns Infrastructure page URL state, server queries, mutation confirmations, and translated view-model data so the Main component remains a pure composition layer.
 * @dependencies Feature-owned infrastructure data/actions/view-model hooks plus approved URL state and confirmation infrastructure.
 * @edge-case Reuses one idempotency key for repeated retries of the same confirmed cache-flush intent and clears it only after authoritative success.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminSystemOpsInfrastructureMainViewModel → owning feature view/components.
/**
 * @description Owns the feature-local superadmin system ops infrastructure main view model responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
/** Accept only status values exposed by the filter controls; malformed URL state falls back to ALL. */
export function normalizeInfrastructureStatusFilter(value: string | null | undefined): string {
  return SUPERADMIN_INFRASTRUCTURE_STATUS_OPTIONS.some((option) => option.value === value)
    ? value as string
    : SUPERADMIN_INFRASTRUCTURE_FILTER_ALL;
}

/**
 * @description Coordinates the use Superadmin system ops infrastructure main view model concern within its owning Superadmin feature.
 * @dependencies Uses the typed arguments and module-local API, query-key, schema, and utility imports declared in this file; it must not depend on sibling business modules.
 * @edge-case Keep null or empty inputs safe, preserve pending/error/retry/cancellation behavior where applicable, and avoid stale or duplicate mutation effects.
 */
export function useSuperadminSystemOpsInfrastructureMainViewModel() {
  const t = useTranslations('superadmin_system_ops_infrastructure');
  const { getParam, setParam } = useUrlState();
  const { confirm } = useConfirm();
  const [isFlushModalOpen, setIsFlushModalOpen] = useState(false);
  const globalFlushIdempotencyKeyRef = useRef<string | null>(null);
  const statusFilter = normalizeInfrastructureStatusFilter(getParam('statusFilter', SUPERADMIN_INFRASTRUCTURE_FILTER_ALL));
  const setStatusFilter = (value: string) => setParam('statusFilter', normalizeInfrastructureStatusFilter(value));
  const queryParams = useMemo(() => (statusFilter && statusFilter !== SUPERADMIN_INFRASTRUCTURE_FILTER_ALL ? { statusFilter } : {}) as Record<string, string>, [statusFilter]);
  const { nodesQuery, redisQuery } = useSuperadminSystemOpsInfrastructureData(queryParams);
  const { flushGlobalCache, isFlushingGlobal, flushTenantCache } = useSuperadminSystemOpsInfrastructureActions();
  const { data: fetchRes, isPending: isPendingNodes, isError: isErrorNodes, refetch: refetchNodes, isFetching: isFetchingNodes } = nodesQuery;
  const { data: redisRes, isPending: isPendingRedis, isError: isErrorRedis, refetch: refetchRedis, isFetching: isFetchingRedis } = redisQuery;
  const nodes = fetchRes?.data ?? [];
  const redisTelemetry = redisRes?.data;
  const metrics = useSuperadminSystemOpsInfrastructureMainModel(nodes);
  const statusOptions = SUPERADMIN_INFRASTRUCTURE_STATUS_OPTIONS.map((option) => ({ value: option.value, label: t(option.labelKey) }));

  const handleFlushAll = async (): Promise<void> => {
    const confirmed = await confirm({ title: t('ui.confirm_flush_global_title'), message: t('ui.confirm_flush_global_message'), confirmText: t('ui.flush_all_action'), type: 'warning' });
    if (!confirmed) return;
    try {
      globalFlushIdempotencyKeyRef.current ??= crypto.randomUUID();
      const response = await flushGlobalCache(globalFlushIdempotencyKeyRef.current);
      toast.success(response.message, { id: 'superadmin-infrastructure-flush-global' });
      globalFlushIdempotencyKeyRef.current = null;
    } catch (error: unknown) {
      toast.error(t('ui.action_failed_retry'), { id: 'superadmin-infrastructure-flush-global-error' });
    }
  };

  const handleFlushSpecific = async (tenantIds: string[], idempotencyKey: string): Promise<void> => {
    try {
      const response = await flushTenantCache({ tenantIds, idempotencyKey });
      toast.success(response.message, { id: 'superadmin-infrastructure-flush-tenant' });
    } catch (error: unknown) {
      toast.error(t('ui.action_failed_retry'), { id: 'superadmin-infrastructure-flush-tenant-error' });
      throw error;
    }
  };

  return {
    t,
    statusFilter,
    statusOptions,
    setStatusFilter,
    nodes,
    redisTelemetry,
    isPendingRedis, isErrorRedis, refetchRedis,
    metrics,
    isPendingNodes,
    isErrorNodes,
    refetchNodes,
    isFetchingNodes,
    isFetchingRedis,
    isFlushingGlobal,
    handleFlushAll,
    handleFlushSpecific,
    isFlushModalOpen,
    openFlushModal: () => setIsFlushModalOpen(true),
    closeFlushModal: () => setIsFlushModalOpen(false),
  };
}

