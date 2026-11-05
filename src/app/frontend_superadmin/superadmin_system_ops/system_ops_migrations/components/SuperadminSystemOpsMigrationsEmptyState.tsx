// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsMigrationsEmptyState within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the empty state for the Superadmin migration history table.
import { Database } from 'lucide-react';
import { useTranslations } from 'next-intl';



/**
 * @description Renders the empty state for the Superadmin migration history table.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminSystemOpsMigrationsEmptyState() {
  const t = useTranslations('superadmin_system_ops_migrations');
    return (<div data-testid="superadmin_system_ops_migrations-superadmin-system-ops-migrations-empty-state-migrations-empty-state-empty" className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <Database size={18} className="text-secondary mb-3" aria-hidden="true" data-testid="superadmin_system_ops_migrations-superadmin-system-ops-migrations-empty-state-migrations-empty-state-empty-2"/>
      <p className="text-sm font-medium text-primary" data-testid="superadmin_system_ops-systemopsmigrationsemptystate-state">{t('ui.no_schema_rollouts_found_f7ef8f3')}</p>
      <p className="mt-1 text-xs text-secondary">{t('ui.start_a_deployment_to_create_the_first_migration_his_af10f3b')}</p>
    </div>);
}
