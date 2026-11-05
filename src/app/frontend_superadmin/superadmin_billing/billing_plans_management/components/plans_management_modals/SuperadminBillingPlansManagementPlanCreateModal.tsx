// RESPONSIBILITY: Renders/orchestrates SuperadminBillingPlansPlanCreateModal within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminBillingPlansPlanCreateModal owned by the superadmin_billing_plans feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useForm
 * MODULE DEPENDENCIES: @hookform/resolvers/zod, lucide-react, next-intl, @/app/frontend_superadmin/superadmin_billing/billing_plans_management/hooks/useSuperadminBillingPlansManagementUnsavedChangesGuard, @/components/ui/Feedback/ConfirmProvider, react-hook-form, @/app/frontend_superadmin/superadmin_billing/billing_plans_management/hooks/useSuperadminBillingPlansManagementDialogA11y, @/app/frontend_superadmin/superadmin_billing/billing_plans_management/hooks/useSuperadminBillingPlansManagementPlanMutations, @/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management.schemas, @/app/frontend_superadmin/superadmin_billing/billing_plans_management/state/useSuperadminBillingPlansManagementStore, @/app/frontend_superadmin/superadmin_billing/billing_plans_management/types/superadmin_billing_plans_management_form.types, @/app/frontend_superadmin/superadmin_billing/billing_plans_management/utils/SuperadminBillingPlansManagementMoneyUtils
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the modal form for creating a new subscription plan. Reads/writes via useSuperadminBillingPlansManagementStore.


import { zodResolver } from '@hookform/resolvers/zod';
import { X, Plus, Trash2, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm, useFieldArray } from 'react-hook-form';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import { useSuperadminBillingPlansManagementDialogA11y } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/hooks/useSuperadminBillingPlansManagementDialogA11y';
import { useSuperadminBillingPlansManagementPlanMutations } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/hooks/useSuperadminBillingPlansManagementPlanMutations';
import { useSuperadminBillingPlansManagementUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/hooks/useSuperadminBillingPlansManagementUnsavedChangesGuard';
import { planFormSchema } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/schemas/superadmin_billing_plans_management.schemas';
import { useSuperadminBillingPlansManagementStore } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/state/useSuperadminBillingPlansManagementStore';
import { applySuperadminBillingPlansManagementFormApiErrors } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/utils/SuperadminBillingPlansManagementFormApiErrors';
import { toSuperadminBillingPlansMinorUnits } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/utils/SuperadminBillingPlansManagementMoneyUtils';

import type { SuperadminBillingPlansFormValues } from '@/app/frontend_superadmin/superadmin_billing/billing_plans_management/types/superadmin_billing_plans_management_form.types';
import type { SubmitHandler, Resolver } from 'react-hook-form';

/**
 * @description Owns the SuperadminBillingPlansPlanCreateModal responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminBillingPlansManagementPlanCreateModal() {
  const t = useTranslations('superadmin_billing_plans');
  const { confirm } = useConfirm();
    const isOpen = useSuperadminBillingPlansManagementStore(state => state.isCreateModalOpen);
    const closeCreateModal = useSuperadminBillingPlansManagementStore(state => state.closeCreateModal);
    const { createPlan, isCreating, resetCreateIntent } = useSuperadminBillingPlansManagementPlanMutations();
    const { register, control, handleSubmit, setError, formState: { errors, isDirty }, reset } = useForm<SuperadminBillingPlansFormValues>({
        resolver: zodResolver(planFormSchema) as unknown as Resolver<SuperadminBillingPlansFormValues>,
        defaultValues: {
            name: '', priceMonthly: 0, priceAnnual: 0, maxMembers: 100, maxStaff: 5, dbLimitGb: 1.0, binaryLimitGb: 10.0,
            features: [{ value: 'Core Gym Management' }],
        },
    });
    const { fields, append, remove } = useFieldArray({ control, name: 'features' });
    const handleClose = async () => {
      if (isCreating) return;
      if (isDirty) {
        const approved = await confirm({
          title: t('ui.unsaved_changes_title'),
          message: t('ui.discard_unsaved_changes_confirm'),
          type: 'warning',
          confirmText: t('ui.discard_changes'),
          cancelText: t('ui.stay_on_page'),
        });
        if (!approved) return;
      }
      reset();
      resetCreateIntent();
      closeCreateModal();
    };
    useSuperadminBillingPlansManagementUnsavedChangesGuard(isOpen && isDirty && !isCreating, t('ui.discard_unsaved_changes_confirm'));
    const dialogRef = useSuperadminBillingPlansManagementDialogA11y(isOpen, handleClose);
    const validationMessage = (message?: string) => {
      switch (message) {
        case 'validation.planNameRequired': return t('validation.planNameRequired');
        case 'validation.featureRequired': return t('validation.featureRequired');
        case 'validation.oneFeatureRequired': return t('validation.oneFeatureRequired');
        case 'validation.nonNegative': return t('validation.nonNegative');
        case 'validation.positiveInteger': return t('validation.positiveInteger');
        default: return t('validation.finiteNumber');
      }
    };

    if (!isOpen) return null;
    const handleSubmitForm: SubmitHandler<SuperadminBillingPlansFormValues> = async (data) => {
        try {
          await createPlan({
            ...data,
            priceMonthly: toSuperadminBillingPlansMinorUnits(data.priceMonthly, 'INR'),
            priceAnnual: toSuperadminBillingPlansMinorUnits(data.priceAnnual, 'INR'),
            features: data.features.map(f => f.value),
            currency: 'INR',
            isPublic: true,
            trialDays: 14,
            setupFee: 0,
          });
          reset();
          closeCreateModal();
        } catch (error: unknown) {
          // The feature-owned mutation hook emits localized, deduplicated feedback and retains this intent key for retry.
          applySuperadminBillingPlansManagementFormApiErrors(error, setError, ['name', 'priceMonthly', 'priceAnnual', 'maxMembers', 'maxStaff', 'dbLimitGb', 'binaryLimitGb', 'features.*.value']);
        }
    };
    return (<div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay backdrop-blur-sm p-4" role="dialog" aria-modal="true" aria-labelledby="superadmin-plans-create-title" tabIndex={-1} ref={dialogRef} data-testid="superadmin_billing_plans-plan-create-modal-dialog">
      <div className="bg-overlay border border-border rounded-xl w-full max-w-2xl max-h-screen overflow-hidden flex flex-col shadow-dialog">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 id="superadmin-plans-create-title" className="text-xl font-bold text-primary">{t('ui.create_new_subscription_plan_0c6c6b65')}</h2>
          <button type="button" onClick={handleClose} className="min-h-11 min-w-11 p-2 hover:bg-input rounded-full motion-safe:transition-colors text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-label={t('ui.close_modal_a2071564')} data-testid="superadmin_billing_plans-superadmin-plans-plan-create-modal-create-modal-close-modal">
            <X size={18}/>
          </button>
        </div>

        <form id="superadmin-plans-create-form" onSubmit={handleSubmit(handleSubmitForm)} className="flex-1 overflow-y-auto p-6 space-y-6" data-testid="superadmin_billing_plans-superadminplansplancreatemodal-form-1">
          {errors.root?.server?.message ? <p role="alert" className="rounded-md border border-danger bg-danger-bg p-3 text-sm text-danger">{String(errors.root.server.message)}</p> : null}
          <div className="space-y-2">
            <label htmlFor="plan-create-name" className="block text-sm font-medium text-secondary">{t('ui.plan_name_b356b614')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
            <input id="plan-create-name" data-dialog-initial-focus="true" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "plan-create-name-error" : undefined} {...register('name')} placeholder={t('ui.e_g_pro_tier_cfb8cb80')} className="w-full bg-input border border-border rounded-xl px-4 py-3 text-primary focus:border-focus outline-none motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_billing_plans-superadmin-plans-plan-create-modal-plan-create-modal-input"/>
            {errors.name && <p id="plan-create-name-error" role="alert" className="text-danger text-xs">{validationMessage(errors.name.message)}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {(['priceMonthly', 'priceAnnual'] as const).map(field => (<div key={field} className="space-y-2">
                <label htmlFor={`plan-create-${field}`} className="block text-sm font-medium text-secondary">{field === 'priceMonthly' ? t('ui.monthly_price') : t('ui.annual_price')} <span className="text-danger">{t('ui.text_3389dae3')}</span></label>
                <input id={`plan-create-${field}`} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `plan-create-${field}-error` : undefined} type="number" min="0" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+')
            e.preventDefault(); }} step="0.01" {...register(field, { valueAsNumber: true })} className="w-full bg-input border border-border rounded-xl px-4 py-3 text-primary focus:border-focus outline-none motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_billing_plans-superadmin-plans-plan-create-modal-plan-create-modal-number"/>
                {errors[field] && <p id={`plan-create-${field}-error`} role="alert" className="text-danger text-xs">{validationMessage(errors[field]?.message)}</p>}
              </div>))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {(['maxMembers', 'maxStaff'] as const).map(field => (<div key={field} className="space-y-2">
                <label htmlFor={`plan-create-${field}`} className="block text-sm font-medium text-secondary">{field === 'maxMembers' ? t('ui.max_members_675c60aa') : t('ui.max_staff_d35f8519')} <span className="text-danger">{t('ui.text_3389dae3')}</span></label>
                <input id={`plan-create-${field}`} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `plan-create-${field}-error` : undefined} type="number" min="1" step="1" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+')
            e.preventDefault(); }} {...register(field, { valueAsNumber: true })} className="w-full bg-input border border-border rounded-xl px-4 py-3 text-primary focus:border-focus outline-none motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_billing_plans-superadmin-plans-plan-create-modal-create-modal-number-2"/>
                {errors[field] && <p id={`plan-create-${field}-error`} role="alert" className="text-danger text-xs">{validationMessage(errors[field]?.message)}</p>}
              </div>))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {(['dbLimitGb', 'binaryLimitGb'] as const).map(field => (<div key={field} className="space-y-2">
                <label htmlFor={`plan-create-${field}`} className="block text-sm font-medium text-secondary">{field === 'dbLimitGb' ? t('ui.db_limit_gb_8738c0c7') : t('ui.binary_limit_gb_7822511b')} <span className="text-danger">{t('ui.text_3389dae3')}</span></label>
                <input id={`plan-create-${field}`} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `plan-create-${field}-error` : undefined} type="number" min="0" step="0.1" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e' || e.key === '+')
            e.preventDefault(); }} {...register(field, { valueAsNumber: true })} className="w-full bg-input border border-border rounded-xl px-4 py-3 text-primary focus:border-focus outline-none motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_billing_plans-superadmin-plans-plan-create-modal-create-modal-number-3"/>
                {errors[field] && <p id={`plan-create-${field}-error`} role="alert" className="text-danger text-xs">{validationMessage(errors[field]?.message)}</p>}
              </div>))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span id="plan-create-features-label" className="block text-sm font-medium text-secondary">{t('ui.features_list_ec36d7dd')}<span className="text-danger">{t('ui.text_3389dae3')}</span></span>
              <button type="button" onClick={() => append({ value: '' })} className="flex items-center gap-1 text-sm text-primary hover:text-primary-hover font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" data-testid="superadmin_billing_plans-superadmin-plans-plan-create-modal-create-modal-add-feature">
                <Plus size={18} strokeWidth={2}/> {t('ui.add_feature_7a5ba7b8')}</button>
            </div>
            {fields.map((field, index) => (<div key={field.id} className="flex flex-wrap items-center gap-2">
                <input aria-label={t('ui.feature_number_label', { number: index + 1 })} aria-invalid={Boolean(errors.features?.[index]?.value)} aria-describedby={errors.features?.[index]?.value ? `plan-create-feature-${index}-error` : undefined} {...register(`features.${index}.value`)} placeholder={t('ui.e_g_advanced_analytics_9e35df0c')} className="flex-1 bg-input border border-border rounded-xl px-4 py-2.5 text-primary focus:border-focus outline-none motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11" data-testid="superadmin_billing_plans-plan-create-form-feature-value-input"/>
                {errors.features?.[index]?.value && <p id={`plan-create-feature-${index}-error`} role="alert" className="text-danger text-xs">{validationMessage(errors.features[index]?.value?.message)}</p>}
                {fields.length > 1 && (<button type="button" onClick={() => remove(index)} className="p-2.5 text-secondary hover:text-danger hover:bg-danger-bg rounded-xl motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" aria-label={t('ui.remove_feature_423ab730')} data-testid="superadmin_billing_plans-superadmin-plans-plan-create-modal-create-modal-remove-feature">
                    <Trash2 size={18}/>
                  </button>)}
              </div>))}
          </div>
        </form>

        <div className="p-6 border-t border-border bg-sidebar flex justify-end gap-3">
          <button type="button" onClick={handleClose} disabled={isCreating} className="min-h-11 px-6 py-2.5 rounded-xl font-medium text-secondary hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_billing_plans-superadmin-plans-plan-create-modal-plan-create-modal-cancel">{t('ui.cancel_ea478870')}</button>
          <button type="submit" form="superadmin-plans-create-form" disabled={isCreating} className="min-h-11 px-6 py-2.5 rounded-xl font-medium bg-primary text-on-primary hover:bg-primary-hover motion-safe:transition-colors disabled:opacity-50 flex items-center gap-2 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_billing_plans-superadmin-plans-plan-create-modal-plan-create-modal-button">
            {isCreating ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin"/> {t('ui.creating_d930f445')}</> : t('ui.create_plan_submit')}
          </button>
        </div>
      </div>
    </div>);
}
