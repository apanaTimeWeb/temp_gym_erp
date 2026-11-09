// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
import { useQuery } from '@tanstack/react-query';

import { ManagerAttendanceTrackingApi } from '@/app/frontend_manager/manager_attendance/attendance_tracking/api/manager_attendance_tracking.api';
import { ManagerAttendanceTrackingQueryKeys } from '@/app/frontend_manager/manager_attendance/attendance_tracking/api/manager_attendance_tracking.query_keys';
import type { ManagerAttendanceTrackingPersonType } from '@/app/frontend_manager/manager_attendance/attendance_tracking/types/manager_attendance_tracking.types';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates attendance feature state and its documented UI/API boundary through useAttendanceListQuery.
 * @dependencies Uses ManagerAttendanceTrackingApi, ManagerAttendanceTrackingTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
/**
 * @description useAttendanceListQuery owns the attendance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useAttendanceListQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: ManagerAttendanceTrackingQueryKeys.list(params),
    queryFn: async () => {
      const res = await ManagerAttendanceTrackingApi.fetchAttendanceRecords(params);
      if (!res.success) throw new Error(res.message || 'Unable to load attendance records');
      return res.data;
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useFetchStaff owns the attendance feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useFetchStaff(params: Record<string, string>) {
  return useQuery({
    queryKey: ManagerAttendanceTrackingQueryKeys.staff(params),
    queryFn: async () => {
      const res = await ManagerAttendanceTrackingApi.fetchAttendanceStaff(params);
      if (!res.success) throw new Error(res.message || 'Unable to load attendance staff');
      return res.data;
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useTodayStatsQuery coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useTodayStatsQuery(range?: string) {
  return useQuery({
    queryKey: [...ManagerAttendanceTrackingQueryKeys.todayStats(), range],
    queryFn: async () => {
      const res = await ManagerAttendanceTrackingApi.fetchAttendanceStats(range);
      if (!res.success) throw new Error(res.message || 'Unable to load attendance stats');
      return res.data;
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useAttendanceHistoryQuery coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useAttendanceHistoryQuery(userId: string, type: ManagerAttendanceTrackingPersonType, month: string) {
  return useQuery({
    queryKey: ManagerAttendanceTrackingQueryKeys.history(userId, type, month),
    queryFn: async () => {
      const res = await ManagerAttendanceTrackingApi.fetchAttendanceHistory(userId, type, month);
      if (!res.success) throw new Error(res.message || 'Unable to load attendance history');
      return res.data;
    },
    enabled: Boolean(userId) });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useActiveMembersQuery coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useActiveMembersQuery() {
  const params = { limit: '1000', status: 'active' };
  return useQuery({
    queryKey: ManagerAttendanceTrackingQueryKeys.members(params),
    queryFn: async () => {
      const res = await ManagerAttendanceTrackingApi.fetchAttendanceMembers(params);
      if (!res.success) throw new Error(res.message || 'Unable to load attendance members');
      return res.data;
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useStaffQuery coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useStaffQuery() {
  return useQuery({
    queryKey: ManagerAttendanceTrackingQueryKeys.staff(),
    queryFn: async () => {
      const res = await ManagerAttendanceTrackingApi.fetchAttendanceStaff();
      if (!res.success) throw new Error(res.message || 'Unable to load attendance staff');
      return res.data;
    } });
}
