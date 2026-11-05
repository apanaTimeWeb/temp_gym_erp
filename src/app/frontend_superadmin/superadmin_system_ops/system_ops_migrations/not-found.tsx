// RESPONSIBILITY: Renders/orchestrates not-found within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { SearchX } from 'lucide-react';
// RESPONSIBILITY: Renders the superadmin_system_ops_migrations route-segment not-found state and provides documented recovery navigation.
import { useTranslations } from 'next-intl';

import Link from 'next/link';

import { SUPERADMIN_SYSTEM_OPS_MIGRATIONS_ROUTES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_migrations/config/superadmin_system_ops_migrations.url_config';



/**
 * @description Provides a branded not-found state for this route segment without exposing route internals.
 * @dependencies Uses module-local translations, centralized routes, and global semantic design tokens.
 * @edge-case Keeps the recovery link keyboard accessible and prevents navigation dead ends.
 */
export default function NotFound() {
  const t = useTranslations('superadmin_system_ops_migrations');
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-8 text-center shadow-card" data-testid="superadmin_system_ops_migrations-not-found-superadmin_system_ops_migrations-not-found-state">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-floating" aria-hidden="true" data-testid="superadmin_system_ops_migrations-not-found-not-found-not-found">
        <SearchX size={18} className="text-secondary" />
      </div>
      <h2 className="text-xl font-bold text-primary">{t('ui.not_found_title')}</h2>
      <p className="max-w-md text-sm text-secondary">{t('ui.not_found_description')}</p>
      <Link href={SUPERADMIN_SYSTEM_OPS_MIGRATIONS_ROUTES.CANONICAL_LEAF} data-testid="superadmin_system_ops_migrations-not-found-superadmin_system_ops_migrations-not-found-back" className="inline-flex min-h-11 items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors">{t('ui.back_to_module')}</Link>
    </div>
  );
}
