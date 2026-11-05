// RESPONSIBILITY: Renders the manager maintenance route-segment not-found fallback and provides safe recovery navigation.
import { MANAGER_MAINTENANCE_REQUESTS_ROUTES } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/config/manager_maintenance_requests.url_config';
import { getTranslations } from 'next-intl/server';



/** @description Renders the manager_maintenance route boundary. @dependencies Uses only the route's owning module and approved application infrastructure. @edge-case Provides documented loading, error, not-found, or route-entry behavior without introducing business logic outside the feature boundary. */
export default async function NotFound() {
  const t = await getTranslations('MANAGER_MAINTENANCE_REQUESTS');
  return (
    <div className="m-4 sm:m-6 rounded-xl border border-border bg-card p-8 text-center shadow-card motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
      <h2 className="text-lg font-bold text-text-primary">{t("TEXT_404_TITLE")}</h2>
      <p className="mt-2 text-sm text-text-secondary">{t("TEXT_404_DESCRIPTION")}</p>
      <a data-testid="manager_maintenance-not-found-home" href={MANAGER_MAINTENANCE_REQUESTS_ROUTES.PAGES.HOME} className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-primary px-4 font-semibold text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page">{t("TEXT_404_RETURN")}</a>
    </div>
  );
}
