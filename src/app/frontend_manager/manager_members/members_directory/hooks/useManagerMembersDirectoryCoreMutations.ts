// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import type { ManagerToastType } from '@/app/frontend_manager/manager_members/members_directory/types/ManagerMembersDirectoryLocalToastTypes';

import { ManagerInfrastructureGetErrorMessage } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryLocalGetErrorMessage';
import { ManagerInfrastructureToManagerMinorUnits } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryLocalToMinorUnits';

import { ManagerMembersDirectoryApi } from '@/app/frontend_manager/manager_members/members_directory/api/manager_members_directory.api';
import { ManagerMembersDirectoryQueryKeys } from '@/app/frontend_manager/manager_members/members_directory/api/manager_members_directory.query_keys';
import { MEMBER_ACTIVE_STATUS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
import { MEMBER_PAID_STATUS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
import type { MemberFormValues } from '@/app/frontend_manager/manager_members/members_directory/schemas/manager_members_directory_form.schemas';
import type { Member, ManagerMembersDirectoryPaymentMethod } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates members feature state and its documented UI/API boundary through useManagerMembersDirectoryCoreMutations.
 * @dependencies Uses ManagerInfrastructureToManagerMinorUnits and ManagerInfrastructureFromManagerMinorUnits, ManagerMembersDirectoryApi, ManagerToastTypes, ManagerMembersDirectoryFormSchema.
 * @edge-case reuses the caller-provided idempotency key for the same mutation intent.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerMembersDirectoryCoreMutations owns the members feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMembersDirectoryCoreMutations(
  showToast: (msg: string, t: ManagerToastType) => void,
  selectedMember: Member | null,
  setSelectedMember: (member: Member | null) => void,
  editId: string | null,
  setShowAddModal: (s: boolean) => void,
  setShowRenewModal: (s: boolean) => void,
  setShowPaymentModal: (s: boolean) => void
) {
  const t = useTranslations('MANAGER_MEMBERS_DIRECTORY');
  const queryClient = useQueryClient();
  const saveMutation = useMutation({
    mutationFn: async ({ data, idempotencyKey }: { data: MemberFormValues; idempotencyKey: string }) => {
      if (editId) {
        const response = await ManagerMembersDirectoryApi.updateMember(editId, data, idempotencyKey);
        if (!response.success) throw new Error(response.message || 'Unable to update member');
        return { ...response, paymentPending: false };
      } else {
        const payload = {
          ...data,
          status: MEMBER_ACTIVE_STATUS,
          paidAmount: data.paidAmount === undefined ? undefined : ManagerInfrastructureToManagerMinorUnits(data.paidAmount),
          pendingAmount: data.pendingAmount === undefined ? undefined : ManagerInfrastructureToManagerMinorUnits(data.pendingAmount),
          advanceAmount: data.advanceAmount === undefined ? undefined : ManagerInfrastructureToManagerMinorUnits(data.advanceAmount),
        };
        const res = await ManagerMembersDirectoryApi.createMember(payload, idempotencyKey);
        if (!res.success) throw new Error(res.message || 'Unable to create member');
        const newId = res.data.id;
        let paymentPending = false;
        if (data.paidAmount && data.paidAmount > 0 && newId) {
          const payment = await ManagerMembersDirectoryApi.createMemberPayment(newId, {
            amount: ManagerInfrastructureToManagerMinorUnits(data.paidAmount),
            method: 'UPI', status: MEMBER_PAID_STATUS, paidAt: new Date()
          }, `${idempotencyKey}:initial-payment`);
          paymentPending = !payment.success;
        }
        return { ...res, paymentPending };
      }
    },
    onSuccess: (res) => {
      const paymentPending = 'paymentPending' in res && res.paymentPending;
      showToast(paymentPending ? t('TEXT_MEMBER_CREATED_PAYMENT_PENDING') : res.message, paymentPending ? 'warning' : 'success');
      setShowAddModal(false);
      void queryClient.invalidateQueries({ queryKey: ManagerMembersDirectoryQueryKeys.all });

    },
    onError: (err: Error) => showToast(ManagerInfrastructureGetErrorMessage(err, t('TEXT_GENERIC_ERROR')), 'error')
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => { const response = await ManagerMembersDirectoryApi.deleteMember(id, idempotencyKey); if (!response.success) throw new Error(response.message || 'Unable to delete member'); return response; },
    onSuccess: (res, id) => {
      showToast(res.message, 'success');
      void queryClient.invalidateQueries({ queryKey: ManagerMembersDirectoryQueryKeys.all });
      if (selectedMember?.id === id.id) setSelectedMember(null);
    },
    onError: (err: Error) => showToast(ManagerInfrastructureGetErrorMessage(err, t('TEXT_GENERIC_ERROR')), 'error')
  });

  const renewMutation = useMutation({
    mutationFn: async (data: { planId: string; newExpiryDate: string; amountPaid: number; paymentMethod: string; billingCycle: string; customDays?: number; memberId: string; idempotencyKey: string }) => {
      const payload = {
         planId: data.planId,
         expiryDate: data.newExpiryDate,
         billingCycle: data.billingCycle,
         customDays: data.customDays,
         status: MEMBER_ACTIVE_STATUS };
      const updateResponse = await ManagerMembersDirectoryApi.updateMember(data.memberId, payload, `${data.idempotencyKey}:renewal`);
      if (!updateResponse.success) throw new Error(updateResponse.message || 'Unable to update membership');
      const paymentResponse = await ManagerMembersDirectoryApi.createMemberPayment(data.memberId, {
        amount: ManagerInfrastructureToManagerMinorUnits(data.amountPaid),
        method: data.paymentMethod as ManagerMembersDirectoryPaymentMethod,
        status: MEMBER_PAID_STATUS, paidAt: new Date()
      }, `${data.idempotencyKey}:renewal-payment`);
      return { payload, res: paymentResponse, paymentPending: !paymentResponse.success };
    },
    onSuccess: (data, variables) => {
      showToast(data.paymentPending ? t('TEXT_MEMBER_CREATED_PAYMENT_PENDING') : data.res.message, data.paymentPending ? 'warning' : 'success');
      setShowRenewModal(false);
      void queryClient.invalidateQueries({ queryKey: ManagerMembersDirectoryQueryKeys.all });

    },
    onError: (err: Error) => showToast(ManagerInfrastructureGetErrorMessage(err, t('TEXT_GENERIC_ERROR')), 'error')
  });

  const recordPaymentMutation = useMutation({
    mutationFn: async (data: { amount: number; method: string; memberId: string; idempotencyKey: string }) => {
      const res = await ManagerMembersDirectoryApi.createMemberPayment(data.memberId, {
         amount: ManagerInfrastructureToManagerMinorUnits(data.amount),
         method: data.method as ManagerMembersDirectoryPaymentMethod,
         status: MEMBER_PAID_STATUS,
         paidAt: new Date()
      }, data.idempotencyKey);
      if (!res.success) throw new Error(res.message || 'Unable to record payment');
      return res;
    },
    onSuccess: (res) => {
      showToast(res.message, 'success');
      setShowPaymentModal(false);
      void queryClient.invalidateQueries({ queryKey: ManagerMembersDirectoryQueryKeys.all });
    },
    onError: (err: Error) => showToast(ManagerInfrastructureGetErrorMessage(err, t('TEXT_GENERIC_ERROR')), 'error')
  });

  return { saveMutation, deleteMutation, renewMutation, recordPaymentMutation };
}
