// RESPONSIBILITY: Renders create/edit membership-plan fields; mutation, validation, conversion, and draft protection stay in the feature hook.
'use client';

import { useRef } from 'react';

import { Loader2, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import { useManagerInfrastructureDialogFocusTrap } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDialogFocusTrap';

import { MANAGER_MEMBERSHIP_LIFECYCLE_TIER_FILTER_OPTIONS } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/constants/manager_membership_lifecycle.constants';
import { useManagerMembershipLifecycleCrudForm } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/hooks/useManagerMembershipLifecycleCrudForm';
import { useManagerMembershipLifecycleLogic } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/hooks/useManagerMembershipLifecycleLogic';

/**
 * @description Presents the Plans create/edit form with accessible fields, validation feedback, pending state, and a guarded close path.
 * @dependencies Feature-owned Plans CRUD hook, Plans logic/store, and zero-business dialog focus infrastructure.
 * @edge-case A dirty draft requires confirmation before dismissal; failed mutations preserve entered values; successful mutations close only after query reconciliation.
 */
export default function ManagerMembershipLifecycleCrudModal() {
  const t = useTranslations('MANAGER_MEMBERSHIP_LIFECYCLE');
  const dialogRef = useRef<HTMLDivElement>(null);
  const { crudModalOpen, crudModalPlan, closeCrudPlan } = useManagerMembershipLifecycleLogic();
  const { form, submit, saving, close } = useManagerMembershipLifecycleCrudForm(crudModalPlan, crudModalOpen, closeCrudPlan);
  const { register, formState: { errors, isSubmitting } } = form;

  useManagerInfrastructureDialogFocusTrap({ dialogRef, isOpen: crudModalOpen, onClose: close });

  if (!crudModalOpen) return null;

  const submitPending = saving || isSubmitting;
  const tierOptions: { value: string; labelKey?: string }[] = MANAGER_MEMBERSHIP_LIFECYCLE_TIER_FILTER_OPTIONS
    .filter((option) => option.value !== 'ALL')
    .map((option) => crudModalPlan && option.value.toUpperCase() === crudModalPlan.tier.toUpperCase()
      ? { value: crudModalPlan.tier, labelKey: option.labelKey }
      : { value: option.value, labelKey: option.labelKey });
  if (crudModalPlan && !tierOptions.some((option) => option.value === crudModalPlan.tier)) {
    tierOptions.unshift({ value: crudModalPlan.tier });
  }
  const errorText = (message?: string) => message || t('TEXT_GENERIC_ERROR');
  const fieldClassName = 'mt-1 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page';

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop p-4 overflow-y-auto" data-testid="manager_plans-managerplanscrudmodal-backdrop" role="presentation">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="manager-plans-crud-title" data-testid="manager_plans-managerplanscrudmodal-dialog" className="my-auto flex max-h-dialog-desktop w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-overlay shadow-dialog">
        <div className="flex items-center justify-between gap-3 border-b border-border p-6 pb-4 shrink-0 bg-overlay">
          <div>
            <h2 id="manager-plans-crud-title" className="text-lg font-bold text-text-primary">
              {t(crudModalPlan ? 'CRUD_EDIT_PLAN_TITLE' : 'CRUD_ADD_PLAN_TITLE')}
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Master Plan Policy: Plan templates are governed by Organization Admin. Edits will sync across branches upon admin confirmation.
            </p>
          </div>
          <button type="button" onClick={close} aria-label={t('CRUD_CLOSE_PLAN_FORM')} data-testid="manager_plans-managerplanscrudmodal-button-close" className="min-h-11 min-w-11 rounded-lg text-text-secondary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={submit} className="min-h-0 flex-1 space-y-5 overflow-y-auto p-6 pt-4 custom-scrollbar" data-testid="manager_plans-managerplanscrudmodal-form">
          <div>
            <label htmlFor="manager-plans-crud-name" className="block text-sm font-medium text-text-secondary">{t('CRUD_PLAN_NAME')}</label>
            <input id="manager-plans-crud-name" {...register('name')} data-testid="manager_plans-managerplanscrudmodal-input-name" autoComplete="off" aria-invalid={errors.name ? 'true' : undefined} aria-describedby={errors.name ? 'manager-plans-crud-name-error' : undefined} className={fieldClassName} />
            {errors.name && <p id="manager-plans-crud-name-error" role="alert" className="mt-1 text-xs text-danger-text">{errorText(errors.name.message)}</p>}
          </div>

          <div>
            <label htmlFor="manager-plans-crud-tier" className="block text-sm font-medium text-text-secondary">{t('CRUD_PLAN_TIER')}</label>
            <select id="manager-plans-crud-tier" {...register('tier')} data-testid="manager_plans-managerplanscrudmodal-select-tier" className={fieldClassName}>
              {tierOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.labelKey ? t(option.labelKey) : option.value}</option>
              ))}
            </select>
            {errors.tier && <p role="alert" className="mt-1 text-xs text-danger-text">{errorText(errors.tier.message)}</p>}
          </div>

          <fieldset className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <legend className="mb-2 text-sm font-semibold text-text-primary">{t('CRUD_PLAN_PRICING')}</legend>
            {([
              ['price1Month', 'CRUD_PRICE_1_MONTH'],
              ['price3Month', 'CRUD_PRICE_3_MONTHS'],
              ['price6Month', 'CRUD_PRICE_6_MONTHS'],
              ['price12Month', 'CRUD_PRICE_12_MONTHS'],
            ] as const).map(([field, labelKey]) => (
              <div key={field}>
                <label htmlFor={`manager-plans-crud-${field}`} className="block text-sm font-medium text-text-secondary">{t(labelKey)} ({ManagerEnvConfig.currencyCode})</label>
                <input id={`manager-plans-crud-${field}`} type="number" inputMode="decimal" min="0" step="0.01" {...register(field, { valueAsNumber: true })} data-testid={`manager_plans-managerplanscrudmodal-input-${field}`} aria-invalid={errors[field] ? 'true' : undefined} aria-describedby={errors[field] ? `manager-plans-crud-${field}-error` : undefined} className={fieldClassName} />
                {errors[field] && <p id={`manager-plans-crud-${field}-error`} role="alert" className="mt-1 text-xs text-danger-text">{errorText(errors[field]?.message)}</p>}
              </div>
            ))}
          </fieldset>

          <div>
            <label htmlFor="manager-plans-crud-features" className="block text-sm font-medium text-text-secondary">{t('CRUD_PLAN_FEATURES')}</label>
            <textarea id="manager-plans-crud-features" {...register('featuresText')} rows={4} data-testid="manager_plans-managerplanscrudmodal-textarea-features" aria-invalid={errors.featuresText ? 'true' : undefined} aria-describedby={errors.featuresText ? 'manager-plans-crud-features-error' : undefined} placeholder={t('CRUD_PLAN_FEATURES_PLACEHOLDER')} className={fieldClassName} />
            <p className="mt-1 text-xs text-text-secondary">{t('CRUD_PLAN_FEATURES_HELP')}</p>
            {errors.featuresText && <p id="manager-plans-crud-features-error" role="alert" className="mt-1 text-xs text-danger-text">{errorText(errors.featuresText.message)}</p>}
          </div>

          <label htmlFor="manager-plans-crud-active" className="flex min-h-11 items-center gap-3 text-sm text-text-primary">
            <input id="manager-plans-crud-active" type="checkbox" {...register('isActive')} data-testid="manager_plans-managerplanscrudmodal-checkbox-active" className="h-4 w-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-focus-ring" />
            {t('CRUD_PLAN_ACTIVE')}
          </label>

          <div className="sticky bottom-0 bg-overlay flex flex-wrap justify-end gap-3 border-t border-border pt-4 shrink-0">
            <button type="button" onClick={close} disabled={submitPending} data-testid="manager_plans-managerplanscrudmodal-button-cancel" className="min-h-11 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:cursor-not-allowed disabled:opacity-60">{t('COPY_CANCEL')}</button>
            <button type="submit" disabled={submitPending} data-testid="manager_plans-managerplanscrudmodal-button-submit" className="inline-flex min-h-11 min-w-36 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:cursor-not-allowed disabled:opacity-60">
              {submitPending && <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" />}
              {submitPending ? t('CRUD_SAVING_PLAN') : t('CRUD_SAVE_PLAN')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
