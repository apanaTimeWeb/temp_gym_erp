// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
'use client';
// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
/** Coordinates the Manager / feature. */
import { create } from 'zustand';

import type { ManagerToastType } from '@/app/frontend_manager/manager_members/members_directory/types/ManagerMembersDirectoryLocalToastTypes';

import { ManagerMembersDirectoryCreateDefaultForm } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryCreateDefaultForm';
import type { MemberFormValues } from '@/app/frontend_manager/manager_members/members_directory/schemas/manager_members_directory_form.schemas';
import type { ManagerMembersDirectoryMessageType, ManagerMembersDirectoryMessageRecipient } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory_message.types';
import type { ManagerMembersDirectoryReceiptData } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory_thermal_receipt.types';
import type { Member, MemberProfileTab } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';


interface ManagerMembersDirectoryUiState {
  search: string;
  setSearch: (value: string) => void;
  showAddModal: boolean; showRenewModal: boolean; showPaymentModal: boolean;
  editId: string | null; editData: MemberFormValues | null;
  selectedMemberId: string | null; profileTab: MemberProfileTab;
  msgModal: { open: boolean; recipient: ManagerMembersDirectoryMessageRecipient; type: ManagerMembersDirectoryMessageType; message: string; subject?: string } | null;
  toast: { message: string; type: ManagerToastType } | null;
  printData: ManagerMembersDirectoryReceiptData | null;
  setShowAddModal: (value: boolean) => void; setShowRenewModal: (value: boolean) => void; setShowPaymentModal: (value: boolean) => void;
  setEditId: (value: string | null) => void; setEditData: (value: MemberFormValues | null) => void;
  setSelectedMemberId: (value: string | null) => void; setProfileTab: (value: MemberProfileTab) => void;
  setMsgModal: (value: ManagerMembersDirectoryUiState['msgModal']) => void; setToast: (value: ManagerMembersDirectoryUiState['toast']) => void;
  setPrintData: (value: ManagerMembersDirectoryReceiptData | null) => void;
  showToast: (message: string, type: ManagerToastType) => void; hideToast: () => void;
  openAdd: () => void; openEdit: (member: Member) => void; closeMsg: () => void;
}

/**
 * @description Coordinates members feature state and its documented UI/API boundary through useManagerMembersDirectoryUiStore.
 * @dependencies Uses ManagerMembersDirectorySharedConstants, ManagerToastTypes, ManagerMembersDirectoryFormSchema, ManagerMembersDirectoryMessageTypes.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
export const useManagerMembersDirectoryUiStore = create<ManagerMembersDirectoryUiState>((set) => ({
  search: '',
  setSearch: (search) => set({ search }),
  showAddModal: false, showRenewModal: false, showPaymentModal: false, editId: null, editData: null,
  selectedMemberId: null, profileTab: 'overview', msgModal: null, toast: null, printData: null,
  setShowAddModal: (showAddModal) => set({ showAddModal }), setShowRenewModal: (showRenewModal) => set({ showRenewModal }), setShowPaymentModal: (showPaymentModal) => set({ showPaymentModal }),
  setEditId: (editId) => set({ editId }), setEditData: (editData) => set({ editData }), setSelectedMemberId: (selectedMemberId) => set({ selectedMemberId }), setProfileTab: (profileTab) => set({ profileTab }),
  setMsgModal: (msgModal) => set({ msgModal }), setToast: (toast) => set({ toast }), setPrintData: (printData) => set({ printData }),
  showToast: (message, type) => set({ toast: { message, type } }), hideToast: () => set({ toast: null }),
  openAdd: () => set({ editId: null, editData: ManagerMembersDirectoryCreateDefaultForm(), showAddModal: true }),
  openEdit: (member) => {
    const rawGender = String(member.gender || '').toUpperCase();
    const gender = (['MALE', 'FEMALE', 'OTHER'].includes(rawGender) ? rawGender : 'MALE') as MemberFormValues['gender'];
    const billingCycleMap: Record<string, MemberFormValues['billingCycle']> = {
      Monthly: 'ONE_MONTH',
      ONE_MONTH: 'ONE_MONTH',
      Quarterly: 'THREE_MONTHS',
      THREE_MONTHS: 'THREE_MONTHS',
      Semiannual: 'SIX_MONTHS',
      SIX_MONTHS: 'SIX_MONTHS',
      Annual: 'TWELVE_MONTHS',
      TWELVE_MONTHS: 'TWELVE_MONTHS',
      CUSTOM: 'CUSTOM',
    };
    const billingCycle = billingCycleMap[member.billingCycle] || 'ONE_MONTH';
    const joinDate = member.joinDate ? (member.joinDate.includes('T') ? member.joinDate.split('T')[0] : member.joinDate.slice(0, 10)) : '';
    const expiryDate = member.expiryDate ? (member.expiryDate.includes('T') ? member.expiryDate.split('T')[0] : member.expiryDate.slice(0, 10)) : '';

    set({
      editId: member.id,
      editData: {
        name: member.name,
        email: member.email || '',
        phone: member.phone,
        address: member.address || '',
        aadhaar: member.aadhaar || '',
        medicalHistory: member.medicalHistory || '',
        gender,
        billingCycle,
        customDays: 0,
        planId: String(member.planId),
        joinDate,
        expiryDate,
        paidAmount: member.paidAmount || 0,
        totalAmount: (member.paidAmount || 0) + (member.pendingAmount || 0)
      },
      showAddModal: true
    });
  },
  closeMsg: () => set({ msgModal: null }) }));
