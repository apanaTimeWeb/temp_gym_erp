// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformConfigurationIntegrationsGenerateApiKeyModal within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the validated Superadmin API-key generation form and one-time generated-secret result.
import { useEffect, useRef } from 'react';

import { Check, KeyRound, Loader2, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { useSuperadminPlatformConfigurationIntegrationsManagementDialogA11y } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/hooks/useSuperadminPlatformConfigurationIntegrationsManagementDialogA11y';
import { useSuperadminPlatformConfigurationIntegrationsManagementGenerateApiKeyForm } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/hooks/useSuperadminPlatformConfigurationIntegrationsManagementGenerateApiKeyForm';
import { useSuperadminPlatformConfigurationIntegrationsManagementUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/hooks/useSuperadminPlatformConfigurationIntegrationsManagementUnsavedChangesGuard';

import type { SuperadminGenerateApiKeyModalProps } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_integrations_management/types/superadmin_platform_configuration_integrations_management_generate_api_key.types';


/**
 * @description Renders the validated Superadmin API-key generation form and one-time generated-secret result.
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */
export default function SuperadminPlatformConfigurationIntegrationsManagementGenerateApiKeyModal({ isOpen, tenants, onClose }: SuperadminGenerateApiKeyModalProps) {
  const t = useTranslations('superadmin_platform_configuration_integrations');
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const secretResultRef = useRef<HTMLDivElement>(null);
  const { form, mutation, generatedSecret, resetForm, handleSubmit: submitApiKey } = useSuperadminPlatformConfigurationIntegrationsManagementGenerateApiKeyForm();
  useEffect(() => { if (generatedSecret) secretResultRef.current?.focus(); }, [generatedSecret]);
  const { register, handleSubmit, setValue, watch, formState: { errors, isDirty } } = form;
  const { confirm } = useConfirm();

  useSuperadminPlatformConfigurationIntegrationsManagementUnsavedChangesGuard(Boolean(isOpen && isDirty && !mutation.isPending && !generatedSecret), t('ui.unsaved_api_key_discard'));

  const requestClose = async () => {
    if (mutation.isPending) return;
    if (isDirty && !generatedSecret) {
      const shouldClose = await confirm({
        title: t('ui.discard_api_key_changes_title'),
        message: t('ui.discard_api_key_changes_message'),
        type: 'warning',
        confirmText: t('ui.discard_changes_action'),
        cancelText: t('ui.keep_editing_action'),
      });
      if (!shouldClose) return;
    }
    // Clear both the one-time secret UI state and TanStack's retained mutation result.
    resetForm();
    mutation.reset?.();
    onClose();
  };

  const dialogRef = useSuperadminPlatformConfigurationIntegrationsManagementDialogA11y(isOpen, () => void requestClose());

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-overlay p-4 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in" role="dialog" aria-modal="true" aria-labelledby="superadmin-generate-api-key-title" data-testid="superadmin_platform_configuration_integrations-superadmin-integrations-generate-api-key-modal-key-modal-dialog-1" ref={dialogRef}>
      <div className="my-auto flex max-h-dialog-desktop w-full max-w-md flex-col overflow-hidden rounded-xl border border-border bg-overlay shadow-dialog motion-safe:animate-in motion-safe:zoom-in-95">
        <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary-subtle p-2 text-primary"><KeyRound size={18} aria-hidden="true"/></div>
            <div>
              <h2 id="superadmin-generate-api-key-title" className="text-xl font-bold text-primary">{t('ui.generate_api_key_8f42c1c')}</h2>
              <p className="text-sm text-secondary">{t('ui.issue_developer_access_for_a_tenant_4006108')}</p>
            </div>
          </div>
          <button  ref={closeButtonRef} data-autofocus="true" type="button" onClick={() => void requestClose()} aria-label={t('ui.close_generate_api_key_dialog_c23433d')} className="min-h-11 min-w-11 rounded-full p-2 text-secondary hover:bg-surface-hover hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" data-testid="superadmin_platform_configuration_integrations-superadmin-integrations-generate-api-key-modal-key-modal-close-1">
            <X size={18} aria-hidden="true"/>
          </button>
        </div>

        {generatedSecret ? (
          <div ref={secretResultRef} tabIndex={-1} role="status" aria-live="polite" className="min-h-0 flex-1 overflow-y-auto custom-scrollbar space-y-5 p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <div className="rounded-lg border border-border bg-success-bg p-4">
              <div className="mb-2 flex items-center gap-2 text-success"><Check size={18} aria-hidden="true"/>  {t('ui.api_key_generated_bdaad62')}</div>
              <p className="text-sm text-secondary">{t('ui.this_secret_is_shown_only_in_this_dialog_store_i_d0ceb38')}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-secondary">{t('ui.secret_key_9e8f412')}</p>
              <code className="block break-all text-sm text-primary">{generatedSecret}</code>
            </div>
            <div className="flex justify-end gap-3">
              <button  type="button" onClick={() => void requestClose()} className="min-h-11 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_platform_configuration_integrations-superadmin-integrations-generate-api-key-modal-key-modal-control-1">{t('ui.done_e959410')}</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(submitApiKey)} className="flex min-h-0 flex-1 flex-col" data-testid="superadmin_platform_configuration_integrations-superadmin-integrations-generate-api-key-modal-superadmingenerateapikeymodal-form-submit-1">
            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto custom-scrollbar p-6">
              {(() => { if (errors.root?.server?.message) { return (<p role="alert" className="rounded-lg border border-danger bg-danger-bg p-3 text-sm text-danger">{String(errors.root.server.message)}</p>); } if (mutation.error) { return (<p role="alert" className="rounded-lg border border-danger bg-danger-bg p-3 text-sm text-danger">{t('ui.action_failed_retry')}</p>); } return (null); })()}
              <div>
                <label htmlFor="superadmin-api-key-label" className="mb-1 block text-sm font-medium text-secondary">{t('ui.key_label_dd9cb71')}</label>
                <input id="superadmin-api-key-label" type="text" autoComplete="off" placeholder={t('ui.e_g_zapier_integration_42858ed')} {...register('label')} className="min-h-11 w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-primary focus:border-focus focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors" aria-invalid={errors.label ? 'true' : 'false'} aria-describedby={errors.label ? 'superadmin-api-key-label-error' : undefined}  data-testid="superadmin_platform_configuration_integrations-superadmin-integrations-generate-api-key-modal-modal-control-2-1"/>
                {errors.label && <p id="superadmin-api-key-label-error" className="mt-1 text-xs text-danger">{t(errors.label.message === 'validation.label_min_length' ? 'ui.validation_label_min' : 'ui.validation_invalid')}</p>}
              </div>

              <div role="group" aria-labelledby="superadmin-api-key-tenant-label" aria-describedby={errors.tenantId ? 'superadmin-api-key-tenant-error' : undefined} aria-invalid={errors.tenantId ? 'true' : 'false'}>
                <label id="superadmin-api-key-tenant-label" className="mb-1 block text-sm font-medium text-secondary">{t('ui.tenant_gym_7a44dc6')}</label>
                <SearchableDropdown
                  data-testid="superadmin_platform_configuration_integrations-superadmin-integrations-generate-api-key-modal-generate-api-key-tenant"
                  value={watch('tenantId')}
                  onChange={(value) => setValue('tenantId', String(value), { shouldDirty: true, shouldValidate: true })}
                  options={tenants.map((tenant) => ({ value: tenant.id, label: `${tenant.name} (${tenant.id})` }))}
                  placeholder={t('ui.select_a_tenant_199324c')}
                  className="bg-input border-border text-sm"
                />
                {errors.tenantId && <p id="superadmin-api-key-tenant-error" className="mt-1 text-xs text-danger">{t(errors.tenantId.message === 'validation.tenant_required' ? 'ui.validation_tenant_required' : 'ui.validation_invalid')}</p>}
              </div>

              <fieldset aria-invalid={errors.scopes ? 'true' : 'false'} aria-describedby={errors.scopes ? 'superadmin-api-key-scopes-error' : undefined}>
                <legend className="mb-2 text-sm font-medium text-secondary">{t('ui.api_scopes_fa86913')}</legend>
                <div className="flex flex-wrap gap-4">
                  <label className="flex min-h-11 items-center gap-2 text-sm text-primary">
                    <input type="checkbox" value="READ" {...register('scopes')} className="rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-primary min-h-11 min-w-11 motion-safe:transition-all motion-safe:duration-base ease-in-out"  data-testid="superadmin_platform_configuration_integrations-superadmin-integrations-generate-api-key-modal-key-modal-export-1"/>

                    {t('ui.read_data_export_e5c2db3')}
                  </label>
                  <label className="flex min-h-11 items-center gap-2 text-sm text-primary">
                    <input type="checkbox" value="WRITE" {...register('scopes')} className="rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-primary min-h-11 min-w-11 motion-safe:transition-all motion-safe:duration-base ease-in-out"  data-testid="superadmin_platform_configuration_integrations-superadmin-integrations-generate-api-key-modal-modal-control-4-1"/>

                    {t('ui.write_mutations_6da4a03')}
                  </label>
                </div>
                {errors.scopes && <p id="superadmin-api-key-scopes-error" className="mt-1 text-xs text-danger">{t(errors.scopes.message === 'validation.scope_required' ? 'ui.validation_scope_required' : 'ui.validation_invalid')}</p>}
              </fieldset>

              <div className="rounded-lg border border-border bg-warning-bg p-3">
                <p className="text-xs text-warning"><strong>{t('ui.important_95132ba')}</strong>  {t('ui.the_secret_key_will_only_be_shown_once_after_gen_594a299')}</p>
              </div>
            </div>

            <div className="flex shrink-0 justify-end gap-3 border-t border-border bg-sidebar px-6 py-5">
              <button  type="button" onClick={() => void requestClose()} disabled={mutation.isPending} className="min-h-11 rounded-lg border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-primary motion-safe:transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50 motion-safe:active:scale-95" data-testid="superadmin_platform_configuration_integrations-superadmin-integrations-generate-api-key-modal-key-modal-cancel-1">{t('ui.cancel_a272158')}</button>
              <button type="submit" disabled={mutation.isPending} className="flex min-h-11 min-w-36 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50" data-testid="superadmin_platform_configuration_integrations-superadmin-integrations-generate-api-key-modal-key-modal-action4-1">
                {mutation.isPending && <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true"/>}
                {mutation.isPending ? t('ui.generating') : t('ui.generate_key_8f55191')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
