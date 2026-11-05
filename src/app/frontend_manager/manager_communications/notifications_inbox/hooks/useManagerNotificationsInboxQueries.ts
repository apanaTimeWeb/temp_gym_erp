// DATA FLOW: Module API → TanStack Query or typed query result → consuming module-owned UI.
'use client';
import { useQuery } from '@tanstack/react-query';

import { ManagerNotificationsInboxApi } from '@/app/frontend_manager/manager_communications/notifications_inbox/api/manager_notifications_inbox.api';
import { ManagerNotificationsInboxQueryKeys } from '@/app/frontend_manager/manager_communications/notifications_inbox/api/manager_notifications_inbox.query_keys';

/**
 * @description Owns Manager Notifications list and KPI TanStack Query server state.
 * @dependencies Uses ManagerNotificationsInboxApi and ManagerNotificationsInboxQueryKeys only.
 * @edge-case List query identity follows URL filters while KPI state remains independently cacheable.
 */
export function useManagerNotificationsInboxQueries(queryParams: { search: string; type: string; priority: string; status: string }) {
  const listQuery = useQuery({
    queryKey: ManagerNotificationsInboxQueryKeys.list(queryParams),
    queryFn: async () => { const response = await ManagerNotificationsInboxApi.fetchManagerNotificationsInbox(queryParams); if (!response.success || !response.data) throw new Error(response.message || 'Unable to load notifications'); return response.data; },
  });
  const kpiQuery = useQuery({
    queryKey: ManagerNotificationsInboxQueryKeys.kpis(),
    queryFn: async () => { const response = await ManagerNotificationsInboxApi.fetchNotificationKPIs(); if (!response.success || !response.data) throw new Error(response.message || 'Unable to load notification KPIs'); return response.data; },
  });
  return { listQuery, kpiQuery };
}
