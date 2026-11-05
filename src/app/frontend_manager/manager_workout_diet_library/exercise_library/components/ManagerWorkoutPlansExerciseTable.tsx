// RESPONSIBILITY: Renders the exercise catalogue, URL-backed filters, pagination and row actions; API transport remains in module hooks.
'use client';

import { useEffect, useRef, useState } from 'react';
import { Edit2, Loader2, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import ManagerTableSkeleton from '@/components/ui/manager_table_skeleton/ManagerTableSkeleton';
import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructurePaginationDefaults';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';
import { useManagerInfrastructureDebouncedValueCommit } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDebouncedValueCommit';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';
import { WORKOUT_LEVEL_FILTER_OPTIONS } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/constants/manager_workout_plans_shared.constants';
import ManagerExerciseLibraryEmptyState from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/components/ManagerExerciseLibraryEmptyState';
import { useManagerWorkoutPlansLogic } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/hooks/useManagerWorkoutPlansLogic';
import { useDeleteExerciseMutation } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/hooks/useManagerWorkoutPlansMutations';
import { useExercisesQuery } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/hooks/useManagerWorkoutPlansQueries';
import { ManagerWorkoutPlansDisplayValue, ManagerWorkoutPlansGetDifficultyLabelKey } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/utils/ManagerWorkoutPlansFormatters';

export default function ManagerWorkoutPlansExerciseTable() {
  const t = useTranslations('MANAGER_WORKOUT_PLANS');
  const { search, setSearch, levelFilter, setLevelFilter, currentPage, setCurrentPage, openEditEx } = useManagerWorkoutPlansLogic();
  const [localSearch, setLocalSearch] = useState(search);
  // Keep the local input draft synchronized with URL navigation and browser back/forward changes.
  useEffect(() => { setLocalSearch(search); }, [search]);
  useManagerInfrastructureDebouncedValueCommit(localSearch, search, setSearch, 300);
  const { confirm } = useConfirm();
  const deleteKeyByIdRef = useRef(new Map<string, string>());
  const { data, isPending, isError, isFetching, refetch } = useExercisesQuery({
    search,
    level: levelFilter,
    page: String(currentPage),
    limit: String(MANAGER_ITEMS_PER_PAGE),
  });
  const { deleteExercise } = useDeleteExerciseMutation();
  const exercises = data?.exercises ?? [];
  const totalExercises = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalExercises / MANAGER_ITEMS_PER_PAGE));
  const headers = [t('COPY_EXERCISE_HEADER'), t('COPY_PRIMARY_MUSCLE_HEADER'), t('COPY_EQUIPMENT'), t('COPY_DIFFICULTY_1'), t('COPY_ACTIONS')];

  if (isPending) return <ManagerTableSkeleton rows={6} />;
  if (isError) {
    return (
      <div className="space-y-3 rounded-lg border border-border bg-card p-6" role="group" aria-label={t('COPY_EXERCISE_LIBRARY')}>
        <p className="text-sm text-danger-text" role="alert">{t('TEXT_GENERIC_ERROR')}</p>
        <button type="button" onClick={() => void refetch()} disabled={isFetching} className="inline-flex min-h-10 min-w-28 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
          {isFetching ? <><Loader2 size={16} className="animate-spin" aria-hidden="true" />{t('COPY_LOADING_ASSIGNED_PLANS')}</> : t('COPY_TRY_AGAIN')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-96 flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_14rem]">
        <div>
          <label className="sr-only" htmlFor="manager-exercise-library-search">{t('COPY_SEARCH_EXERCISES')}</label>
          <input id="manager-exercise-library-search" type="search" value={localSearch} onChange={(event) => setLocalSearch(event.target.value)} placeholder={t('COPY_SEARCH_EXERCISES')} aria-label={t('COPY_SEARCH_EXERCISES')} className="min-h-11 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" />
        </div>
        <div>
          <label className="sr-only" htmlFor="manager-exercise-library-difficulty">{t('COPY_FILTER_DIFFICULTY')}</label>
          <select id="manager-exercise-library-difficulty" value={levelFilter} onChange={(event) => setLevelFilter(event.target.value)} aria-label={t('COPY_FILTER_DIFFICULTY')} className="min-h-11 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
            {WORKOUT_LEVEL_FILTER_OPTIONS.map((option) => <option key={option.value} value={option.value}>{t(option.labelKey)}</option>)}
          </select>
        </div>
      </div>

      <div className="hidden flex-1 overflow-x-auto lg:block">
        <ManagerInfrastructureResponsiveTable labels={headers}>
          <table className="w-full">
            <thead className="bg-input"><tr>{headers.map((header) => <th key={header} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-text-secondary">{header}</th>)}</tr></thead>
            <tbody className="divide-y divide-border">
              {exercises.map((exercise) => (
                <tr key={exercise.id} data-testid={`manager_exercise-library-row-${exercise.id}`} className="cursor-pointer hover:bg-primary-subtle" tabIndex={0} onClick={() => openEditEx(exercise)} onKeyDown={(event) => {
                  if (event.target !== event.currentTarget) return;
                  if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openEditEx(exercise); }
                }}>
                  <td className="px-4 py-3 text-sm font-medium text-text-primary">{exercise.name}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{ManagerWorkoutPlansDisplayValue(exercise.muscleGroup?.join(', '))}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{ManagerWorkoutPlansDisplayValue(exercise.equipment)}</td>
                  <td className="px-4 py-3"><span className="rounded-full border border-border bg-input px-2.5 py-1 text-xs font-semibold text-text-primary">{t(ManagerWorkoutPlansGetDifficultyLabelKey(exercise.difficulty))}</span></td>
                  <td className="px-4 py-3"><div className="flex items-center gap-2">
                    <button type="button" data-testid={`manager_exercise-library-edit-${exercise.id}`} aria-label={t('TEXT_EDIT_EXERCISE', { value: exercise.name })} onClick={(event) => { event.stopPropagation(); openEditEx(exercise); }} className="rounded-md p-2 text-info-text hover:bg-info-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"><Edit2 size={18} aria-hidden="true" /></button>
                    <button type="button" data-testid={`manager_exercise-library-delete-${exercise.id}`} aria-label={t('TEXT_DELETE_EXERCISE', { value: exercise.name })} onClick={async (event) => {
                      event.stopPropagation();
                      const confirmed = await confirm({ title: t('COPY_DELETE_EXERCISE_1'), message: t('TEXT_DELETE_EXERCISE_CONFIRM_MESSAGE', { value: exercise.name }), type: 'danger', confirmText: t('COPY_DELETE_1') });
                      if (!confirmed) return;
                      try {
                        const idempotencyKey = deleteKeyByIdRef.current.get(exercise.id) ?? ManagerInfrastructureIdempotency();
                        deleteKeyByIdRef.current.set(exercise.id, idempotencyKey);
                        const response = await deleteExercise({ id: exercise.id, idempotencyKey });
                        deleteKeyByIdRef.current.delete(exercise.id);
                        ManagerInfrastructureShowSuccessToast(response.message, `manager-workout-exercise-${exercise.id}-delete-success`);
                      } catch (error: unknown) { ManagerInfrastructureShowErrorToast(error, `manager-workout-exercise-${exercise.id}-delete-error`); }
                    }} className="rounded-md p-2 text-danger-text hover:bg-danger-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"><Trash2 size={18} aria-hidden="true" /></button>
                  </div></td>
                </tr>
              ))}
              {exercises.length === 0 && <tr><td colSpan={headers.length}><ManagerExerciseLibraryEmptyState search={search} /></td></tr>}
            </tbody>
          </table>
        </ManagerInfrastructureResponsiveTable>
      </div>

      <div className="flex-1 divide-y divide-border overflow-y-auto lg:hidden">
        {exercises.map((exercise) => (
          <article key={`mobile-exercise-${exercise.id}`} className="space-y-3 bg-card p-4">
            <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate font-semibold text-text-primary">{exercise.name}</p><p className="truncate text-xs text-text-secondary">{ManagerWorkoutPlansDisplayValue(exercise.muscleGroup?.join(', '))}</p></div><span className="shrink-0 rounded-full border border-border bg-input px-2 py-1 text-xs text-text-secondary">{ManagerWorkoutPlansDisplayValue(exercise.equipment)}</span></div>
            <div className="flex items-center justify-between gap-3"><span className="text-xs text-text-secondary">{t('COPY_DIFFICULTY_1')}</span><span className="rounded-full bg-input px-2.5 py-1 text-xs font-semibold text-text-primary">{t(ManagerWorkoutPlansGetDifficultyLabelKey(exercise.difficulty))}</span></div>
            <div className="flex justify-end gap-2">
              <button type="button" data-testid={`manager_exercise-library-mobile-edit-${exercise.id}`} onClick={() => openEditEx(exercise)} aria-label={t('TEXT_EDIT_EXERCISE', { value: exercise.name })} className="min-h-11 min-w-11 rounded-md p-2 text-info-text hover:bg-info-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"><Edit2 size={18} aria-hidden="true" /></button>
              <button type="button" data-testid={`manager_exercise-library-mobile-delete-${exercise.id}`} onClick={async () => {
                const confirmed = await confirm({ title: t('COPY_DELETE_EXERCISE_2'), message: t('TEXT_DELETE_EXERCISE_CONFIRM_MESSAGE', { value: exercise.name }), type: 'danger', confirmText: t('COPY_DELETE_2') });
                if (!confirmed) return;
                try {
                  const idempotencyKey = deleteKeyByIdRef.current.get(exercise.id) ?? ManagerInfrastructureIdempotency();
                  deleteKeyByIdRef.current.set(exercise.id, idempotencyKey);
                  const response = await deleteExercise({ id: exercise.id, idempotencyKey });
                  deleteKeyByIdRef.current.delete(exercise.id);
                  ManagerInfrastructureShowSuccessToast(response.message, `manager-workout-exercise-${exercise.id}-delete-success`);
                } catch (error: unknown) { ManagerInfrastructureShowErrorToast(error, `manager-workout-exercise-${exercise.id}-delete-error`); }
              }} aria-label={t('TEXT_DELETE_EXERCISE', { value: exercise.name })} className="min-h-11 min-w-11 rounded-md p-2 text-danger-text hover:bg-danger-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"><Trash2 size={18} aria-hidden="true" /></button>
            </div>
          </article>
        ))}
        {exercises.length === 0 && <ManagerExerciseLibraryEmptyState search={search} />}
      </div>

      <ManagerPagination data-testid="manager_exercise-library-pagination" currentPage={currentPage} totalPages={totalPages} totalItems={totalExercises} itemsPerPage={MANAGER_ITEMS_PER_PAGE} onPageChange={setCurrentPage} />
    </div>
  );
}
