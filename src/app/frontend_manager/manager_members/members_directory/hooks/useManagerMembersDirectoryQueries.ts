// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
import { useQuery } from '@tanstack/react-query';

import { ManagerMembersDirectoryApi } from '@/app/frontend_manager/manager_members/members_directory/api/manager_members_directory.api';
import { ManagerMembersDirectoryQueryKeys } from '@/app/frontend_manager/manager_members/members_directory/api/manager_members_directory.query_keys';
import type { PlanSnapshot, PaymentSnapshot, AttendanceSnapshot } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory_snapshot.types';
import type { MemberStats } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates members feature state and its documented UI/API boundary through useFetchMembers.
 * @dependencies Uses ManagerMembersDirectoryApi, ManagerMembersDirectorySnapshotTypes, ManagerMembersDirectoryTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
/**
 * @description useFetchMembers owns the members feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useFetchMembers(params: Record<string, string>) {
  return useQuery({
    queryKey: ManagerMembersDirectoryQueryKeys.list(params),
    queryFn: async () => {
      const res = await ManagerMembersDirectoryApi.fetchMembers(params);
      if (!res.success) throw new Error(res.message || 'Unable to load members');
      return res.data;
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useFetchPlans owns the members feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useFetchPlans() {
  return useQuery<PlanSnapshot[]>({
    queryKey: ManagerMembersDirectoryQueryKeys.plansSnapshot(),
    queryFn: async () => {
      const res = await ManagerMembersDirectoryApi.fetchMemberPlans();
      if (!res.success) throw new Error(res.message || 'Unable to load plans');
      return (res.data as PlanSnapshot[]) || [];
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useFetchMemberStats coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useFetchMemberStats() {
  return useQuery<MemberStats | null>({
    queryKey: ManagerMembersDirectoryQueryKeys.stats(),
    queryFn: async () => {
      const res = await ManagerMembersDirectoryApi.fetchMemberStats();
      if (!res.success) throw new Error(res.message || 'Unable to load member statistics');
      return res.data ?? null;
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useFetchTrainers coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useFetchTrainers() {
  return useQuery({
    queryKey: ManagerMembersDirectoryQueryKeys.trainers(),
    queryFn: async () => {
      const res = await ManagerMembersDirectoryApi.fetchMemberTrainers();
      if (!res.success) throw new Error(res.message || 'Unable to load trainers');
      return res.data?.staff?.filter((staff) => staff.role.toLowerCase().includes('trainer')) ?? [];
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useFetchPayments coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useFetchPayments(memberId: string | null) {
  const resourceId = memberId && memberId.trim() ? memberId : null;
  return useQuery<PaymentSnapshot[]>({
    queryKey: resourceId ? ManagerMembersDirectoryQueryKeys.payments(resourceId) : ManagerMembersDirectoryQueryKeys.paymentsDisabled(),
    queryFn: async () => {
      if (!resourceId) return [];
      const res = await ManagerMembersDirectoryApi.fetchMemberPayments(resourceId);
      if (!res.success) throw new Error(res.message || 'Unable to load member payments');
      return res.data ?? [];
    },
    enabled: Boolean(resourceId) });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useFetchAttendance coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useFetchAttendance(memberId: string | null) {
  const resourceId = memberId && memberId.trim() ? memberId : null;
  return useQuery<AttendanceSnapshot[]>({
    queryKey: resourceId ? ManagerMembersDirectoryQueryKeys.attendance(resourceId) : ManagerMembersDirectoryQueryKeys.attendanceDisabled(),
    queryFn: async () => {
      if (!resourceId) return [];
      const res = await ManagerMembersDirectoryApi.fetchMemberAttendance(resourceId);
      if (!res.success) throw new Error(res.message || 'Unable to load member attendance');
      return res.data ?? [];
    },
    enabled: Boolean(resourceId) });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useFetchMember coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useFetchMember(memberId: string | null) {
  const resourceId = memberId && memberId.trim() ? memberId : null;
  return useQuery({
    queryKey: resourceId ? ManagerMembersDirectoryQueryKeys.detail(resourceId) : ManagerMembersDirectoryQueryKeys.detailDisabled(),
    queryFn: async () => {
      if (!resourceId) return null;
      const res = await ManagerMembersDirectoryApi.fetchMemberById(resourceId);
      if (!res.success) throw new Error(res.message || 'Unable to load member');
      return res.data ?? null;
    },
    enabled: Boolean(resourceId) });
}
