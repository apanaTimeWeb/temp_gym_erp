"use client";
// RESPONSIBILITY: Owns React Hook Form state, validation lifecycle, unsaved-change protection, and draft synchronization for AdminPlansModal.
// DATA FLOW: Feature store draft → React Hook Form → Zod validation → AdminPlansLogic mutation → TanStack Query invalidation.

/**
 * @description useAdminPlansModalForm owns membership plan modal form state, validation, and submit orchestration.
 * @dependencies Consumes only the owning module form/schema/mutation contract.
 * @edge-case Preserves validation, cancel, and failed-submit recovery without leaking business state.
 */

import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { PlansContextType } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/types/AdminBillingPlansCatalogTypes';
import { useAdminPlansStore } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/state/useAdminBillingPlansCatalogStore';
import { useAdminPlansUnsavedChangesGuard } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/hooks/useAdminBillingPlansCatalogUnsavedChangesGuard';
import { planFormSchema } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/schemas/AdminBillingPlansCatalogSchemas';
import { EMPTY_PLAN_FORM } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/constants/admin_billing_plans_catalog.constants';
import type { PlanFormValues } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/types/AdminBillingPlansCatalogTypes';
import { applyAdminBillingPlansCatalogApiValidationErrors } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/utils/AdminBillingPlansCatalogApiResponse';

/** Owns the plan modal form lifecycle and exposes view-ready validation state. */
export function useAdminPlansModalForm(logic: Pick<PlansContextType, 'savePlan' | 'saving' | 'clearIntentKey'>) {
  const { savePlan, saving, clearIntentKey } = logic;
  const { showModal, setShowModal, editId, form: storeForm } = useAdminPlansStore();
  const form = useForm<PlanFormValues>({ resolver: zodResolver(planFormSchema), defaultValues: storeForm ?? EMPTY_PLAN_FORM });
  const { register, handleSubmit, reset, control, formState: { errors, isDirty } } = form;
  const { confirmDiscardIfDirty } = useAdminPlansUnsavedChangesGuard(isDirty);

  // EFFECT: Synchronizes the modal's React Hook Form draft with the feature store when opened or edited.
  useEffect(() => {
    if (showModal) reset(storeForm ?? EMPTY_PLAN_FORM);
  }, [reset, showModal, storeForm]);

  const handleClose = useCallback(async () => {
    if (saving) return;
    if (!(await confirmDiscardIfDirty())) return;
    // Keep the key for an in-flight/uncertain mutation so retries remain idempotent.
    if (!saving) clearIntentKey(editId ? `update-plan:${editId}` : 'create-plan');
    setShowModal(false);
  }, [clearIntentKey, confirmDiscardIfDirty, editId, saving, setShowModal]);

  const savePlanWithValidation = useCallback((data: PlanFormValues) => {
    return savePlan(data, (error) => { applyAdminBillingPlansCatalogApiValidationErrors(error, form.getValues(), form.setError); });
  }, [form.getValues, form.setError, savePlan]);

  return { showModal, setShowModal, editId, saving, register, handleSubmit, reset, control, errors, handleClose, savePlan: savePlanWithValidation };
}
