'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { isValidMigrationTargetVersion } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/constants/superadmin_system_ops_migrations.constants';
import { useSuperadminSystemOpsMigrationsPage } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/hooks/useSuperadminSystemOpsMigrationsPage';
import { useSuperadminSystemOpsMigrationsUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/hooks/useSuperadminSystemOpsMigrationsUnsavedChangesGuard';


/**
 * @description Owns migration form state, validation, unsaved-change protection, and deployment orchestration for the Main view.
 * @dependencies Delegates server query, confirmation, mutation, idempotency, and cache behavior to the feature page hook.
 * @edge-case Clears the typed version only after the authoritative deployment operation reports success.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminSystemOpsMigrationsMainViewModel → owning feature view/components.
/**
 * @description Owns the feature-local superadmin system ops migrations main view model responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminSystemOpsMigrationsMainViewModel() {
  const t = useTranslations('superadmin_system_ops_migrations');
  const [versionInput, setVersionInput] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const page = useSuperadminSystemOpsMigrationsPage();
  useSuperadminSystemOpsMigrationsUnsavedChangesGuard(Boolean(versionInput.trim()) && !page.isDeploying, t('ui.unsaved_migration_version'));

  const handleRollout = async (): Promise<void> => {
    const normalizedVersion = versionInput.trim();
    if (!normalizedVersion) {
      setValidationMessage(t('ui.target_schema_version_required_4b7b1c9'));
      return;
    }
    if (!isValidMigrationTargetVersion(normalizedVersion)) {
      setValidationMessage(t('ui.target_schema_version_invalid_format'));
      return;
    }
    setValidationMessage('');
    try {
      const completed = await page.requestDeployment(normalizedVersion);
      if (completed) setVersionInput('');
    } catch {
      // The mutation hook has already shown the localized toast; keep the input for a safe retry.
      setValidationMessage(t('ui.action_failed_retry'));
    }
  };

  return { t, versionInput, setVersionInput, validationMessage, handleRollout, ...page };
}

