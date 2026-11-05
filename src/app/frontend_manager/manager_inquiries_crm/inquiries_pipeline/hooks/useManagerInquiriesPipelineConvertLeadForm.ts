// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
'use client';
import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';

import { MANAGER_INQUIRY_ACTIVE_STATUS } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline.constants';
import { INQUIRIES_CYCLE_LABELS, INQUIRIES_GENDER_OPTIONS } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline_convert.constants';
import { ManagerInquiriesPipelineCalculatePriceForCycle as getPriceForCycleSnapshot } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/utils/ManagerInquiriesPipelineCalculatePriceForCycle';
import { EMPTY_CONVERT_FORM } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline_form_defaults.constants';
import { useManagerInquiriesPipelineLogic } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/hooks/useManagerInquiriesPipelineLogic';
import { useInquiryPlansSnapshotQuery } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/hooks/useManagerInquiriesPipelineQueries';
import { managerConvertLeadFormSchema } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/schemas/manager_inquiries_pipeline_convert_lead_form.schemas';
import type { ConvertLeadFormValues } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline_form.types';
import type { PlanSnapshot } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline_plan_snapshot.types';
/** Adds billing months with end-of-month clamping; date-only values are handled in UTC to avoid timezone drift. */
export function calculateManagerInquiryExpiryDate(joinDate: string, billingCycle: string, customDays = 0): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(joinDate);
  if (!match) return null;
  const year = Number(match[1]); const month = Number(match[2]) - 1; const day = Number(match[3]);
  const source = new Date(Date.UTC(year, month, day));
  if (source.getUTCFullYear() !== year || source.getUTCMonth() !== month || source.getUTCDate() !== day) return null;
  const monthsByCycle: Record<string, number> = { ONE_MONTH: 1, THREE_MONTHS: 3, SIX_MONTHS: 6, TWELVE_MONTHS: 12 };
  const months = monthsByCycle[billingCycle];
  if (months !== undefined) {
    const targetMonthStart = new Date(Date.UTC(year, month + months, 1));
    const targetYear = targetMonthStart.getUTCFullYear(); const targetMonth = targetMonthStart.getUTCMonth();
    const lastDay = new Date(Date.UTC(targetYear, targetMonth + 1, 0)).getUTCDate();
    const expiry = new Date(Date.UTC(targetYear, targetMonth, Math.min(day, lastDay)));
    return expiry.toISOString().slice(0, 10);
  }
  if (billingCycle === 'CUSTOM' && Number.isSafeInteger(customDays) && customDays >= 1) {
    source.setUTCDate(source.getUTCDate() + customDays);
    return source.toISOString().slice(0, 10);
  }
  return null;
}

export type ManagerInquiriesPipelineConvertLeadSuccessData = { gymId: string; name: string; phone: string; planName: string; joinDate: string; expiryDate: string; paidAmount: number; pendingAmount: number; aadhaar?: string };

/** Coordinates lead conversion calculations and the two-step conversion/status mutation flow. */
/**
 * @description Coordinates inquiries feature state and its documented UI/API boundary through useManagerInquiriesPipelineConvertLeadForm.
 * @dependencies Uses useManagerInquiriesPipelineLogic, useManagerInquiriesPipelineQueries, ManagerInquiriesPipelineConvertLeadFormSchema, ManagerInquiriesPipelineFormTypes.
 * @edge-case preserves explicit loading state until the query or mutation settles.
 */
/**
 * @description Owns the Manager Inquiries convert-lead form lifecycle, validation, confirmation, and submission state.
 * @dependencies Uses the module schema, mutation hook, translations, and unsaved-change protection.
 * @edge-case Prevents duplicate conversion and preserves dirty state until successful completion or explicit discard.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerInquiriesPipelineConvertLeadForm owns the inquiries feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerInquiriesPipelineConvertLeadForm() {
  const { convertLead: activeLead, closeConvert, updateStatus, convertLeadMutation } = useManagerInquiriesPipelineLogic();
  const { data: plansData, isPending: plansLoading } = useInquiryPlansSnapshotQuery();
  const plans = (plansData || []) as PlanSnapshot[];
  const form = useForm<ConvertLeadFormValues>({ resolver: zodResolver(managerConvertLeadFormSchema), defaultValues: EMPTY_CONVERT_FORM });
  const [saving, setSaving] = useState(false);
  const [successData, setSuccessData] = useState<ManagerInquiriesPipelineConvertLeadSuccessData | null>(null);
  const planId = form.watch('planId'); const billingCycle = form.watch('billingCycle'); const customDays = form.watch('customDays'); const joinDate = form.watch('joinDate');
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (activeLead) form.reset({ ...EMPTY_CONVERT_FORM, name: activeLead.name, phone: activeLead.phone, email: activeLead.email || '' }); }, [activeLead, form]);
  useEffect(() => { if (!planId || !billingCycle) return; const selectedPlan = plans.find((plan) => String(plan.id) === String(planId)); const price = getPriceForCycleSnapshot(selectedPlan, billingCycle, Number(customDays) || 0); form.setValue('totalAmount', price, { shouldValidate: true }); form.setValue('paidAmount', price, { shouldValidate: true }); }, [billingCycle, customDays, form, planId, plans]);
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => { if (!joinDate || !billingCycle) { form.setValue('expiryDate', '', { shouldValidate: true }); return; } const expiryDate = calculateManagerInquiryExpiryDate(joinDate, billingCycle, Number(customDays) || 0); form.setValue('expiryDate', expiryDate ?? '', { shouldValidate: true }); }, [billingCycle, customDays, form, joinDate]);
  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(Boolean(activeLead) && form.formState.isDirty && !saving);
  const handleClose = () => { void confirmAndClose(closeConvert); };
  const submit = form.handleSubmit(async (data) => {
    if (!activeLead) return;
    setSaving(true);
    try {
      const total = data.totalAmount || 0; const paid = data.paidAmount || 0; const pendingAmount = Math.max(0, total - paid);
      const res = await convertLeadMutation({ id: activeLead.id, data: { ...data, pendingAmount, status: MANAGER_INQUIRY_ACTIVE_STATUS } });
      await updateStatus(activeLead.id, 'CONVERTED');
      const planName = plans.find((plan) => String(plan.id) === String(data.planId))?.name || 'Membership';
      setSuccessData({ gymId: res?.data?.memberId || '—', name: data.name, phone: data.phone, planName, joinDate: data.joinDate || '', expiryDate: data.expiryDate || '', paidAmount: paid, pendingAmount, aadhaar: data.aadhaar });
      form.reset(data);
    } catch (error: unknown) { ManagerInfrastructureShowErrorToast(error, `manager-inquiries-convert-${activeLead.id}-error`); }
    finally { setSaving(false); }
  });
  return { activeLead, plans, plansLoading, form, planId, billingCycle, customDays, INQUIRIES_CYCLE_LABELS, INQUIRIES_GENDER_OPTIONS, saving, successData, submit, handleClose, closeConvert };
}
