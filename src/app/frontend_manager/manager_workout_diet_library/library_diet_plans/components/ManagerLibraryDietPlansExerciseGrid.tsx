// RESPONSIBILITY: Renders ManagerLibraryDietPlansExerciseGrid's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Dumbbell, Edit2, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';

import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/constants/ManagerLibraryDietPlansLocalPaginationDefaults';

import ManagerLibraryDietPlansEmptyState from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/components/ManagerLibraryDietPlansEmptyState';
import { useManagerLibraryDietPlansLogic } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/hooks/useManagerLibraryDietPlansLogic';
import { ManagerLibraryDietPlansDisplayValue } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/utils/ManagerLibraryDietPlansFormatters';


/**
 * @description Renders/orchestrates the ManagerLibraryDietPlansExerciseGrid user interface for the library module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_workout_diet_library/manager_library_components/manager_library_empty_state/ManagerLibraryDietPlansEmptyState; @/app/frontend_manager/manager_workout_diet_library/manager_library_hooks/useManagerLibraryDietPlansLogic; @/components/ui/manager_pagination/ManagerPagination; @/app/frontend_manager/manager_infrastructure/manager_infrastructure_constants/ManagerPaginationDefaults
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const EXERCISE_SKELETON_IDS = ['exercise-a', 'exercise-b', 'exercise-c', 'exercise-d', 'exercise-e', 'exercise-f'] as const;

/** @description Renders the ManagerLibraryDietPlansExerciseGrid component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves empty state, error state. */
export default function ManagerLibraryDietPlansExerciseGrid() {
  const t = useTranslations('MANAGER_LIBRARY_DIET_PLANS');

  const { exercises, totalExercises, isPending, isError, errorMessage, currentPage, setCurrentPage, openAddExercise, openEditExercise, deleteExercise, loadAll } = useManagerLibraryDietPlansLogic();
  const totalPages = Math.max(1, Math.ceil(totalExercises / MANAGER_ITEMS_PER_PAGE));
  if (isPending) return <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label={t("COPY_LOADING_EXERCISES")}>{EXERCISE_SKELETON_IDS.map((id) => <div key={id} className="h-48 rounded-xl border border-border bg-skeleton-base p-5 motion-safe:animate-pulse"><div className="h-10 w-10 rounded-xl bg-skeleton-highlight" /><div className="mt-4 h-4 w-3/4 rounded bg-skeleton-highlight" /><div className="mt-2 h-3 w-1/2 rounded bg-skeleton-highlight" /><div className="mt-8 h-3 w-full rounded bg-skeleton-highlight" /></div>)}</div>;
  if (isError) return <div data-testid="manager_library-manager-library-exercise-grid-status" role="alert" className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-danger bg-danger-bg p-6 text-center"><p className="text-sm font-semibold text-danger-text">{errorMessage || t("TEXT_GENERIC_ERROR")}</p><button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 rounded-lg bg-primary text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_library-manager-library-exercise-grid-button-refresh" type="button" onClick={() => void loadAll()} >{t("COPY_RETRY_2")}</button></div>;
  if (exercises.length === 0) return <div className="space-y-5"><ManagerLibraryDietPlansEmptyState data-testid="manager_library-managerlibraryexercisegrid-managerlibraryemptystate-1" view="exercises" onAdd={openAddExercise} /><ManagerPagination data-testid="manager_library-managerlibraryexercisegrid-managerpagination-2" currentPage={currentPage} totalPages={totalPages} totalItems={totalExercises} itemsPerPage={MANAGER_ITEMS_PER_PAGE} onPageChange={setCurrentPage} /></div>;
  return (
    <div className="flex h-full flex-col gap-5">
      <div className="grid flex-1 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise, mapIndex) => (
          <article data-testid={`manager_library-library-managerlibraryexercisegrid-card-${exercise.id}`} key={exercise.id} className="flex cursor-pointer flex-col rounded-xl border border-border bg-card p-5 shadow-card motion-safe:transition-all motion-safe:duration-200 motion-safe:hover:-translate-y-1" tabIndex={0} onClick={() => openEditExercise(exercise)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openEditExercise(exercise); } }}>
            <div className="mb-3 flex items-start justify-between gap-3"><div data-testid={`manager_library-library-managerlibraryexercisegrid-status-edit-${mapIndex}`} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-info-bg text-info-text"><Dumbbell size={18} strokeWidth={2} aria-hidden="true"/></div><div className="flex gap-1">
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 rounded-lg text-text-secondary hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_library-library-managerlibraryexercisegrid-button-edit-${mapIndex}`} type="button" onClick={(event) => { event.stopPropagation(); openEditExercise(exercise); }} aria-label={t("TEXT_EDIT_EXERCISE", { value: exercise.name })} ><Edit2 size={18} strokeWidth={2} className="mx-auto" aria-hidden="true"/></button>
              <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 rounded-lg text-danger-text hover:bg-danger-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-focus-ring hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_library-library-managerlibraryexercisegrid-button-delete-${mapIndex}`} type="button" onClick={(event) => { event.stopPropagation(); void deleteExercise(exercise.id); }} aria-label={t("TEXT_DELETE_EXERCISE", { value: exercise.name })} ><Trash2 size={18} strokeWidth={2} className="mx-auto" aria-hidden="true"/></button>
            </div></div>
            <h3 className="truncate text-sm font-bold text-text-primary" title={exercise.name}>{exercise.name}</h3>
            <p className="mt-1 truncate text-xs text-text-secondary" title={exercise.category}>{exercise.category}</p>
            <p className="mt-2 text-xs text-text-secondary">{ManagerLibraryDietPlansDisplayValue(exercise.muscleGroup?.join(', '))}</p>
            <div className="mt-auto flex items-center justify-between border-t border-border pt-3"><span data-testid={`manager_library-library-managerlibraryexercisegrid-status-secondary-${mapIndex}`} className="rounded-full bg-info-bg px-2.5 py-1 text-badge font-semibold text-info-text">{exercise.difficulty}</span><span className="text-xs text-text-secondary">{exercise.duration ? `${exercise.duration} min` : `${ManagerLibraryDietPlansDisplayValue(exercise.sets)} sets · ${ManagerLibraryDietPlansDisplayValue(exercise.reps)} reps`}</span></div>
          </article>
        ))}
      </div>
      <ManagerPagination data-testid="manager_library-managerlibraryexercisegrid-managerpagination-3" currentPage={currentPage} totalPages={totalPages} totalItems={totalExercises} itemsPerPage={MANAGER_ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
    </div>
  );
}
