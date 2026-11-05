// RESPONSIBILITY: Renders accessible loading feedback for the Admin Permissions route.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_permissions/permissions_management/loading.tsx)

import { getTranslations } from 'next-intl/server';

export default async function PermissionsLoading() {
  const t = await getTranslations();
  return <div className="p-6 space-y-6" data-testid="admin_permissions-loading-state" role="status" aria-live="polite" aria-busy="true"><span className="sr-only">{t('permissions.PermissionsLoading.label')}</span><div aria-hidden="true" className="space-y-6"><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{['row-1', 'row-2'].map((id) => <div key={id} className="h-24 bg-skeleton-base rounded-xl border border-border motion-safe:animate-pulse motion-safe:duration-base"><div className="h-2 w-1/3 rounded-t-xl bg-skeleton-highlight" /></div>)}</div><div className="h-12 bg-skeleton-base rounded-xl border border-border motion-safe:animate-pulse motion-safe:duration-base"><div className="h-2 w-1/4 rounded-t-xl bg-skeleton-highlight" /></div><div className="h-96 bg-skeleton-base rounded-xl border border-border motion-safe:animate-pulse motion-safe:duration-base"><div className="h-2 w-1/3 rounded-t-xl bg-skeleton-highlight" /></div></div></div>;
}
