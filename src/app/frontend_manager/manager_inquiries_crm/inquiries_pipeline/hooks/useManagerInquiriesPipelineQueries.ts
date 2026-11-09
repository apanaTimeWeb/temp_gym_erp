// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
'use client';
import { useQuery } from '@tanstack/react-query';

import { ManagerInquiriesPipelineApi } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/api/manager_inquiries_pipeline.api';
import { ManagerInquiriesPipelineQueryKeys } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/api/manager_inquiries_pipeline.query_keys';
import type { Inquiry, InquiryStats } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline.types';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates inquiries feature state and its documented UI/API boundary through useInquiriesQuery.
 * @dependencies Uses ManagerInquiriesPipelineApi, ManagerInquiriesPipelineTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
/**
 * @description useInquiriesQuery owns the inquiries feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useInquiriesQuery(params: Record<string, string>) {
  return useQuery({
    queryKey: ManagerInquiriesPipelineQueryKeys.list(params),
    queryFn: async () => {
      const res = await ManagerInquiriesPipelineApi.fetchInquiries(params);
      if (!res.success) throw new Error(`Failed to load inquiries: ${res.message || 'Error'}`);
      return { inquiries: (res.data?.inquiries ?? []) as Inquiry[], total: res.data?.total ?? 0 };
    },
    staleTime: 5 * 60 * 1000 });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useInquiryStatsQuery coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useInquiryStatsQuery() {
  return useQuery({
    queryKey: ManagerInquiriesPipelineQueryKeys.stats(),
    queryFn: async () => {
      const res = await ManagerInquiriesPipelineApi.fetchInquiryStats();
      return res.data! as InquiryStats;
    },
    staleTime: 5 * 60 * 1000 });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useInquiryPlansQuery coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useInquiryPlansQuery() {
  return useQuery({
    queryKey: ManagerInquiriesPipelineQueryKeys.plans(),
    queryFn: async () => {
      const res = await ManagerInquiriesPipelineApi.fetchInquiryPlans();
      return res.data! as { name: string }[];
    },
    staleTime: 5 * 60 * 1000 });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description useInquiryPlansSnapshotQuery coordinates this module-specific query, mutation, or UI-state flow at the documented feature boundary.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior defined by the feature contract.
 */
export function useInquiryPlansSnapshotQuery() {
  return useQuery({
    queryKey: ManagerInquiriesPipelineQueryKeys.plansSnapshot(),
    queryFn: async () => {
      const res = await ManagerInquiriesPipelineApi.fetchInquiryPlansSnapshot();
      return res.data! as unknown[];
    },
    staleTime: 5 * 60 * 1000 });
}
