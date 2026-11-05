// RESPONSIBILITY: Renders the Manager grievance route loading skeleton matching the page layout.
import { getTranslations } from 'next-intl/server';
/** @description Renders the manager_grievance route boundary. @dependencies Uses only the route's owning module and approved application infrastructure. @edge-case Provides documented loading, error, not-found, or route-entry behavior without introducing business logic outside the feature boundary. */
export default async function Loading() {
 const t = await getTranslations('MANAGER_GRIEVANCE_RESOLUTION');
  return (
    <div className="p-4 sm:p-6 space-y-4" aria-busy="true" aria-label={t("TEXT_LOADING")}>
      <div className="h-10 w-56 rounded-lg bg-skeleton-base motion-safe:animate-pulse"><div className="h-full w-2/3 rounded-lg bg-skeleton-highlight" /></div>
      {[1, 2, 3].map((item) => <div key={item} className="h-28 rounded-xl border border-border bg-skeleton-base motion-safe:animate-pulse"><div className="h-full w-3/4 rounded-xl bg-skeleton-highlight" /></div>)}
    </div>
  );
}
