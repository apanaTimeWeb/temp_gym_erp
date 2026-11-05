// RESPONSIBILITY: Renders/orchestrates error within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the superadmin_system_ops_migrations route-segment error fallback and provides documented recovery actions.
import { RefreshCcw, AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { SUPERADMIN_SYSTEM_OPS_MIGRATIONS_ROUTES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/config/superadmin_system_ops_migrations.url_config';

import type { SuperadminSystemOpsMigrationsNextErrorProps } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/types/superadmin_system_ops_migrations_next_error_props.types';


/**
 * @description Provides a module-branded recoverable error boundary for this route segment.
 * @dependencies Uses only the module locale contract, centralized route configuration, and semantic design tokens.
 * @edge-case Never exposes raw errors; reset() remains the primary recovery action and module navigation remains available.
 */
export default function ErrorBoundary({ reset }: SuperadminSystemOpsMigrationsNextErrorProps) {
  const t = useTranslations('superadmin_system_ops_migrations');
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-8 text-center shadow-card" data-testid="superadmin_system_ops_migrations-error-superadmin_system_ops_migrations-error-state">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger-bg" aria-hidden="true" data-testid="superadmin_system_ops_migrations-error-ops-migrations-error-error">
        <AlertTriangle size={18} className="text-danger" />
      </div>
      <h2 className="text-xl font-bold text-primary">{t('ui.route_error_title')}</h2>
      <p className="max-w-md text-sm text-secondary">{t('ui.route_error_description')}</p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={reset} data-testid="superadmin_system_ops_migrations-error-superadmin_system_ops_migrations-error-retry" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors">
          <RefreshCcw size={18} aria-hidden="true" />
          {t('ui.error_retry')}
        </button>
        <Link href={SUPERADMIN_SYSTEM_OPS_MIGRATIONS_ROUTES.CANONICAL_LEAF} data-testid="superadmin_system_ops_migrations-error-superadmin_system_ops_migrations-error-back" className="inline-flex min-h-11 items-center rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors">
          {t('ui.back_to_module')}
        </Link>
      </div>
    </div>
  );
}
