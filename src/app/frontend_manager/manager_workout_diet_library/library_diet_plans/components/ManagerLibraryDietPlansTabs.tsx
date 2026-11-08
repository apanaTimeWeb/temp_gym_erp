// RESPONSIBILITY: Renders ManagerLibraryDietPlansTabs's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Plus, RefreshCw, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useManagerLibraryDietPlansLogic } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/hooks/useManagerLibraryDietPlansLogic';


/** @description Renders Library collection tabs plus search/refresh/create controls; all data actions are delegated to the feature hook. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerLibraryDietPlansTabs() {
  const t = useTranslations('MANAGER_LIBRARY_DIET_PLANS');

  const { view, setView, loadAll, openAddDiet, openAddExercise, search, setSearch } = useManagerLibraryDietPlansLogic();
  const isDiet = view === 'diet';
  return (
    <div className="flex flex-col gap-3 border-b border-border bg-card p-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div data-testid="manager_library-managerlibrarytabs-tablist" className="flex overflow-x-auto"role="tablist" aria-label={t("COPY_LIBRARY_COLLECTIONS")}>
        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`min-h-11 whitespace-nowrap border-b-2 px-5 py-3 text-sm font-semibold motion-safe:transition-all motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${isDiet ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-primary'} ease-in-out motion-safe:active:scale-95 hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid="manager_library-manager-library-tabs-button-action-1" type="button" role="tab" aria-selected={isDiet} onClick={() => setView('diet')} >{t("COPY_DIET_PLANS")}</button>
        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`min-h-11 whitespace-nowrap border-b-2 px-5 py-3 text-sm font-semibold motion-safe:transition-all motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${!isDiet ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-primary'} ease-in-out motion-safe:active:scale-95 hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid="manager_library-manager-library-tabs-button-action-2" type="button" role="tab" aria-selected={!isDiet} onClick={() => setView('exercises')} >{t("COPY_EXERCISES")}</button>
      </div>
      <div className="flex flex-col gap-2 px-2 sm:flex-row sm:flex-wrap sm:items-center sm:px-4">
        <div className="relative min-w-0 sm:w-64">
          <Search size={18} strokeWidth={2} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"/>
          <label htmlFor="manager-library-search" className="sr-only">{t("TEXT_SEARCH_COLLECTION_LABEL", { value: isDiet ? t("TEXT_DIET_PLANS") : t("TEXT_EXERCISES") })}</label>
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full rounded-lg border border-border bg-input py-2 pl-9 pr-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_library-manager-library-tabs-manager-library-search" id="manager-library-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t("TEXT_SEARCH_COLLECTION", { value: isDiet ? t("TEXT_DIET_PLANS") : t("TEXT_EXERCISES") })}  />
        </div>
        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border text-text-secondary motion-safe:transition-all motion-safe:duration-200 hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ease-in-out motion-safe:active:scale-95 hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_library-manager-library-tabs-button-refresh" type="button" onClick={() => void loadAll()} aria-label={t("COPY_REFRESH_LIBRARY")} ><RefreshCw size={18} strokeWidth={2} aria-hidden="true"/></button>
        <button data-testid="manager_library-manager-library-tabs-is-diet" type="button" onClick={isDiet ? openAddDiet : openAddExercise} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-on-primary motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:brightness-95 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page ease-in-out hover:brightness-110"><Plus size={18} strokeWidth={2} aria-hidden="true"/>{t("COPY_ADD_2")} {isDiet ? t("TEXT_DIET_PLAN_TITLE") : t("TEXT_EXERCISE")}</button>
      </div>
    </div>
  );
}
