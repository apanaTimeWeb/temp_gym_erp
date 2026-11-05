import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import type { ApiResponse } from '@/lib/api';

import type { InquiryFormValues } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline_form.types';
import type { ManagerInquiriesPipelineMessageType, ManagerInquiriesPipelineMessageRecipient } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline_message.types';


export interface ManagerInquiriesPipelineViewModel {
  // Query Data
  inquiries: Inquiry[];
  stats: InquiryStats | null;
  isPending: boolean;
  isError: boolean;
  errorMessage: string;
  totalInquiries: number;
  toast: { message: string; type: ManagerToastType } | null;
  showToast: (msg: string, t: ManagerToastType) => void;
  hideToast: () => void;

  search: string;
  debouncedSearch: string;
  setSearch: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  dateFilter: string;
  setDateFilter: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  refresh: () => Promise<void>;

  // Selection State
  selectedIds: string[];
  toggleSelectAll: (selectAll: boolean) => void;
  toggleSelectOne: (id: string) => void;
  clearSelection: () => void;

  // Modal State
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  editId: string | null;
  editData: InquiryFormValues | null;
  saving: boolean;

  // Actions
  openAdd: () => void;
  openEdit: (inq: Inquiry) => void;
  saveInquiry: (data: ManagerInquiriesPipelineWritePayload) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
  updateStatus: (id: string, status: string) => Promise<void>;

  // Message Modal State
  msgModal: { open: boolean; recipient: ManagerInquiriesPipelineMessageRecipient; type: ManagerInquiriesPipelineMessageType; message: string; subject?: string } | null;
  openMsg: (inq: Inquiry, type: ManagerInquiriesPipelineMessageType) => void;
  closeMsg: () => void;

  // Bulk Message Modal State
  bulkMsgModal: { open: boolean; type: ManagerInquiriesPipelineMessageType; recipients: ManagerInquiriesPipelineMessageRecipient[] } | null;
  openBulkMsg: (type: ManagerInquiriesPipelineMessageType) => void;
  closeBulkMsg: () => void;

  convertLead: Inquiry | null;
  convertLeadMutation: (args: { id: string; data: Record<string, unknown> }) => Promise<ApiResponse<{ memberId: string }>>;
  isConverting: boolean;
  openConvert: (inq: Inquiry) => void;
  closeConvert: () => void;
}

export interface Inquiry {
  id: string; name: string; phone: string; email?: string;
  interest: string; status: string; source?: string;
  notes?: string; followUpDate?: string; createdAt: string;
  followUpLogs?: { date: string; note: string }[];
}

export type ManagerInquiriesPipelineWritePayload = Omit<Partial<Inquiry>, 'followUpLogs'> & { followUpLogs?: Array<{ date: string | Date; note: string }> };

export interface InquiryStats {
  total: number; new: number; followUp: number; converted: number; lost: number;
}
