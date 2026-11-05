// DATA FLOW: Owning module inputs → this hook state/derived result → consuming module-owned components.
'use client';
import { useEffect } from 'react';

import type { UseFormReset, UseFormSetValue } from 'react-hook-form';

import { ManagerInfrastructureFromManagerMinorUnits } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryLocalFromMinorUnits';

import { BILLING_CYCLE_ONE_MONTH } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_billing_cycle.constants';
import { ManagerMembersDirectoryCalculateMemberExpiryDate } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryCalculateMemberExpiryDate';
import type { ManagerMembersDirectoryRenewFormValues } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory_renew_form.types';
import type { Member } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';

type RenewFormEffectsInput = {
  showRenewModal: boolean;
  selectedMember: Member | null;
  reset: UseFormReset<ManagerMembersDirectoryRenewFormValues>;
  setValue: UseFormSetValue<ManagerMembersDirectoryRenewFormValues>;
  actionType?: string;
  planId?: string;
  billingCycle?: string;
  calculatedPrice: number;
  customDays: number;
};

/** Keeps renewal form defaults and derived amount/expiry values synchronized with its selected member and plan. */
export function useManagerMembersDirectoryRenewFormEffects(input: RenewFormEffectsInput): void {
  const { showRenewModal, selectedMember, reset, setValue, actionType, planId, billingCycle, calculatedPrice, customDays } = input;
  const selectedMemberId = selectedMember?.id;

  // EFFECT: Reset the form only when the modal opens or its selected member changes; these dependencies define the source record for the renewal draft.
  useEffect(() => {
    if (!showRenewModal || !selectedMember) return;
    reset({
      actionType: 'renew', planId: String(selectedMember.planId ?? ''),
      billingCycle: selectedMember.billingCycle ?? BILLING_CYCLE_ONE_MONTH,
      customDays: undefined, totalAmount: 0, paidAmount: 0, paymentMethod: 'UPI', newExpiryDate: '',
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, selectedMemberId, showRenewModal]);

  // EFFECT: Recalculate amount and expiry when their source inputs change; setValue is included because the effect writes through the form API.
  useEffect(() => {
    if (!selectedMember || !planId || !billingCycle) return;
    const currentExpiry = new Date(selectedMember.expiryDate);
    const now = new Date();
    const baseDate = actionType === 'renew' && currentExpiry > now ? currentExpiry : now;
    const expiryDate = ManagerMembersDirectoryCalculateMemberExpiryDate(baseDate, billingCycle, customDays);
    const amount = ManagerInfrastructureFromManagerMinorUnits(calculatedPrice);
    setValue('totalAmount', amount, { shouldValidate: true });
    setValue('paidAmount', amount, { shouldValidate: true });
    if (expiryDate) setValue('newExpiryDate', expiryDate, { shouldValidate: true });
  }, [actionType, billingCycle, calculatedPrice, customDays, planId, selectedMemberId, setValue]);
}
