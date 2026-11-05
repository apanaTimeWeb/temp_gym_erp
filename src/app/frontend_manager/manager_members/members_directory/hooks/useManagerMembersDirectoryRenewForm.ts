// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useMemo, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useForm, useWatch } from 'react-hook-form';

import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_members/members_directory/constants/ManagerMembersDirectoryLocalEnvConfig';
import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryLocalUnsavedChangesGuard';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryLocalIdempotency';
import { ManagerInfrastructureToManagerMinorUnits } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryLocalToMinorUnits';

import { BILLING_CYCLE_ONE_MONTH } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_billing_cycle.constants';
import { ManagerMembersDirectoryCalculatePriceForCycle as getPriceForCycle } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryCalculatePriceForCycle';
import { MEMBER_RENEW_PAYMENT_METHOD_OPTIONS, MEMBERS_CYCLE_LABELS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_ui.constants';
import { useManagerMembersDirectoryLogic } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryLogic';
import { useFetchPlans } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryQueries';
import { useManagerMembersDirectoryRenewFormEffects } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryRenewFormEffects';
import { managerMembersRenewFormSchema } from '@/app/frontend_manager/manager_members/members_directory/schemas/manager_members_directory_renew_form.schemas';
import { ManagerMembersDirectoryFormatCurrency } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryFormatters';
import type { ManagerMembersDirectoryRenewFormValues } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory_renew_form.types';
import type { PlanWithCustom } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';

/**
 * @description Owns the member-renewal form workflow: schema validation, plan/price derivation, confirmation, idempotent submission, and modal close protection.
 * @dependencies Uses react-hook-form with managerMembersRenewFormSchema, useManagerMembersDirectoryLogic, useFetchPlans, useConfirm, the unsaved-changes guard, minor-unit conversion, and ManagerInfrastructureIdempotency.
 * @edge-case Submission exits when no member is selected or confirmation is declined; the same payload fingerprint reuses its idempotency key, while a changed payload receives a new key; successful renewal resets the form and closes the modal.
 * @returns Modal visibility controls, selected member and plans, form/watch values, selected plan and calculated price, payment/cycle options, submit handler, and guarded close handler.
 */
export function useManagerMembersDirectoryRenewForm() {
  const { showRenewModal, setShowRenewModal, selectedMember, renewMember } = useManagerMembersDirectoryLogic();
  const locale = useLocale();
  const t = useTranslations('MANAGER_MEMBERS_DIRECTORY');
  const { data: plansData } = useFetchPlans();
  const plans = plansData ?? [];
  const { confirm } = useConfirm();
  const idempotencyKeyRef = useRef<string | null>(null);
  const idempotencyPayloadRef = useRef<string | null>(null);
  const form = useForm<ManagerMembersDirectoryRenewFormValues>({
    resolver: zodResolver(managerMembersRenewFormSchema),
    defaultValues: {
      actionType: 'renew',
      planId: '',
      billingCycle: BILLING_CYCLE_ONE_MONTH,
      customDays: undefined,
      totalAmount: 0,
      paidAmount: 0,
      paymentMethod: 'UPI',
      newExpiryDate: '',
    },
  });
  const {
    control,
    reset,
    setValue,
    formState: { isDirty, isSubmitting },
  } = form;
  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(isDirty && !isSubmitting);

  const actionType = useWatch({ control, name: 'actionType' });
  const planId = useWatch({ control, name: 'planId' });
  const billingCycle = useWatch({ control, name: 'billingCycle' });
  const customDays = useWatch({ control, name: 'customDays' }) ?? 0;
  const selectedPlan = useMemo(
    () => plans.find((plan) => String(plan.id) === planId) as PlanWithCustom | undefined,
    [plans, planId],
  );
  const calculatedPrice = useMemo(
    () => getPriceForCycle(selectedPlan, billingCycle, customDays),
    [selectedPlan, billingCycle, customDays],
  );

  useManagerMembersDirectoryRenewFormEffects({
    showRenewModal, selectedMember, reset, setValue, actionType, planId, billingCycle, calculatedPrice, customDays,
  });

  const submit = form.handleSubmit(async (data) => {
    if (!selectedMember) return;
    const confirmed = await confirm({
      title: data.actionType === 'renew' ? t('TEXT_CONFIRM_MEMBERSHIP_RENEWAL') : t('TEXT_CONFIRM_MEMBERSHIP_UPGRADE'),
      message: t('TEXT_CONFIRM_RENEW_ACTION_MESSAGE', {
        actionType: data.actionType,
        member: selectedMember.name,
        paymentMethod: data.paymentMethod,
        amount: ManagerMembersDirectoryFormatCurrency(ManagerInfrastructureToManagerMinorUnits(data.paidAmount), ManagerEnvConfig.currencyCode, locale),
      }),
      confirmText: data.actionType === 'renew' ? t('TEXT_CONFIRM_RENEWAL') : t('TEXT_CONFIRM_UPGRADE'),
      type: 'danger',
    });
    if (!confirmed) return;
    const renewalPayload = { ...data, amountPaid: data.paidAmount };
    const payloadFingerprint = JSON.stringify(renewalPayload);
    if (idempotencyPayloadRef.current !== payloadFingerprint) {
      idempotencyKeyRef.current = ManagerInfrastructureIdempotency();
      idempotencyPayloadRef.current = payloadFingerprint;
    }
    const submissionKey = idempotencyKeyRef.current ?? ManagerInfrastructureIdempotency();
    idempotencyKeyRef.current = submissionKey;
    await renewMember(renewalPayload, submissionKey);
    idempotencyKeyRef.current = null;
    idempotencyPayloadRef.current = null;
    reset();
    setShowRenewModal(false);
  });

  const handleClose = () => {
    void confirmAndClose(() => {
      idempotencyKeyRef.current = null;
      idempotencyPayloadRef.current = null;
      setShowRenewModal(false);
    });
  };

  return {
    showRenewModal,
    setShowRenewModal,
    selectedMember,
    plans,
    form,
    actionType,
    planId,
    billingCycle,
    customDays,
    selectedPlan,
    calculatedPrice,
    paymentMethods: MEMBER_RENEW_PAYMENT_METHOD_OPTIONS,
    cycleLabels: MEMBERS_CYCLE_LABELS,
    submit,
    handleClose,
  };
}
