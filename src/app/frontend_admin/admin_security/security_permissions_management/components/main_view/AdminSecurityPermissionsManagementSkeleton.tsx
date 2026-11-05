"use client";
// RESPONSIBILITY: Renders the AdminSecurityPermissionsManagementSkeleton UI surface for permissions_management; business state and network mutations remain in feature hooks/services.
// DATA FLOW: feature data/state and user input → AdminSecurityPermissionsManagementSkeleton → accessible UI/events routed to owning hooks (admin_permissions/permissions_management/components/main_view/AdminSecurityPermissionsManagementSkeleton.tsx)

import { useTranslations } from 'next-intl';

/**
 * @description AdminSecurityPermissionsManagementSkeleton renders the PermissionsManagementSkeleton interface for its owning feature.
 * @dependencies Uses feature-local hooks and zero-business UI primitives.
 * @edge-case Preserves contract-defined loading, empty, error, permission, and recovery states.
 */
export default function AdminSecurityPermissionsManagementSkeleton() {
  const t = useTranslations();
  return <div className="p-6 space-y-6" role="status" aria-live="polite" aria-busy="true" data-testid="permissions-management-permissions-management-skeleton-status-region"><span className="sr-only">{t('permissions.PermissionsLoading.label')}</span><div aria-hidden="true" className="space-y-6"><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{['row-1', 'row-2'].map((row) => <div key={row} className="h-24 bg-skeleton-base rounded-xl border border-border motion-safe:animate-pulse motion-safe:duration-base"><div className="h-2 w-1/3 rounded-t-xl bg-skeleton-highlight" /></div>)}</div><div className="h-12 bg-skeleton-base rounded-xl border border-border motion-safe:animate-pulse motion-safe:duration-base"><div className="h-2 w-1/4 rounded-t-xl bg-skeleton-highlight" /></div><div className="h-96 bg-skeleton-base rounded-xl border border-border motion-safe:animate-pulse motion-safe:duration-base"><div className="h-2 w-1/3 rounded-t-xl bg-skeleton-highlight" /></div></div></div>;
}
