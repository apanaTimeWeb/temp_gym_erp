// RESPONSIBILITY: Renders ManagerLibraryDietPlansDietGrid's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Apple, Edit2, Flame, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';

import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/constants/ManagerLibraryDietPlansLocalPaginationDefaults';

import ManagerLibraryDietPlansEmptyState from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/components/ManagerLibraryDietPlansEmptyState';
import { useManagerLibraryDietPlansLogic } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/hooks/useManagerLibraryDietPlansLogic';
import { ManagerLibraryDietPlansDisplayValue } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/utils/ManagerLibraryDietPlansFormatters';


/** @description Renders the ManagerLibraryDietPlansDietGrid component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves empty state, error state. */
export default function ManagerLibraryDietPlansDietGrid() {
  const t = useTranslations('MANAGER_LIBRARY_DIET_PLANS');

  const { dietPlans, totalDietPlans, isPending, isError, errorMessage, currentPage, setCurrentPage, openAddDiet, openEditDiet, deleteDietPlan, loadAll } = useManagerLibraryDietPlansLogic();
  const totalPages = Math.max(1, Math.ceil(totalDietPlans / MANAGER_ITEMS_PER_PAGE));
  if (isPending) return <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label={t("COPY_LOADING_DIET_PLANS")}>{['diet-a', 'diet-b', 'diet-c', 'diet-d', 'diet-e', 'diet-f'].map((id) => <div key={id} className="h-48 rounded-xl border border-border bg-skeleton-base p-5 motion-safe:animate-pulse"><div className="h-10 w-10 rounded-xl bg-skeleton-highlight" /><div className="mt-4 h-4 w-3/4 rounded bg-skeleton-highlight" /><div className="mt-2 h-3 w-1/2 rounded bg-skeleton-highlight" /><div className="mt-8 h-3 w-full rounded bg-skeleton-highlight" /></div>)}</div>;
  if (isError) return <div data-testid="manager_library-manager-library-diet-grid-status" role="alert" className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-danger bg-danger-bg p-6 text-center"><p className="text-sm font-semibold text-danger-text">{errorMessage || t("TEXT_GENERIC_ERROR")}</p><button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 rounded-lg bg-primary text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_library-manager-library-diet-grid-button-refresh" type="button" onClick={() => void loadAll()} >{t("COPY_RETRY_1")}</button></div>;
  if (dietPlans.length === 0) return <div className="space-y-5"><ManagerLibraryDietPlansEmptyState data-testid="manager_library-managerlibrarydietgrid-managerlibraryemptystate-1" view="diet" onAdd={openAddDiet} /><ManagerPagination data-testid="manager_library-managerlibrarydietgrid-managerpagination-2" currentPage={currentPage} totalPages={totalPages} totalItems={totalDietPlans} itemsPerPage={MANAGER_ITEMS_PER_PAGE} onPageChange={setCurrentPage} /></div>;
  return (
    <div className="flex h-full flex-col gap-5">
      <div className="grid flex-1 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {dietPlans.map((diet, mapIndex) => (
          <article data-testid={`manager_library-library-managerlibrarydietgrid-card-${diet.id}`} key={diet.id} className="flex cursor-pointer flex-col rounded-xl border border-border bg-card p-5 shadow-card motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-1" tabIndex={0} onClick={() => openEditDiet(diet)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openEditDiet(diet); } }}>
            <div className="mb-3 flex items-start justify-between gap-3"><div data-testid={`manager_library-library-managerlibrarydietgrid-status-edit-${mapIndex}`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success-bg text-success-text"><Apple size={18} strokeWidth={2} aria-hidden="true"/></div><div className="flex gap-1">
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 rounded-lg text-text-secondary hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_library-library-managerlibrarydietgrid-button-edit-${mapIndex}`} type="button" onClick={(event) => { event.stopPropagation(); openEditDiet(diet); }} aria-label={t("TEXT_EDIT_DIET", { value: diet.name })} ><Edit2 size={18} strokeWidth={2} className="mx-auto" aria-hidden="true"/></button>
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 rounded-lg text-danger-text hover:bg-danger-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-focus-ring hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_library-library-managerlibrarydietgrid-button-delete-${mapIndex}`} type="button" onClick={(event) => { event.stopPropagation(); void deleteDietPlan(diet.id); }} aria-label={t("TEXT_DELETE_DIET", { value: diet.name })} ><Trash2 size={18} strokeWidth={2} className="mx-auto" aria-hidden="true"/></button>
            </div></div>
            <h3 className="truncate text-sm font-bold text-text-primary" title={diet.name}>{diet.name}</h3>
            <p className="mt-1 text-xs text-text-secondary">{diet.goal}</p>
            <div className="mt-auto space-y-1 border-t border-border pt-3">
              <div className="flex items-center gap-2 text-xs text-text-secondary"><Flame size={18} strokeWidth={2} className="text-warning-text" aria-hidden="true"/><span>{ManagerLibraryDietPlansDisplayValue(diet.calories)} {t("COPY_KCAL_DAY")}</span></div>
              <p className="text-xs text-text-secondary">{t("COPY_PROTEIN")}: {ManagerLibraryDietPlansDisplayValue(diet.protein)}g · Carbs: {ManagerLibraryDietPlansDisplayValue(diet.carbs)}g · Fats: {ManagerLibraryDietPlansDisplayValue(diet.fats)}g</p>
            </div>
          </article>
        ))}
      </div>
      <ManagerPagination data-testid="manager_library-managerlibrarydietgrid-managerpagination-3" currentPage={currentPage} totalPages={totalPages} totalItems={totalDietPlans} itemsPerPage={MANAGER_ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
    </div>
  );
}
