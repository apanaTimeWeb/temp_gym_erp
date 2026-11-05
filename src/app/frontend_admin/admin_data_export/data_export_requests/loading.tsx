// RESPONSIBILITY: Renders the Data Export route skeleton while the route segment is loading.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_data_export/data_export_requests/loading.tsx)

import { getTranslations } from 'next-intl/server';
/**
 * AdminDataExportLoading renders the admin data export loading UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default async function AdminDataExportLoading() {
  const t = await getTranslations();
  return (
    <div className="space-y-6" aria-label={t('data-export.AdminDataExportLoading.text_loading')} data-testid="admin_data_export-loading-state">
      <div className="h-8 w-48 rounded-xl bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />
      <div className="h-4 w-80 max-w-full rounded-lg bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />
      <div className="max-w-3xl rounded-xl border border-border bg-skeleton-base p-6 shadow-card">
        <div className="h-6 w-56 rounded-lg bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />
        <div className="mt-4 space-y-2">
          <div className="h-4 w-full rounded-lg bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />
          <div className="h-4 w-11/12 rounded-lg bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />
          <div className="h-4 w-4/5 rounded-lg bg-skeleton-base motion-safe:animate-pulse motion-safe:duration-base" />
        </div>
      </div>
    </div>
  );
}
