// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsMigrationsMain within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the Superadmin schema rollout screen. Delegates query, mutation, confirmation, and cache logic to the page hook.
import { AlertTriangle, Database, Loader2 } from 'lucide-react';

import SuperadminSystemOpsMigrationsEmptyState from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/components/SuperadminSystemOpsMigrationsEmptyState';
import SuperadminSystemOpsMigrationsMigrationStatusBadge from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/components/SuperadminSystemOpsMigrationsMigrationStatusBadge';
import { useSuperadminSystemOpsMigrationsMainViewModel } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/hooks/useSuperadminSystemOpsMigrationsMainViewModel';
import { formatDate } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/utils/SuperadminSystemOpsMigrationsFormatters';



const TABLE_COLUMN_COUNT = 5;
/**
 * @description Renders the Superadmin schema rollout screen. Delegates query, mutation, confirmation, and cache logic to the page hook.
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */

const MOBILE_CARD_TABLE_CLASSES = [
  'w-full text-start border-collapse max-md:block max-md:min-w-0',
  'max-md:[&_thead]:sr-only max-md:[&_tbody]:block',
  'max-md:[&_tbody_tr]:mb-3 max-md:[&_tbody_tr]:grid max-md:[&_tbody_tr]:grid-cols-1 max-md:[&_tbody_tr]:w-full',
  'max-md:[&_tbody_tr]:rounded-lg max-md:[&_tbody_tr]:border max-md:[&_tbody_tr]:border-border max-md:[&_tbody_tr]:bg-card',
  'max-md:[&_tbody_td]:grid max-md:[&_tbody_td]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-md:[&_tbody_td]:gap-3',
  'max-md:[&_tbody_td]:w-full max-md:[&_tbody_td]:border-0 max-md:[&_tbody_td]:p-3',
  'max-md:[&_tbody_td::before]:content-[attr(data-mobile-label)] max-md:[&_tbody_td::before]:text-secondary',
  'max-md:[&_tbody_td::before]:text-xs max-md:[&_tbody_td::before]:font-semibold max-md:[&_tbody_td::before]:uppercase',
].join(' ');

export default function SuperadminSystemOpsMigrationsMain() {
  const vm = useSuperadminSystemOpsMigrationsMainViewModel();

  if (vm.isPending) {
    return (<div className="space-y-4" aria-busy="true" data-testid="superadmin_system_ops_migrations-superadmin-system-ops-migrations-main-page">
      {[0, 1, 2].map((row) => (<div key={row} className="h-24 rounded-xl bg-skeleton-base motion-safe:animate-pulse" />))}
    </div>);
  }

  if (vm.isError) {
    return (<div className="rounded-xl border border-border bg-card p-8 text-center">
      <AlertTriangle size={18} className="mx-auto mb-3 text-danger" aria-hidden="true" />
      <p className="font-semibold text-primary">{vm.t('ui.schema_rollout_history_could_not_be_loaded_dea6d68')}</p>
      <button type="button" onClick={() => void vm.refetch()} className="min-h-11 mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95" data-testid="superadmin_system_ops_migrations-superadmin-system-ops-migrations-main-superadmin_system_ops_migrations-migrations-main-retry">{vm.t('ui.retry_72295fa')}</button>
    </div>);
  }

  return (<div className="space-y-6 w-full">
    <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="superadmin-page-title text-primary">{vm.t('ui.schema_rollouts_af7888a')}</h1>
        <p className="text-secondary mt-1">{vm.t('ui.manage_and_track_database_schema_migrations_across_a_e149a61')}</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
        <div>
          <label htmlFor="superadmin-migration-version" className="sr-only">{vm.t('ui.target_schema_version_8f3ab78')}</label>
          <input id="superadmin-migration-version" type="text" value={vm.versionInput} onChange={(event) => vm.setVersionInput(event.target.value)} placeholder={vm.t('ui.e_g_v1_6_0_b356f2d')} aria-invalid={Boolean(vm.validationMessage)} aria-describedby={vm.validationMessage ? 'superadmin-migration-version-error' : undefined} className="min-h-11 w-40 px-3 py-2 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base ease-in-out" data-testid="superadmin_system_ops_migrations-superadmin-system-ops-migrations-main-superadmin_system_ops_migrations-migrations-main-version" />
          {vm.validationMessage ? <p id="superadmin-migration-version-error" className="mt-1 text-xs text-danger" role="alert" data-testid="superadmin_system_ops_migrations-superadmin-system-ops-migrations-main-superadmin_system_ops_migrations-migrations-main-validation">{vm.validationMessage}</p> : null}
        </div>
        <button type="button" onClick={() => void vm.handleRollout()} disabled={vm.isDeploying} className="min-h-11 min-w-40 flex items-center justify-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-medium hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95" data-testid="superadmin_system_ops_migrations-superadmin-system-ops-migrations-main-migrations-main-action-1">
          {vm.isDeploying ? <Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" /> : <Database size={18} strokeWidth={2} aria-hidden="true" />}
          {vm.isDeploying ? vm.t('ui.deploying') : vm.t('ui.deploy_new_schema_2caa745')}
        </button>
      </div>
    </div>

    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
      <div className="overflow-x-auto">
        <table className={`w-full text-start border-collapse ${MOBILE_CARD_TABLE_CLASSES}`}>
          <thead><tr className="bg-surface-hover border-b border-border" data-testid="superadmin_system_ops_migrations-superadmin-system-ops-migrations-main-migrations-main-action-2">
            {[vm.t('ui.version'), vm.t('ui.description'), vm.t('ui.target'), vm.t('ui.status'), vm.t('ui.applied_date_3a20841')].map((heading) => (<th key={heading} scope="col" className="px-6 py-4 text-sm font-semibold text-secondary">{heading}</th>))}
          </tr></thead>
          <tbody className="divide-y divide-border">
            {vm.migrations.map((migration) => (<tr key={migration.id} className="hover:bg-surface-hover motion-safe:transition-colors" data-testid={`superadmin_system_ops_migrations-system-ops-migrations-main-item-migration-id-3-${String(migration.id)}`}>
              <td className="px-6 py-4" data-mobile-label={vm.t('ui.version')}><span className="font-mono font-bold text-primary">{migration.version}</span></td>
              <td className="px-6 py-4" data-mobile-label={vm.t('ui.description')}><p className="text-sm text-primary">{migration.description}</p>{migration.errorLog ? <p className="text-xs text-danger mt-1 flex items-center gap-1"><AlertTriangle size={18} strokeWidth={2} aria-hidden="true" />{vm.t('ui.migration_failed_safe_summary')}</p> : null}</td>
              <td className="px-6 py-4 text-sm text-secondary" data-mobile-label={vm.t('ui.target')}>{migration.targetTenants?.trim() || '—'}</td>
              <td className="px-6 py-4" data-mobile-label={vm.t('ui.status')}><SuperadminSystemOpsMigrationsMigrationStatusBadge status={migration.status} /></td>
              <td className="px-6 py-4 text-sm text-secondary" data-mobile-label={vm.t('ui.applied_date_3a20841')}>{formatDate(migration.appliedAt)}</td>
            </tr>))}
            {vm.migrations.length === 0 ? <tr data-testid="superadmin_system_ops_migrations-superadmin-system-ops-migrations-main-migrations-main-action-4"><td colSpan={TABLE_COLUMN_COUNT} className="px-6 py-3"><SuperadminSystemOpsMigrationsEmptyState /></td></tr> : null}
          </tbody>
        </table>
      </div>
    </div>
  </div>);
}
