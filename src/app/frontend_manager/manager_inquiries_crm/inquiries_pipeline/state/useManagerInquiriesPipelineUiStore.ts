// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
'use client';
// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
/** Coordinates the Manager / feature. */
import { create } from "zustand";

import type { ManagerToastType } from "@/components/ui/manager_toast/ManagerToastTypes";

import type { InquiryFormValues } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline_form.types';
import type { ManagerInquiriesPipelineMessageType, ManagerInquiriesPipelineMessageRecipient } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline_message.types';
import type { Inquiry } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline.types';


type ManagerInquiriesPipelineMessageModal = { open: boolean; recipient: ManagerInquiriesPipelineMessageRecipient; type: ManagerInquiriesPipelineMessageType; message: string; subject?: string };
type ManagerInquiriesPipelineBulkMessageModal = { open: boolean; type: ManagerInquiriesPipelineMessageType; recipients: ManagerInquiriesPipelineMessageRecipient[] };
interface ManagerInquiriesPipelineUiState {
  toast: { message: string; type: ManagerToastType } | null;
  showModal: boolean; editId: string | null; editData: InquiryFormValues | null;
  msgModal: ManagerInquiriesPipelineMessageModal | null; bulkMsgModal: ManagerInquiriesPipelineBulkMessageModal | null;
  convertLead: Inquiry | null; selectedIds: string[];
  showToast: (message: string, type: ManagerToastType) => void; hideToast: () => void;
  setShowModal: (show: boolean) => void; setEditId: (id: string | null) => void; setEditData: (data: InquiryFormValues | null) => void;
  setMsgModal: (value: ManagerInquiriesPipelineMessageModal | null) => void; setBulkMsgModal: (value: ManagerInquiriesPipelineBulkMessageModal | null) => void;
  setConvertLead: (value: Inquiry | null) => void; setSelectedIds: (ids: string[] | ((current: string[]) => string[])) => void;
}
/**
 * @description Coordinates inquiries feature state and its documented UI/API boundary through useManagerInquiriesPipelineUiStore.
 * @dependencies Uses ManagerInquiriesPipelineFormTypes, ManagerInquiriesPipelineMessageTypes, ManagerInquiriesPipelineTypes, ManagerToastTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
export const useManagerInquiriesPipelineUiStore = create<ManagerInquiriesPipelineUiState>((set) => ({
  toast: null, showModal: false, editId: null, editData: null, msgModal: null, bulkMsgModal: null, convertLead: null, selectedIds: [],
  showToast: (message, type) => set({ toast: { message, type } }), hideToast: () => set({ toast: null }),
  setShowModal: (showModal) => set({ showModal }), setEditId: (editId) => set({ editId }), setEditData: (editData) => set({ editData }),
  setMsgModal: (msgModal) => set({ msgModal }), setBulkMsgModal: (bulkMsgModal) => set({ bulkMsgModal }), setConvertLead: (convertLead) => set({ convertLead }),
  setSelectedIds: (next) => set((state) => ({ selectedIds: typeof next === "function" ? next(state.selectedIds) : next })) }));
