// DATA FLOW: Module API → TanStack Query or typed query result → consuming module-owned UI.
'use client';
import { useQuery } from '@tanstack/react-query';

import { ManagerCommunicationsCampaignsApi } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/api/manager_communications_communications_churn_recovery.api';
import { ManagerCommunicationsCampaignsQueryKeys } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/api/manager_communications_communications_churn_recovery.query_keys';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates communications feature state and its documented UI/API boundary through useManagerCommunicationsCampaignsChurnRecoveryQueries.
 * @dependencies Uses ManagerCommunicationsCampaignsApi.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerCommunicationsCampaignsChurnRecoveryQueries owns the communications feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerCommunicationsCampaignsChurnRecoveryQueries() {
  const {
    data: churnedMembersResponse,
    isPending: churnLoading,
    isError: churnError,
    error: churnErrorValue } = useQuery({
    queryKey: ManagerCommunicationsCampaignsQueryKeys.churnMembers(),
    queryFn: async () => {
      const response = await ManagerCommunicationsCampaignsApi.fetchChurnedMembers();
      if (!response.success) throw new Error(response.message);
      return response;
    },
    staleTime: 1000 * 60 * 3 });
  const churnedMembers = churnedMembersResponse?.data ?? [];

  const { data: churnKPIsResponse, error: churnKPIError, isError: churnKPIIsError } = useQuery({
    queryKey: ManagerCommunicationsCampaignsQueryKeys.churnKpis(),
    queryFn: async () => {
      const response = await ManagerCommunicationsCampaignsApi.fetchChurnKPIs();
      if (!response.success) throw new Error(response.message);
      return response;
    },
    staleTime: 1000 * 60 * 5 });
  const churnKPIs = churnKPIsResponse?.data || undefined;

  return {
    churnedMembers,
    churnLoading,
    churnError,
    churnErrorValue,
    churnKPIs,
    churnKPIError };
}
