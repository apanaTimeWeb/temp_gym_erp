// DATA FLOW: Module API → TanStack Query or typed query result → consuming module-owned UI.
'use client';
import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { ManagerPtAssignmentsApi } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/api/manager_pt_assignments.api';
import { ManagerPtAssignmentsQueryKeys } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/api/manager_pt_assignments.query_keys';

/**
 * @description Owns all Manager PT TanStack Query server-state reads and their resource-scoped query keys.
 * @dependencies Uses ManagerPtAssignmentsApi and ManagerPtAssignmentsQueryKeys only; no UI state or mutation behavior.
 * @edge-case Preserves independent pending/error state for KPI, workload, package, and assignment queries.
 */
export function useManagerPtAssignmentsQueries(currentPage: number, limit: number, debouncedSearch: string) {
  const assignmentParams = useMemo(() => ({ page: String(currentPage), limit: String(limit), search: debouncedSearch }), [currentPage, limit, debouncedSearch]);
  const kpisQuery = useQuery({ queryKey: ManagerPtAssignmentsQueryKeys.kpis(), queryFn: async () => { const response = await ManagerPtAssignmentsApi.fetchPtDashboardKpis(); if (!response.success) throw new Error(response.message); return response.data; } });
  const workloadQuery = useQuery({ queryKey: ManagerPtAssignmentsQueryKeys.workload(), queryFn: async () => { const response = await ManagerPtAssignmentsApi.fetchWorkload(); if (!response.success) throw new Error(response.message); return response.data; } });
  const packagesQuery = useQuery({ queryKey: ManagerPtAssignmentsQueryKeys.packages(), queryFn: async () => { const response = await ManagerPtAssignmentsApi.fetchPackages(); if (!response.success) throw new Error(response.message); return response.data; } });
  const assignmentsQuery = useQuery({ queryKey: ManagerPtAssignmentsQueryKeys.assignments(assignmentParams), queryFn: async () => { const response = await ManagerPtAssignmentsApi.fetchAssignments(assignmentParams); if (!response.success) throw new Error(response.message); return response.data; } });
  return { kpisQuery, workloadQuery, packagesQuery, assignmentsQuery, assignmentParams };
}
