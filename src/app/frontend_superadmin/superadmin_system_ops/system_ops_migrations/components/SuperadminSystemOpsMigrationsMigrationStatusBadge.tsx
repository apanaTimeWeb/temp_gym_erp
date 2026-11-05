// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsMigrationsMigrationStatusBadge within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { AlertTriangle, RefreshCw, XCircle, CheckCircle, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

// RESPONSIBILITY: Renders and composes SuperadminSystemOpsMigrationsMigrationStatusBadge for the owning feature module; business logic and API transport remain in module-owned hooks/services.
import { SUPERADMIN_MIGRATION_STATUS_CODES, SUPERADMIN_MIGRATION_STATUS_STYLES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/constants/superadmin_system_ops_migrations.constants';

import type { SuperadminMigrationStatusBadgeProps } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/types/superadmin_system_ops_migrations_migration_status_badge.types';
import type { MigrationLog } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/types/superadmin_system_ops_migrations.types';



/**
 * @description Renders one semantic migration status badge with its status-specific icon.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
const STATUS_LABEL_KEYS: Record<MigrationLog['status'], string> = {
  COMPLETED: 'ui.status_completed', FAILED: 'ui.status_failed', PENDING: 'ui.status_pending', IN_PROGRESS: 'ui.status_in_progress', ROLLED_BACK: 'ui.status_rolled_back', SUCCESS: 'ui.status_success', ROLLBACK: 'ui.status_rollback',
};

/**
 * @description Renders the Superadmin system ops migrations migration status badge interface within its owning Superadmin feature using the declared typed props.
 * @dependencies Consumes the component props and local imports listed in this file; domain logic must remain in the owning feature module.
 * @edge-case Keep null/empty data safe, expose validation or error feedback where applicable, and preserve keyboard/focus and repeated-action behavior.
 */
export default function SuperadminSystemOpsMigrationsMigrationStatusBadge({ status }: SuperadminMigrationStatusBadgeProps) {
  const t = useTranslations('superadmin_system_ops_migrations');
  const icon = (() => { if (status === SUPERADMIN_MIGRATION_STATUS_CODES.COMPLETED || status === SUPERADMIN_MIGRATION_STATUS_CODES.SUCCESS) { return (<CheckCircle size={18} aria-hidden="true" data-testid="superadmin_system_ops_migrations-superadmin-system-ops-migrations-migration-status-badge-migration-status-badge-status"/>); } if (status === SUPERADMIN_MIGRATION_STATUS_CODES.FAILED) { return (<XCircle size={18} aria-hidden="true" data-testid="superadmin_system_ops-systemopsmigrationsmigrationstatusbadge-state"/>); } if (status === SUPERADMIN_MIGRATION_STATUS_CODES.IN_PROGRESS) { return (<RefreshCw size={18} className="motion-safe:animate-spin" aria-hidden="true"/>); } if (status === SUPERADMIN_MIGRATION_STATUS_CODES.ROLLED_BACK || status === SUPERADMIN_MIGRATION_STATUS_CODES.ROLLBACK) { return (<AlertTriangle size={18} aria-hidden="true"/>); } return (<Clock size={18} aria-hidden="true"/>); })();
  return <span data-testid="superadmin_system_ops_migrations-superadmin-system-ops-migrations-migration-status-badge-superadmin_system_ops_migrations-superadminmigrationstatusbadge-status" className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${SUPERADMIN_MIGRATION_STATUS_STYLES[status as MigrationLog['status']]}`}>{icon}{t(STATUS_LABEL_KEYS[status])}</span>;
}

