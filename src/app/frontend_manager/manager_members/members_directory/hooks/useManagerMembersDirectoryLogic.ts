// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useCallback, useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useLocale } from 'next-intl';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_members/members_directory/constants/ManagerMembersDirectoryLocalEnvConfig';

import { ManagerMembersDirectoryApi } from '@/app/frontend_manager/manager_members/members_directory/api/manager_members_directory.api';
import { MANAGER_MEMBERS_DIRECTORY_STATUS_EXPIRED } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
import { ManagerMembersDirectoryQueryKeys } from '@/app/frontend_manager/manager_members/members_directory/api/manager_members_directory.query_keys';
import { ManagerMembersDirectoryCreateDefaultForm } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryCreateDefaultForm';
import { ManagerMembersDirectoryMessageTemplates as MSG_TEMPLATES } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryMessageTemplates';
import { useManagerMembersDirectoryMutations } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryMutations';
import { useManagerMembersDirectoryPrintLogic } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryPrintLogic';
import { useFetchMember } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryQueries';
import { useManagerMembersDirectoryUrlState } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryUrlState';
import { useManagerMembersDirectoryUiStore } from '@/app/frontend_manager/manager_members/members_directory/state/useManagerMembersDirectoryUiStore';
import { downloadManagerMembersDirectoryCsv, printManagerMembersDirectoryPdf } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryExportUtils';
import { ManagerMembersDirectoryFormatCurrency } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryFormatters';
import type { ManagerMembersDirectoryMessageType } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory_message.types';
import type { Member, ManagerMembersDirectoryViewModel, ExportFormat } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';



/**
 * @description Builds the members-directory view model by coordinating URL state, selected-member cache state, local UI state, mutations, messaging, printing, and exports.
 * @dependencies Uses useManagerMembersDirectoryUrlState, ManagerMembersDirectoryQueryKeys/useFetchMember, the directory UI store, feature mutation and print hooks, ManagerMembersDirectoryApi, formatters, and export utilities.
 * @edge-case A deep link with action=add_member pre-fills the add form and then clears the consumed URL parameters; the URL profile ID takes precedence over the local selected-member ID; selection writes detail data to the matching query cache entry.
 * @returns URL filters and navigation setters, selected-member/profile controls, modal and toast state, member mutation actions, message/print/share actions, and CSV/PDF export action.
 */
export function useManagerMembersDirectoryLogic(): ManagerMembersDirectoryViewModel {
  const urlState = useManagerMembersDirectoryUrlState();
  const locale = useLocale();

  const ui = useManagerMembersDirectoryUiStore();
  const queryClient = useQueryClient();
  const activeMemberId = urlState.memberProfileId ?? ui.selectedMemberId;
  const { data: selectedMember = null } = useFetchMember(activeMemberId);
  const setSelectedMember = useCallback((member: Member | null) => {
    if (member) {
      queryClient.setQueryData(ManagerMembersDirectoryQueryKeys.detail(member.id), member);
    }
    ui.setSelectedMemberId(member?.id ?? null);
  }, [queryClient, ui.setSelectedMemberId]);
  const openMemberProfile = useCallback((member: Member) => {
    queryClient.setQueryData(ManagerMembersDirectoryQueryKeys.detail(member.id), member);
    ui.setSelectedMemberId(member.id);
    urlState.setMemberProfileView(member.id);
  }, [queryClient, ui.setSelectedMemberId, urlState.setMemberProfileView]);
  const closeMemberProfile = useCallback(() => {
    ui.setSelectedMemberId(null);
    urlState.setMemberProfileView(null);
  }, [ui.setSelectedMemberId, urlState.setMemberProfileView]);
  const showToast = ui.showToast;
  const hideToast = ui.hideToast;
  const closeMsg = ui.closeMsg;

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    if (urlState.searchParams.get('action') !== 'add_member') return;

    const name = urlState.searchParams.get('name') || '';
    const phone = urlState.searchParams.get('phone') || '';
    const email = urlState.searchParams.get('email') || '';
    ui.setEditId(null);
    ui.setEditData({ ...ManagerMembersDirectoryCreateDefaultForm(), name, phone, email });
    ui.setShowAddModal(true);
    urlState.clearUrlParams(['action', 'name', 'phone', 'email']);
  }, [ui.setEditId, ui.setEditData, ui.setShowAddModal, urlState.searchParams, urlState.clearUrlParams]);

  const openAdd = ui.openAdd;
  const openEdit = ui.openEdit;

  const { saveMember, deleteMember, assignDiet, assignWorkout, renewMember, recordPayment, freezeMember, toggleSuspend, assignTrainer } = useManagerMembersDirectoryMutations(
    showToast, selectedMember, setSelectedMember, ui.editId, ui.setShowAddModal, ui.setShowRenewModal, ui.setShowPaymentModal
  );

  const exportMembers = useCallback(async (format: ExportFormat) => {
    const response = await ManagerMembersDirectoryApi.exportMembersReport({
      search: urlState.debouncedSearch,
      status: urlState.statusFilter,
      gender: urlState.genderFilter,
      plan: urlState.planFilter,
      expiryFrom: urlState.expiryFrom,
      expiryTo: urlState.expiryTo,
      sort: urlState.sortColumn,
      dir: urlState.sortDirection });
    const allMembers = response.data?.members ?? [];
    if (format === 'csv') downloadManagerMembersDirectoryCsv(allMembers, locale);
    else printManagerMembersDirectoryPdf(allMembers, locale);
  }, [locale, urlState.debouncedSearch, urlState.statusFilter, urlState.genderFilter, urlState.planFilter, urlState.expiryFrom, urlState.expiryTo, urlState.sortColumn, urlState.sortDirection]);

  const { printData, setPrintData, handlePrint, handleSharePaymentWhatsApp } = useManagerMembersDirectoryPrintLogic(
    selectedMember, showToast
  );

  const openMsg = useCallback((m: Member, type: ManagerMembersDirectoryMessageType) => {
    const tpl = (() => { if (m.status === MANAGER_MEMBERS_DIRECTORY_STATUS_EXPIRED) return MSG_TEMPLATES.EXPIRED(m.name); return (() => { if (m.pendingAmount > 0) return MSG_TEMPLATES.PENDING(m.name, ManagerMembersDirectoryFormatCurrency(m.pendingAmount, ManagerEnvConfig.currencyCode, locale)); return MSG_TEMPLATES.DEFAULT(m.name); })(); })();
    ui.setMsgModal({ open: true, type, recipient: { name: m.name, phone: m.phone, email: m.email }, message: tpl });
  }, [locale, ui]);

  return {
    ...urlState,
    toast: ui.toast, showToast, hideToast,
    selectedMember, setSelectedMember, openMemberProfile, closeMemberProfile, isMemberProfileView: urlState.view === 'member-profile', profileTab: ui.profileTab, setProfileTab: ui.setProfileTab,
    showAddModal: ui.showAddModal, setShowAddModal: ui.setShowAddModal, editId: ui.editId, editData: ui.editData,
    showRenewModal: ui.showRenewModal, setShowRenewModal: ui.setShowRenewModal,
    showPaymentModal: ui.showPaymentModal, setShowPaymentModal: ui.setShowPaymentModal,
    openAdd, openEdit, 
    saveMember: async (data, idempotencyKey) => { await saveMember(data, idempotencyKey); }, 
    deleteMember: async (id) => { await deleteMember(id); }, 
    assignDiet: async (memberId, diet) => { await assignDiet(memberId, diet); }, 
    assignWorkout: async (memberId, workout) => { await assignWorkout(memberId, workout); }, 
    renewMember: async (data, key) => { await renewMember(data, key); }, 
    recordPayment: async (data, key) => { await recordPayment(data, key); }, 
    freezeMember: async (frozen, until) => { await freezeMember(frozen, until); }, 
    toggleSuspend: async (suspend) => { await toggleSuspend(suspend); }, 
    assignTrainer: async (memberId, trainerId, trainerName, isPT) => { await assignTrainer(memberId, trainerId, trainerName, isPT); },
    msgModal: ui.msgModal, openMsg, closeMsg,
    printData: ui.printData, handlePrint, handleSharePaymentWhatsApp, setPrintData: ui.setPrintData, exportMembers
  };
}
