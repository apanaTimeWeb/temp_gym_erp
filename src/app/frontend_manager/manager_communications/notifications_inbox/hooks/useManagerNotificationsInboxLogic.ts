// DATA FLOW: URL query state → ManagerNotificationsInboxLogic queries + dedicated mutation hook → API/Query cache → notifications UI.
'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

import { useTranslations } from 'next-intl';

import { useManagerInfrastructureDebounce } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDebounce';
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGetErrorMessage';

import { NOTIFICATION_ALL_FILTER, NOTIFICATION_TYPE_OPTIONS, NOTIFICATION_PRIORITY_OPTIONS, NOTIFICATION_STATUS_OPTIONS } from '@/app/frontend_manager/manager_communications/notifications_inbox/constants/manager_notifications_inbox_shared.constants';
import { useManagerNotificationsInboxMutations } from '@/app/frontend_manager/manager_communications/notifications_inbox/hooks/useManagerNotificationsInboxMutations';
import { useManagerNotificationsInboxQueries } from '@/app/frontend_manager/manager_communications/notifications_inbox/hooks/useManagerNotificationsInboxQueries';
import type { ManagerNotificationsInboxViewModel } from '@/app/frontend_manager/manager_communications/notifications_inbox/types/manager_notifications_inbox_view_model.types';

/**
 * @description Coordinates notification URL state and server queries while delegating all writes to the dedicated mutation hook.
 * @dependencies Uses ManagerNotificationsInboxApi, ManagerNotificationsInboxQueryKeys, ManagerDebounce, translations, and the dedicated mutation hook.
 * @edge-case Preserves shareable search/filter state in the URL and surfaces query errors without duplicating server-state ownership.
 */
export function useManagerNotificationsInboxLogic(): ManagerNotificationsInboxViewModel {
  const t = useTranslations('MANAGER_NOTIFICATIONS_INBOX');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const requestedType = searchParams.get('type') || NOTIFICATION_ALL_FILTER;
  const requestedPriority = searchParams.get('priority') || NOTIFICATION_ALL_FILTER;
  const requestedStatus = searchParams.get('status') || NOTIFICATION_ALL_FILTER;
  const typeFilter = (NOTIFICATION_TYPE_OPTIONS as string[]).includes(requestedType) ? requestedType : NOTIFICATION_ALL_FILTER;
  const priorityFilter = (NOTIFICATION_PRIORITY_OPTIONS as string[]).includes(requestedPriority) ? requestedPriority : NOTIFICATION_ALL_FILTER;
  const statusFilter = (NOTIFICATION_STATUS_OPTIONS as string[]).includes(requestedStatus) ? requestedStatus : NOTIFICATION_ALL_FILTER;
  const debouncedSearch = useManagerInfrastructureDebounce(search, 300);

  const setUrlParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || (key !== 'search' && value === 'ALL')) params.delete(key);
    else params.set(key, value);
    router.replace(params.size ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const queryParams = useMemo(() => ({ search: debouncedSearch, type: typeFilter, priority: priorityFilter, status: statusFilter }), [debouncedSearch, priorityFilter, statusFilter, typeFilter]);
  const { listQuery, kpiQuery } = useManagerNotificationsInboxQueries(queryParams);
  const notificationMutations = useManagerNotificationsInboxMutations();
  const notificationQueryError = listQuery.error ?? kpiQuery.error;
  const errorMessage = notificationQueryError ? ManagerInfrastructureGetErrorMessage(notificationQueryError, t('TEXT_GENERIC_ERROR')) : '';

  return {
    notifications: listQuery.data?.notifications ?? [],
    kpis: kpiQuery.data ?? null,
    isPending: listQuery.isPending,
    isError: listQuery.isError,
    errorMessage: listQuery.error ? ManagerInfrastructureGetErrorMessage(listQuery.error, t('TEXT_GENERIC_ERROR')) : '',
    kpiError: kpiQuery.error ? ManagerInfrastructureGetErrorMessage(kpiQuery.error, t('TEXT_GENERIC_ERROR')) : '',
    saving: notificationMutations.saving,
    search,
    setSearch,
    typeFilter,
    setTypeFilter: (value) => setUrlParam('type', value),
    priorityFilter,
    setPriorityFilter: (value) => setUrlParam('priority', value),
    statusFilter,
    setStatusFilter: (value) => setUrlParam('status', value),
    handleMarkRead: notificationMutations.handleMarkRead,
    handleMarkAllRead: notificationMutations.handleMarkAllRead,
    handleDelete: notificationMutations.handleDelete,
    reload: async () => { await Promise.all([listQuery.refetch(), kpiQuery.refetch()]); },
  };
}
