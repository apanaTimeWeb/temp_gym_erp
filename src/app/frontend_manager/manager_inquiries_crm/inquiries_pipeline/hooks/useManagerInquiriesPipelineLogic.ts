// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { useTranslations } from 'next-intl';

import { useManagerInfrastructureDebounce } from "@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDebounce";
import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureGetErrorMessage';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';

import { MANAGER_INQUIRIES_PIPELINE_STATUS_VALUES } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline.constants';
import { EMPTY_INQUIRY_FORM } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline_form_defaults.constants';
import { ManagerInquiriesPipelineGenerateDefaultMessage as generateDefaultMessage } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/utils/ManagerInquiriesPipelineFormatters';
import { useManagerInquiriesPipelineMutations } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/hooks/useManagerInquiriesPipelineMutations';
import { useInquiriesQuery, useInquiryStatsQuery } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/hooks/useManagerInquiriesPipelineQueries';
import { useManagerInquiriesPipelineUiStore } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/state/useManagerInquiriesPipelineUiStore';
import { ManagerInquiriesPipelineBuildQueryParams } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/utils/ManagerInquiriesPipelineBuildQueryParams';
import type { InquiryFormValues } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline_form.types';
import type { ManagerInquiriesPipelineMessageType } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline_message.types';
import type { Inquiry, ManagerInquiriesPipelineViewModel, ManagerInquiriesPipelineWritePayload } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline.types';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates inquiries feature state and its documented UI/API boundary through useManagerInquiriesPipelineLogic.
 * @dependencies Uses ManagerInquiriesPipelineBuildQueryParams, useManagerInquiriesPipelineMutations, useManagerInquiriesPipelineQueries, useManagerInquiriesPipelineUiStore.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/**
 * @description Owns Manager Inquiries list filters, pagination, selection, and inquiry workflow coordination.
 * @dependencies Delegates API/server state to feature-owned query and mutation hooks.
 * @edge-case Resets pagination when filters change and preserves selected inquiry identity across refreshes.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerInquiriesPipelineLogic owns the inquiries feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerInquiriesPipelineLogic(): ManagerInquiriesPipelineViewModel {
  const deleteKeyByIdRef = useRef(new Map<string, string>());
  const [transientSearch, setTransientSearch] = useState('');
  const t = useTranslations('MANAGER_INQUIRIES_PIPELINE');
  const router = useRouter(); const pathname = usePathname(); const searchParams = useSearchParams(); const ui = useManagerInquiriesPipelineUiStore();
  const search = transientSearch; const statusFilter = searchParams.get("status") || MANAGER_INQUIRIES_PIPELINE_STATUS_VALUES.ALL_FILTER; const dateFilter = searchParams.get("date") || "all"; const parsedPage = Number(searchParams.get("page") || "1"); const currentPage = Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const debouncedSearch = useManagerInfrastructureDebounce(search, 300);
  const setUrlParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString()); if (value && !(key === "status" && value === MANAGER_INQUIRIES_PIPELINE_STATUS_VALUES.ALL_FILTER) && !(key === "date" && value === "all")) params.set(key, value); else params.delete(key); if (key !== "page") params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);
  const queryParams = ManagerInquiriesPipelineBuildQueryParams({ currentPage, debouncedSearch, statusFilter, dateFilter });
  const listQuery = useInquiriesQuery(queryParams); const statsQuery = useInquiryStatsQuery();
  const refresh = useCallback(async () => { await Promise.all([listQuery.refetch(), statsQuery.refetch()]); }, [listQuery.refetch, statsQuery.refetch]);
  const inquiries = listQuery.data?.inquiries ?? [];
  useEffect(() => {
    if (statsQuery.isError) ui.showToast(ManagerInfrastructureGetErrorMessage(statsQuery.error, t('TEXT_GENERIC_ERROR')), 'error');
  }, [statsQuery.isError, statsQuery.error, ui.showToast, t]);
  const errorMessage = listQuery.isError && listQuery.error ? ManagerInfrastructureGetErrorMessage(listQuery.error, t('TEXT_GENERIC_ERROR')) : '';
  const { createInquiry, updateInquiry, deleteInquiry: removeInquiry, convertLead: convertLeadMutation, isCreating, isUpdating, isConverting } = useManagerInquiriesPipelineMutations({ showToast: ui.showToast, onSuccessCallback: () => { ui.setShowModal(false); ui.setConvertLead(null); } });
  const openAdd = useCallback(() => { ui.setEditId(null); ui.setEditData(EMPTY_INQUIRY_FORM as InquiryFormValues); ui.setShowModal(true); }, [ui]);
  const openEdit = useCallback((inq: Inquiry) => { ui.setEditId(inq.id); ui.setEditData({ name: inq.name, phone: inq.phone, email: inq.email || "", interest: inq.interest, status: inq.status as InquiryFormValues["status"], source: inq.source || "Walk-in", notes: inq.notes || "" }); ui.setShowModal(true); }, [ui]);
  const saveInquiry = useCallback(async (data: ManagerInquiriesPipelineWritePayload) => { if (ui.editId) await updateInquiry({ id: ui.editId, data, idempotencyKey: ManagerInfrastructureIdempotency() }); else await createInquiry({ data, idempotencyKey: ManagerInfrastructureIdempotency() }); }, [createInquiry, ui.editId, updateInquiry]);
  const deleteInquiry = useCallback(async (id: string) => { const idempotencyKey = deleteKeyByIdRef.current.get(id) ?? ManagerInfrastructureIdempotency(); deleteKeyByIdRef.current.set(id, idempotencyKey); await removeInquiry({ id, idempotencyKey }); deleteKeyByIdRef.current.delete(id); }, [removeInquiry]);
  const updateStatus = useCallback(async (id: string, status: string) => { updateInquiry({ id, data: { status: status as InquiryFormValues["status"] }, idempotencyKey: ManagerInfrastructureIdempotency() }); }, [updateInquiry]);
  const openMsg = useCallback((inq: Inquiry, type: ManagerInquiriesPipelineMessageType) => { ui.setMsgModal({ open: true, type, recipient: { name: inq.name, phone: inq.phone, email: inq.email || "" }, message: generateDefaultMessage({ greeting: t('TEXT_DEFAULT_MESSAGE_GREETING', { name: inq.name }), details: t('TEXT_DEFAULT_MESSAGE_RECEIVED', { interest: inq.interest }), signoff: t('TEXT_DEFAULT_MESSAGE_SIGNOFF') }) }); }, [t, ui]);
  const openBulkMsg = useCallback((type: ManagerInquiriesPipelineMessageType) => { const recipients = inquiries.filter((inq) => ui.selectedIds.includes(inq.id)).map((inq) => ({ name: inq.name, phone: inq.phone, email: inq.email || "" })); ui.setBulkMsgModal({ open: true, type, recipients }); }, [inquiries, ui]);
  const toggleSelectAll = useCallback((selectAll: boolean) => ui.setSelectedIds(selectAll ? inquiries.map((inq) => inq.id) : []), [inquiries, ui]);
  const toggleSelectOne = useCallback((id: string) => ui.setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]), [ui]);
  const openConvert = useCallback((inq: Inquiry) => ui.setConvertLead(inq), [ui]);
  return {
    inquiries, stats: statsQuery.data ?? null, isPending: listQuery.isPending, isError: listQuery.isError, errorMessage: errorMessage || (statsQuery.isError ? ManagerInfrastructureGetErrorMessage(statsQuery.error, t('TEXT_GENERIC_ERROR')) : ''), totalInquiries: listQuery.data?.total ?? 0, toast: ui.toast, showToast: ui.showToast, hideToast: ui.hideToast,
    search, debouncedSearch, setSearch: (value) => { setTransientSearch(value); setUrlParam("page", "1"); }, statusFilter, setStatusFilter: (value) => setUrlParam("status", value), dateFilter, setDateFilter: (value) => setUrlParam("date", value), currentPage, setCurrentPage: (value) => setUrlParam("page", String(value)),
    selectedIds: ui.selectedIds, toggleSelectAll, toggleSelectOne, clearSelection: () => ui.setSelectedIds([]), showModal: ui.showModal, setShowModal: ui.setShowModal, editId: ui.editId, editData: ui.editData, saving: isCreating || isUpdating, openAdd, openEdit, saveInquiry, deleteInquiry, updateStatus,
    msgModal: ui.msgModal, openMsg, closeMsg: () => ui.setMsgModal(null), bulkMsgModal: ui.bulkMsgModal, openBulkMsg, closeBulkMsg: () => ui.setBulkMsgModal(null), convertLead: ui.convertLead, openConvert, closeConvert: () => ui.setConvertLead(null), convertLeadMutation: async (args: { id: string; data: Record<string, unknown> }) => convertLeadMutation({ ...args, idempotencyKey: ManagerInfrastructureIdempotency() }), isConverting, refresh };
}
