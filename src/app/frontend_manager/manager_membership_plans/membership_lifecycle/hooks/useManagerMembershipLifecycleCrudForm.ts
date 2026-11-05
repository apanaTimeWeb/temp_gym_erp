// DATA FLOW: Plan props → RHF/Zod form → useManagerMembershipLifecycleMutations → ManagerMembershipLifecycleApi → authoritative response → UI reconciliation.
'use client';

import { useEffect, useRef } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useManagerInfrastructureUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureUnsavedChangesGuard';
import { ManagerInfrastructureFromManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureFromManagerMinorUnits';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';
import { ManagerInfrastructureToManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureToManagerMinorUnits';

import { useManagerMembershipLifecycleMutations } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/hooks/useManagerMembershipLifecycleMutations';
import { managerPlansCrudFormSchema } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/schemas/manager_membership_lifecycle_crud_form.schemas';
import type { ManagerMembershipLifecycleCrudFormInput, ManagerMembershipLifecycleCrudFormOutput } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/types/manager_membership_lifecycle_crud_form.types';
import type { Plan } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/types/manager_membership_lifecycle.types';

/**
 * @description Owns the RHF/Zod plan create/update form and delegates writes to dedicated plan mutations.
 * @dependencies Plan CRUD schema, mutation hook, idempotency and toast infrastructure.
 * @edge-case Form data is reset only after successful create/update; failed requests preserve the draft and error feedback.
 */
export function useManagerMembershipLifecycleCrudForm(plan: Plan | null, open: boolean, onClose: () => void) {
  const { createPlan, updatePlan } = useManagerMembershipLifecycleMutations();
  const idempotencyKeyRef = useRef<{ fingerprint: string; key: string } | null>(null);
  const form = useForm<ManagerMembershipLifecycleCrudFormInput, unknown, ManagerMembershipLifecycleCrudFormOutput>({
    resolver: zodResolver(managerPlansCrudFormSchema),
    defaultValues: { name: '', tier: 'BASIC', price1Month: 0, price3Month: 0, price6Month: 0, price12Month: 0, featuresText: '', isActive: true },
    mode: 'onSubmit'
  });
  const previousPlanId = useRef<string | null>(null);
  const wasOpenRef = useRef(false);
  // EFFECT: Rehydrate on each open cycle or selected-plan change, but never overwrite a draft during ordinary rerenders while the same editor remains open.
  useEffect(() => {
    const wasOpen = wasOpenRef.current;
    wasOpenRef.current = open;
    if (!open) return;
    const planId = plan?.id ?? null;
    if (wasOpen && planId === previousPlanId.current) return;
    previousPlanId.current = planId;
    form.reset(plan ? { name: plan.name, tier: plan.tier, price1Month: ManagerInfrastructureFromManagerMinorUnits(plan.price1Month), price3Month: ManagerInfrastructureFromManagerMinorUnits(plan.price3Month), price6Month: ManagerInfrastructureFromManagerMinorUnits(plan.price6Month), price12Month: ManagerInfrastructureFromManagerMinorUnits(plan.price12Month), featuresText: plan.features.join('\n'), isActive: plan.isActive } : { name: '', tier: 'BASIC', price1Month: 0, price3Month: 0, price6Month: 0, price12Month: 0, featuresText: '', isActive: true });
  }, [form, open, plan]);
  const saving = createPlan.isPending || updatePlan.isPending;
  const { confirmAndClose } = useManagerInfrastructureUnsavedChangesGuard(open && form.formState.isDirty && !saving);
  const close = () => {
    if (!saving) void confirmAndClose(onClose);
  };
  const submit = form.handleSubmit(async (values) => {
    const payload = { name: values.name, tier: values.tier, price1Month: ManagerInfrastructureToManagerMinorUnits(values.price1Month), price3Month: ManagerInfrastructureToManagerMinorUnits(values.price3Month), price6Month: ManagerInfrastructureToManagerMinorUnits(values.price6Month), price12Month: ManagerInfrastructureToManagerMinorUnits(values.price12Month), features: values.featuresText.split('\n').map((value) => value.trim()).filter(Boolean), isActive: values.isActive } satisfies Partial<Plan>;
    const fingerprint = JSON.stringify({ planId: plan?.id ?? null, payload });
    if (idempotencyKeyRef.current?.fingerprint !== fingerprint) idempotencyKeyRef.current = { fingerprint, key: ManagerInfrastructureIdempotency() };
    const key = idempotencyKeyRef.current.key;
    try {
      const response = plan ? await updatePlan.mutateAsync({ id: plan.id, payload, idempotencyKey: key }) : await createPlan.mutateAsync({ payload, idempotencyKey: key });
      ManagerInfrastructureShowSuccessToast(response.message, plan ? 'manager-plans-update-success' : 'manager-plans-create-success');
      idempotencyKeyRef.current = null;
      form.reset(values);
      onClose();
    } catch (error: unknown) {
      ManagerInfrastructureShowErrorToast(error, 'manager-plans-crud-error');
    }
  });
  return { form, submit, saving, close };
}
