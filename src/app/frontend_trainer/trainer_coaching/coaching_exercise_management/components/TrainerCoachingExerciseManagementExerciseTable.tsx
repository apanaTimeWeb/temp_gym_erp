"use client";
// RESPONSIBILITY: Renders the browseable exercise library as a semantic desktop table and mobile card stack, with server-side controls and safe mutations.
/**
 * @description Renders workout exercises with semantic table structure, feature actions, and the documented mobile interaction pattern.
 * @dependencies Uses workout-owned exercise data, formatting helpers, mutation state, and approved infrastructure UI primitives.
 * @edge-cases Handles nullable values, long exercise names, repeated edits/deletes, keyboard access, and mobile action reachability.
 */
// DATA FLOW: URL search/filter/sort/page → TanStack Query → exercises → UI action → mutation → query invalidation.
import { ArrowDown, ArrowUp, ArrowUpDown, Edit2, Loader2, Trash2 } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/utils/TrainerCoachingExerciseManagementTrainerInfrastructureConstants';

import { TrainerInfrastructureUserSafeError } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/utils/TrainerCoachingExerciseManagementTrainerInfrastructureUserSafeError';

import { useTrainerInfrastructureConfirm } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/TrainerCoachingExerciseManagementuseTrainerInfrastructureConfirm';

import { useTrainerInfrastructureFeedback } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/TrainerCoachingExerciseManagementuseTrainerInfrastructureFeedback';

import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/TrainerCoachingExerciseManagementuseTrainerInfrastructureIdempotencyKey';

import TrainerWorkoutExerciseEmptyState from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/components/TrainerCoachingExerciseManagementExerciseEmptyState';

import TrainerInfrastructureTooltip from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/components/TrainerCoachingExerciseManagementTrainerInfrastructureTooltip';

import TrainerInfrastructurePagination from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/components/TrainerCoachingExerciseManagementTrainerInfrastructurePagination';

import TrainerInfrastructureTableSkeleton from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/components/TrainerCoachingExerciseManagementTrainerInfrastructureTableSkeleton';

import { TRAINER_WORKOUT_EXERCISE_TABLE_HEADERS, TRAINER_WORKOUT_DIFFICULTY_STYLES } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/config/TrainerCoachingExerciseManagementConstants';

import { useTrainerWorkoutFilters } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/useTrainerCoachingExerciseManagementFilters';

import { useTrainerWorkoutMutations } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/useTrainerCoachingExerciseManagementMutations';

import { useTrainerWorkoutExercisesQuery } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/hooks/useTrainerCoachingExerciseManagementQuery';

import { useTrainerWorkoutStore } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/state/useTrainerCoachingExerciseManagementStore';

import { displayValue } from '@/lib/display_value';

import { TRAINER_WORKOUT_SORT_FIELDS } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/utils/TrainerCoachingExerciseManagementSortConstants';

import type { TrainerWorkoutSortDirection, TrainerWorkoutSortField } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/types/TrainerCoachingExerciseManagementSortTypes';

const sortLabel = (field: TrainerWorkoutSortField, active: TrainerWorkoutSortField, direction: TrainerWorkoutSortDirection) => field !== active ? 'TEXT_ASCENDING' : direction === 'asc' ? 'TEXT_DESCENDING' : 'TEXT_ASCENDING';

/**
 * @description Renders the exercise browse surface with server-side controls, accessible actions and mobile card-stack conversion.
 * @dependencies URL-owned workout filters, TanStack Query, feature mutation hooks, confirmation/feedback infrastructure and feature constants.
 * @edge-case Keeps the complete exercise record visible on mobile and guards destructive deletion with type-to-confirm.
 */
/**
 * @description Renders the Trainer exercise library table and owns row-level edit/delete interactions through the workout mutation contract.
 * @dependencies TrainerWorkoutWorkout query/mutation hooks and module-owned constants/types.
 * @edge-case Destructive deletion remains confirmation-protected and pagination remains coherent after mutation.
 */
/**
 * @description Renders the workout data table with module-owned status formatting, row actions, responsive behavior, and keyboard-accessible interactions.
 * @dependencies Uses only documented workout module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves nullable-value fallbacks, keyboard access to row actions, and the documented mobile table strategy.
 */
export default function TrainerWorkoutExerciseTable() {
  const t = useTranslations('TRAINER_WORKOUT');
  const { search, category, page, setPage, sortBy, sortDirection, setSort } = useTrainerWorkoutFilters();
  const { data, isPending, isError, isFetching, error, refetch } = useTrainerWorkoutExercisesQuery(search, category, page, sortBy, sortDirection);
  const { setEditExerciseId, setShowExModal } = useTrainerWorkoutStore();
  const { deleteExercise } = useTrainerWorkoutMutations();
  const { confirm } = useTrainerInfrastructureConfirm();
  const { showSuccess, showError } = useTrainerInfrastructureFeedback();
  const idempotencyKeys = useTrainerInfrastructureIdempotencyKey();
  const exercises = data?.exercises ?? [];
  const totalExercises = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalExercises / TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE));

  const openExerciseEditor = (id: string) => {
    setEditExerciseId(id);
    setShowExModal(true);
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirm({ title: t('TEXT_DELETE_EXERCISE_TITLE'), message: t('TEXT_DELETE_EXERCISE_MESSAGE'), type: 'danger', confirmText: t('TEXT_DELETE'), requireTypedConfirmation: true, confirmationPhrase: t('TEXT_DELETE_EXERCISE_CONFIRMATION') });
    if (!confirmed) return;
    const actionId = `delete-exercise-${id}`;
    const key = idempotencyKeys.begin(actionId);
    try {
      const response = await deleteExercise({ id, idempotencyKey: key });
      idempotencyKeys.clear(actionId);
      showSuccess(response.message, actionId);
    } catch (deleteError) {
      showError(deleteError, actionId);
    }
  };

  if (isPending) return <TrainerInfrastructureTableSkeleton rows={6} columns={TRAINER_WORKOUT_EXERCISE_TABLE_HEADERS.length} />;
  if (isError) return <div role="alert" className="text-center py-16 bg-card rounded-2xl border border-border" data-testid="trainer_workout-workout-exercise_table_unable_to_load_exercises_right_now"><p className="text-danger font-medium" data-testid="trainer_workout-exercise-table_error_state">{t('TEXT_UNABLE_TO_LOAD_EXERCISES_RIGHT_NOW')}</p><button type="button" onClick={() => void refetch()} disabled={isFetching} className="mt-3 min-h-11 min-w-28 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_workout-trainerworkoutexercisetable-button_1">{isFetching ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" strokeWidth={2}/>{t('TEXT_RETRYING')}</> : t('TEXT_RETRY')}</button><p className="text-xs mt-2 text-secondary">{TrainerInfrastructureUserSafeError(error, t('TEXT_UNABLE_TO_LOAD_EXERCISES_RIGHT_NOW'))}</p></div>;

  const headers: Array<{ label: string; field?: TrainerWorkoutSortField }> = [
    { label: t(TRAINER_WORKOUT_EXERCISE_TABLE_HEADERS[0]!.labelKey), field: TRAINER_WORKOUT_SORT_FIELDS.NAME },
    { label: t(TRAINER_WORKOUT_EXERCISE_TABLE_HEADERS[1]!.labelKey), field: TRAINER_WORKOUT_SORT_FIELDS.CATEGORY },
    { label: t(TRAINER_WORKOUT_EXERCISE_TABLE_HEADERS[2]!.labelKey) },
    { label: t(TRAINER_WORKOUT_EXERCISE_TABLE_HEADERS[3]!.labelKey), field: TRAINER_WORKOUT_SORT_FIELDS.DIFFICULTY },
    { label: t(TRAINER_WORKOUT_EXERCISE_TABLE_HEADERS[4]!.labelKey) },
  ];

  return <div className="flex flex-col h-full min-h-96">
    <div className="hidden md:block overflow-x-auto flex-1"><table className="w-full"><thead className="bg-surface-highlight"><tr data-testid="trainer_workout-TrainerWorkoutExerciseTable-row-1">{headers.map((header) => <th key={header.label} scope="col" aria-sort={header.field ? (sortBy === header.field ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none') : undefined} className="text-start text-xs font-semibold text-secondary uppercase tracking-wider px-4 py-3">{header.field ? <button type="button" onClick={() => setSort(header.field!)} aria-label={`${header.label}: ${t(sortLabel(header.field, sortBy, sortDirection))}`} className="min-w-11 min-h-11 inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid={`trainer_workout-exercise-table-sort-${header.field}`}>{header.label}{sortBy === header.field ? sortDirection === 'asc' ? <ArrowUp size={18} aria-hidden="true" strokeWidth={2}/> : <ArrowDown size={18} aria-hidden="true" strokeWidth={2}/> : <ArrowUpDown size={18} aria-hidden="true" className="text-secondary" strokeWidth={2}/>}</button> : header.label}</th>)}</tr></thead><tbody className="divide-y divide-border">{exercises.map((exercise) => <tr key={exercise.id} className="hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base focus-within:bg-surface-hover" data-testid={`trainer_workout-exercise-table_row${exercise.id}`}><td className="px-4 py-3 text-sm font-medium text-primary"><TrainerInfrastructureTooltip content={String(displayValue(exercise.name))}><span className="truncate max-w-xs inline-block">{displayValue(exercise.name)}</span></TrainerInfrastructureTooltip></td><td className="px-4 py-3 text-sm text-secondary">{Array.isArray(exercise.muscleGroup) ? displayValue(exercise.muscleGroup.join(', ')) : displayValue(exercise.muscleGroup)}</td><td className="px-4 py-3"><span className="text-xs bg-input text-secondary border border-border px-2 py-1 rounded-full">{displayValue(exercise.equipment)}</span></td><td className="px-4 py-3"><span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${TRAINER_WORKOUT_DIFFICULTY_STYLES[exercise.difficulty as keyof typeof TRAINER_WORKOUT_DIFFICULTY_STYLES] ?? 'bg-input text-secondary'}`}>{displayValue(exercise.difficulty)}</span></td><td className="px-4 py-3"><div className="flex gap-1"><button type="button" aria-label={t('TEXT_EDIT_EXERCISE_ARIA', { name: exercise.name })} title={t('TEXT_EDIT_EXERCISE_ARIA', { name: exercise.name })} onClick={(event) => { event.stopPropagation(); openExerciseEditor(exercise.id); }} className="min-w-11 min-h-11 inline-flex items-center justify-center p-1.5 text-secondary hover:text-primary hover:bg-input rounded-md motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid={`trainer_workout-exercise-table-edit-${exercise.id}`}><Edit2 size={18} strokeWidth={2} aria-hidden="true" /></button><button type="button" aria-label={t('TEXT_DELETE_EXERCISE_ARIA', { name: exercise.name })} title={t('TEXT_DELETE_EXERCISE_ARIA', { name: exercise.name })} onClick={(event) => { event.stopPropagation(); void handleDelete(exercise.id); }} className="min-w-11 min-h-11 inline-flex items-center justify-center p-1.5 text-secondary hover:text-danger hover:bg-danger-bg rounded-md motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid={`trainer_workout-exercise-table-delete-${exercise.id}`}><Trash2 size={18} strokeWidth={2} aria-hidden="true" /></button></div></td></tr>)}{exercises.length === 0 && <tr data-testid="trainer_workout-TrainerWorkoutExerciseTable-row-2"><td colSpan={TRAINER_WORKOUT_EXERCISE_TABLE_HEADERS.length}><TrainerWorkoutExerciseEmptyState search={search} /></td></tr>}</tbody></table></div>

    <div className="md:hidden space-y-3 p-3">{exercises.length === 0 ? <TrainerWorkoutExerciseEmptyState search={search} /> : exercises.map((exercise) => <article key={exercise.id} className="bg-card rounded-xl border border-border p-4 shadow-card" data-testid={`trainer_workout-exercise-table_card${exercise.id}`}><div className="flex items-start justify-between gap-3"><div className="min-w-0"><TrainerInfrastructureTooltip content={String(displayValue(exercise.name))}><h3 className="font-semibold text-primary truncate">{displayValue(exercise.name)}</h3></TrainerInfrastructureTooltip><p className="text-xs text-secondary">{t('TEXT_EXERCISE')}</p></div><span className={`shrink-0 inline-flex px-2 py-1 rounded-full text-xs font-semibold ${TRAINER_WORKOUT_DIFFICULTY_STYLES[exercise.difficulty as keyof typeof TRAINER_WORKOUT_DIFFICULTY_STYLES] ?? 'bg-input text-secondary'}`}>{displayValue(exercise.difficulty)}</span></div><div className="mt-4 space-y-3 text-sm"><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_PRIMARY_MUSCLE')}</span><span className="text-primary">{Array.isArray(exercise.muscleGroup) ? displayValue(exercise.muscleGroup.join(', ')) : displayValue(exercise.muscleGroup)}</span></p><p><span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_EQUIPMENT')}</span><span className="text-primary">{displayValue(exercise.equipment)}</span></p></div><div className="mt-4 pt-3 border-t border-border flex gap-2"><button type="button" onClick={() => { setEditExerciseId(exercise.id); setShowExModal(true); }} className="min-h-11 flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-border text-primary hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" aria-label={t('TEXT_EDIT_EXERCISE_ARIA', { name: exercise.name })} data-testid={`trainer_workout-exercise-table-mobile-edit-${exercise.id}`}><Edit2 size={18} strokeWidth={2} aria-hidden="true"/>{t('TEXT_EDIT_EXERCISE')}</button><button type="button" onClick={() => void handleDelete(exercise.id)} className="min-h-11 flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-danger text-on-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" aria-label={t('TEXT_DELETE_EXERCISE_ARIA', { name: exercise.name })} data-testid={`trainer_workout-exercise-table-mobile-delete-${exercise.id}`}><Trash2 size={18} strokeWidth={2} aria-hidden="true"/>{t('TEXT_DELETE')}</button></div></article>)}</div>
    <TrainerInfrastructurePagination currentPage={page} totalPages={totalPages} totalItems={totalExercises} itemsPerPage={TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE} onPageChange={setPage}/>
  </div>;
}

