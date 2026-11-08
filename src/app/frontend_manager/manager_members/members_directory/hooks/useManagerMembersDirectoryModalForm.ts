// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useEffect, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm, useWatch } from 'react-hook-form';

import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryLocalUnsavedChangesGuard';
import { ManagerInfrastructureFromManagerMinorUnits } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryLocalFromMinorUnits';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryLocalIdempotency';

import { ManagerMembersDirectoryCreateDefaultForm } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryCreateDefaultForm';
import { ManagerMembersDirectoryCalculatePriceForCycle as getPriceForCycle } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryCalculatePriceForCycle';
import { managerMembersFormSchema } from '@/app/frontend_manager/manager_members/members_directory/schemas/manager_members_directory_form.schemas';
import { ManagerMembersDirectoryCalculateMemberExpiryDate } from '@/app/frontend_manager/manager_members/members_directory/utils/ManagerMembersDirectoryCalculateMemberExpiryDate';
import type { MemberFormValues } from '@/app/frontend_manager/manager_members/members_directory/schemas/manager_members_directory_form.schemas';
import type { PlanWithCustom } from '@/app/frontend_manager/manager_members/members_directory/types/manager_members_directory.types';
/**
 * @description useManagerMembersDirectoryModalForm owns the members feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerMembersDirectoryModalForm(
  editData: MemberFormValues | null,
  showAddModal: boolean,
  plans: PlanWithCustom[],
  setShowAddModal: (show: boolean) => void,
  saveMember: (d: MemberFormValues, idempotencyKey: string) => Promise<void>,
  editId: string | null
) {
  const { confirm } = useConfirm();
  const t = useTranslations('MANAGER_MEMBERS_DIRECTORY');
  const idempotencyKeyRef = useRef<string | null>(null);
  const idempotencyPayloadRef = useRef<string | null>(null);

  const useFormReturn = useForm<MemberFormValues>({
    resolver: zodResolver(managerMembersFormSchema),
    defaultValues: editData || ManagerMembersDirectoryCreateDefaultForm()
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isDirty }
  } = useFormReturn;

  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(showAddModal && isDirty);
  const handleClose = () => { void confirmAndClose(() => { reset(); idempotencyKeyRef.current = null; idempotencyPayloadRef.current = null; setShowAddModal(false); }); };

  // Refetch editData into form whenever modal opens for edit
  // EFFECT: Dependency list is limited to the values that control this effect.
  useEffect(() => {
    if (showAddModal) {
      const normalizedPhone = editData?.phone ? editData.phone.replace(/[\s-+]/g, '').slice(-10) : '';
      const rawGender = String(editData?.gender || '').toUpperCase();
      const normalizedGender = (['MALE', 'FEMALE', 'OTHER'].includes(rawGender) ? rawGender : 'MALE') as MemberFormValues['gender'];
      const cycleMap: Record<string, MemberFormValues['billingCycle']> = {
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
      const normalizedCycle = editData?.billingCycle ? (cycleMap[editData.billingCycle] || 'ONE_MONTH') : 'ONE_MONTH';
      const normalizedJoinDate = editData?.joinDate ? (editData.joinDate.includes('T') ? editData.joinDate.split('T')[0] : editData.joinDate.slice(0, 10)) : '';
      const normalizedExpiryDate = editData?.expiryDate ? (editData.expiryDate.includes('T') ? editData.expiryDate.split('T')[0] : editData.expiryDate.slice(0, 10)) : '';

      reset({
        ...ManagerMembersDirectoryCreateDefaultForm(),
        ...(editData || {}),
        ...(normalizedPhone ? { phone: normalizedPhone } : {}),
        gender: editData ? normalizedGender : 'MALE',
        billingCycle: editData ? normalizedCycle : 'ONE_MONTH',
        joinDate: normalizedJoinDate || ManagerMembersDirectoryCreateDefaultForm().joinDate,
        expiryDate: normalizedExpiryDate || ManagerMembersDirectoryCreateDefaultForm().expiryDate,
        totalAmount: editData?.totalAmount ? ManagerInfrastructureFromManagerMinorUnits(editData.totalAmount) : 0,
        paidAmount: editData?.paidAmount ? ManagerInfrastructureFromManagerMinorUnits(editData.paidAmount) : 0,
        pendingAmount: editData?.pendingAmount ? ManagerInfrastructureFromManagerMinorUnits(editData.pendingAmount) : 0,
        advanceAmount: editData?.advanceAmount ? ManagerInfrastructureFromManagerMinorUnits(editData.advanceAmount) : 0,
      });
    }
  }, [showAddModal, editData, reset]);

  const watchPlanId = useWatch({ control, name: 'planId' }) as string;
  const watchBillingCycle = useWatch({ control, name: 'billingCycle' }) as string;
  const watchCustomDays = useWatch({ control, name: 'customDays' }) as number;
  const watchJoinDate = useWatch({ control, name: 'joinDate' }) as string;

  // EFFECT: Dependency list is limited to the watched form values and setter used by this effect.
  useEffect(() => {
    if (watchPlanId && watchBillingCycle) {
      const selectedPlan = plans.find(p => p.id.toString() === watchPlanId.toString()) as PlanWithCustom | undefined;
      const price = getPriceForCycle(selectedPlan, watchBillingCycle, Number(watchCustomDays) || 0);
      const priceInMajorUnits = ManagerInfrastructureFromManagerMinorUnits(price);
      setValue('totalAmount', priceInMajorUnits, { shouldValidate: true });
      setValue('paidAmount', priceInMajorUnits, { shouldValidate: true }); // Default to fully paid
    }
  }, [watchPlanId, watchBillingCycle, watchCustomDays, plans, setValue]);

  // EFFECT: Dependency list is limited to the watched form values and setter used by this effect.
  useEffect(() => {
    if (!watchJoinDate || !watchBillingCycle) return;
    const expiryDate = ManagerMembersDirectoryCalculateMemberExpiryDate(watchJoinDate, watchBillingCycle, Number(watchCustomDays) || 0);
    if (expiryDate) setValue('expiryDate', expiryDate, { shouldValidate: true });
  }, [watchJoinDate, watchBillingCycle, watchCustomDays, setValue]);

  const onSubmit = async (data: MemberFormValues) => {
    let payload: Partial<MemberFormValues> & { pendingAmount?: number, advanceAmount?: number } = { ...data };
    if (!editId) {
      const total = data.totalAmount || 0;
      const paid = data.paidAmount || 0;
      if (paid <= total) {
        payload.pendingAmount = total - paid;
        payload.advanceAmount = 0;
      } else {
        payload.pendingAmount = 0;
        payload.advanceAmount = paid - total;
      }
    } else {
      // Remove fields that should not be updated during edit
      delete payload.totalAmount;
      delete payload.paidAmount;
      delete payload.pendingAmount;
      delete payload.joinDate;
      delete payload.expiryDate;
      delete payload.planId;
      delete payload.billingCycle;
      delete payload.customDays;
    }
    const requiresPaymentConfirmation = !editId && Number(data.paidAmount) > 0;
    if (requiresPaymentConfirmation) {
      const confirmed = await confirm({
        title: t('CONFIRM_MEMBER_PAYMENT_TITLE'),
        message: t('CONFIRM_MEMBER_PAYMENT_MESSAGE'),
        confirmText: t('CONFIRM_MEMBER_PAYMENT'),
        cancelText: t('KEEP_EDITING'),
        type: 'warning',
      });
      if (!confirmed) return;
      idempotencyKeyRef.current = idempotencyKeyRef.current ?? ManagerInfrastructureIdempotency();
    }

    const payloadFingerprint = JSON.stringify(payload);
    if (idempotencyPayloadRef.current !== payloadFingerprint) {
      idempotencyKeyRef.current = ManagerInfrastructureIdempotency();
      idempotencyPayloadRef.current = payloadFingerprint;
    }
    const submissionKey = idempotencyKeyRef.current ?? ManagerInfrastructureIdempotency();
    idempotencyKeyRef.current = submissionKey;
    await saveMember(payload as MemberFormValues, submissionKey);
    idempotencyKeyRef.current = null;
    idempotencyPayloadRef.current = null;
  };

  const selectedPlan = plans.find(p => p.id.toString() === watchPlanId?.toString()) as PlanWithCustom | undefined;

  return {
    useFormReturn,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isDirty,
    watchPlanId,
    watchBillingCycle,
    watchCustomDays,
    selectedPlan,
    handleClose,
    isSubmitting: useFormReturn.formState.isSubmitting };
}
