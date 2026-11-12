// RESPONSIBILITY: Metadata editing uses the leaf-local RHF/Zod contract and preserves server 400 validation errors inline.
'use client';
import { useCallback, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Save, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import { useSuperadminPlatformConfigurationFeaturesManagementDialogA11y } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/hooks/useSuperadminPlatformConfigurationFeaturesManagementDialogA11y';
import { createSuperadminPlatformConfigurationFeaturesFeatureMetadataSchema } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/schemas/superadmin_platform_configuration_features_management_feature_metadata.schemas';
import { applySuperadminPlatformConfigurationFeaturesManagementFormApiErrors } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/utils/SuperadminPlatformConfigurationFeaturesManagementFormApiErrors';

import type { SuperadminPlatformConfigurationFeaturesFeatureMetadataFormValues } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/schemas/superadmin_platform_configuration_features_management_feature_metadata.schemas';
import type { SuperadminPlatformConfigurationFeaturesFeatureMetadataModalProps } from '@/app/frontend_superadmin/superadmin_platform_configuration/platform_configuration_features_management/types/superadmin_platform_configuration_features_management_feature_metadata_modal.types';


/** Metadata editing uses the leaf-local RHF/Zod contract and preserves server 400 validation errors inline. */
export default function SuperadminPlatformConfigurationFeaturesManagementFeatureMetadataModal({ isOpen, flag, isSubmitting, onClose, onSave }: SuperadminPlatformConfigurationFeaturesFeatureMetadataModalProps) {
  const t = useTranslations('superadmin_platform_configuration_features');
  const { confirm } = useConfirm();
  const form = useForm<SuperadminPlatformConfigurationFeaturesFeatureMetadataFormValues>({
    resolver: zodResolver(createSuperadminPlatformConfigurationFeaturesFeatureMetadataSchema(t('ui.feature_name_required'))),
    defaultValues: { name: '', description: '' },
  });
  const { register, handleSubmit, reset, setError, formState: { errors, isDirty, isSubmitting: isFormSubmitting } } = form;
  const pending = isSubmitting || isFormSubmitting;
  const requestClose = useCallback(async () => {
    if (isDirty) {
      const approved = await confirm({ title: t('ui.unsaved_feature_metadata_title'), message: t('ui.unsaved_feature_metadata_discard'), type: 'warning', confirmText: t('ui.discard_changes'), cancelText: t('ui.cancel_action') });
      if (!approved) return;
    }
    onClose();
  }, [confirm, isDirty, onClose, t]);
  const dialogRef = useSuperadminPlatformConfigurationFeaturesManagementDialogA11y(isOpen && Boolean(flag), requestClose);

  useEffect(() => {
    if (isOpen && flag) reset({ name: flag.name, description: flag.description });
    else if (!isOpen) reset({ name: '', description: '' });
  }, [isOpen, flag, reset]);

  if (!isOpen || !flag) return null;
  const submit = handleSubmit(async (values) => {
    try {
      await onSave(flag.id, values.name.trim(), values.description.trim());
    } catch (error: unknown) {
      applySuperadminPlatformConfigurationFeaturesManagementFormApiErrors(error, setError, ['name', 'description']);
    }
  });

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-overlay p-4 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in">
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="superadmin-feature-metadata-title" className="my-auto flex max-h-dialog-desktop w-full max-w-lg flex-col rounded-xl border border-border bg-overlay shadow-dialog">
        <header className="flex shrink-0 items-center justify-between border-b border-border p-5">
          <h2 id="superadmin-feature-metadata-title" className="text-lg font-bold text-primary">{t('ui.edit_feature_metadata')}</h2>
          <button type="button" data-autofocus="true" onClick={() => void requestClose()} disabled={pending} aria-label={t('ui.close_metadata_dialog')} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-secondary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50">
            <X size={18} aria-hidden="true" />
          </button>
        </header>
        <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5 custom-scrollbar">
            {errors.root?.server?.message ? <p role="alert" className="rounded-md border border-danger bg-danger-bg p-3 text-sm text-danger">{errors.root.server.message}</p> : null}
            <div>
              <label htmlFor="superadmin-feature-metadata-name" className="mb-1 block text-sm font-medium text-secondary">{t('ui.feature_name')}</label>
              <input id="superadmin-feature-metadata-name" {...register('name')} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'superadmin-feature-metadata-name-error' : undefined} disabled={pending} className="min-h-11 w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
              {errors.name ? <p id="superadmin-feature-metadata-name-error" role="alert" className="mt-1 text-xs text-danger">{errors.name.message}</p> : null}
            </div>
            <div>
              <label htmlFor="superadmin-feature-metadata-description" className="mb-1 block text-sm font-medium text-secondary">{t('ui.feature_description')}</label>
              <textarea id="superadmin-feature-metadata-description" {...register('description')} disabled={pending} rows={4} className="min-h-11 w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
              {errors.description ? <p role="alert" className="mt-1 text-xs text-danger">{errors.description.message}</p> : null}
            </div>
          </div>
          <footer className="flex shrink-0 flex-wrap justify-end gap-3 border-t border-border p-5">
            <button type="button" onClick={() => void requestClose()} disabled={pending} className="min-h-11 rounded-md border border-border px-4 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:opacity-50">{t('ui.cancel_action')}</button>
            <button type="submit" disabled={pending} aria-busy={pending} className="inline-flex min-h-11 min-w-32 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50">
              {pending ? <><Loader2 size={16} className="motion-safe:animate-spin" aria-hidden="true" />{t('ui.saving_dc97212')}</> : <><Save size={16} aria-hidden="true" />{t('ui.save_action')}</>}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}
