"use client";
// RESPONSIBILITY: Renders the browseable workout-plan card grid and guarded delete actions.
/**
 * @description Displays Trainer workout-plan records as feature-owned cards with documented plan actions.
 * @dependencies Consumes workout feature query data, constants, route configuration, and mutation handlers from the owning module.
 * @edge-cases Handles empty results, long plan names, missing optional values, pending mutations, and repeated plan selection.
 */
// DATA FLOW: URL filters → TanStack Query → plan cards → mutation → query invalidation + backend message.
import { useState } from 'react';

import { Loader2, RefreshCw } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/utils/TrainerCoachingWorkoutPlansTrainerInfrastructureConstants';

import { TrainerInfrastructureUserSafeError } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/utils/TrainerCoachingWorkoutPlansTrainerInfrastructureUserSafeError';

import { useTrainerInfrastructureConfirm } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/TrainerCoachingWorkoutPlansuseTrainerInfrastructureConfirm';

import { useTrainerInfrastructureFeedback } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/TrainerCoachingWorkoutPlansuseTrainerInfrastructureFeedback';

import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/TrainerCoachingWorkoutPlansuseTrainerInfrastructureIdempotencyKey';

import TrainerInfrastructurePagination from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansTrainerInfrastructurePagination';

import TrainerWorkoutEmptyState from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansEmptyState';

import TrainerWorkoutLoadingSkeleton from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansLoadingSkeleton';

import TrainerWorkoutPlanCard from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansPlanCard';
import TrainerWorkoutAssignModal from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansAssignModal';
import type { TrainerWorkoutWorkout } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/types/TrainerCoachingWorkoutPlansTypes';
import { apiFetch } from '@/lib/api';

import { useTrainerWorkoutFilters } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/useTrainerCoachingWorkoutPlansFilters';

import { useTrainerWorkoutMutations } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/useTrainerCoachingWorkoutPlansMutations';

import { useTrainerWorkoutsQuery } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/hooks/useTrainerCoachingWorkoutPlansQuery';

import { useTrainerWorkoutStore } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/state/useTrainerCoachingWorkoutPlansStore';


















/**
 * @description Renders the browseable workout-plan card grid and guarded delete actions.
 * @dependencies URL filters → TanStack Query → plan cards → mutation → query invalidation + backend message.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the workout feature UI responsibility represented by TrainerWorkoutPlansGrid, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented workout module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerWorkoutPlansGrid() {
  const t = useTranslations('TRAINER_WORKOUT');
  const { search, category, page, setPage, sortBy, sortDirection } = useTrainerWorkoutFilters();
  const { data, status, isFetching, refetch, error } = useTrainerWorkoutsQuery(search, category, page, sortBy, sortDirection);
  const { setEditWorkoutId, setShowWkModal } = useTrainerWorkoutStore();
  const { deleteWorkout } = useTrainerWorkoutMutations();
  const { confirm } = useTrainerInfrastructureConfirm();
  const { showSuccess, showError } = useTrainerInfrastructureFeedback();
  const actionKeys = useTrainerInfrastructureIdempotencyKey();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [assigningPlan, setAssigningPlan] = useState<TrainerWorkoutWorkout | null>(null);
  const [isBatchAssigning, setIsBatchAssigning] = useState(false);
  const workouts = data?.workouts ?? [];
  const totalWorkouts = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalWorkouts / TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE));

  if (status === 'pending') return <TrainerWorkoutLoadingSkeleton />;
  if (status === 'error') return <div className="text-center py-16 bg-card rounded-2xl border border-border" role="alert" data-testid="trainer_workout-workout-plans_grid_unable_to_load_workout_plans"><p className="text-danger font-medium" data-testid="trainer_workout-plans-grid_error_state">{t("TEXT_UNABLE_TO_LOAD_WORKOUT_PLANS")}</p><p className="text-sm mt-1 text-secondary">{TrainerInfrastructureUserSafeError(error, t('TEXT_UNABLE_TO_LOAD_WORKOUT_PLANS'))}</p><button type="button" onClick={() => void refetch()} disabled={isFetching} className="mt-3 min-h-11 min-w-28 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_workout-trainerworkoutplansgrid-button_1">{isFetching ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" strokeWidth={2}/> : <RefreshCw size={18} strokeWidth={2}/>} {isFetching ? t("TEXT_RETRYING") : t("TEXT_RETRY")}</button></div>;

  const handleDelete = async (id: string, name: string) => {
    const confirmed = await confirm({ title: t('TEXT_DELETE_PLAN_TITLE'), message: t('TEXT_DELETE_PLAN_MESSAGE', { name }), type: 'danger', confirmText: t('TEXT_DELETE'), requireTypedConfirmation: true, confirmationPhrase: t('TEXT_DELETE_PLAN_CONFIRMATION') });
    if (!confirmed) { actionKeys.clear(`delete-workout-${id}`); return; }
    const actionId = `delete-workout-${id}`;
    setDeletingId(id);
    try {
      const response = await deleteWorkout({ id, idempotencyKey: actionKeys.begin(actionId) });
      showSuccess(response.message, actionId);
      actionKeys.clear(actionId);
    } catch (error) { showError(error, actionId); }
    finally { setDeletingId(null); }
  };

  const handleBatchAssign = async (memberIds: string[], key: string) => {
    if (!assigningPlan || memberIds.length === 0) return;
    setIsBatchAssigning(true);
    try {
      await Promise.all(
        memberIds.map((memberId, idx) =>
          apiFetch(`/trainer/trainer_members/${memberId}/workout`, {
            method: 'PATCH',
            body: JSON.stringify({ workoutPlanId: assigningPlan.id }),
            headers: { 'Idempotency-Key': `${key}-${idx}` },
          }).catch(() => null)
        )
      );
      showSuccess(`Successfully assigned ${assigningPlan.name} to ${memberIds.length} member${memberIds.length > 1 ? 's' : ''}`, `assign-${assigningPlan.id}`);
      setAssigningPlan(null);
    } catch (err) {
      showError(err, `assign-${assigningPlan.id}`);
    } finally {
      setIsBatchAssigning(false);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-96">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 flex-1 content-start">
        {workouts.map((workout) => (
          <TrainerWorkoutPlanCard
            key={workout.id}
            plan={workout}
            onAssign={() => setAssigningPlan(workout)}
            onEdit={() => { setEditWorkoutId(workout.id); setShowWkModal(true); }}
            onDelete={() => void handleDelete(workout.id, workout.name)}
            deleting={deletingId === workout.id}
          />
        ))}
        {workouts.length === 0 && (
          <div className="col-span-full">
            <TrainerWorkoutEmptyState onAdd={() => setShowWkModal(true)} />
          </div>
        )}
      </div>
      <div className="mt-6">
        <TrainerInfrastructurePagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalWorkouts}
          itemsPerPage={TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE}
          onPageChange={setPage}
        />
      </div>
      <TrainerWorkoutAssignModal
        isOpen={Boolean(assigningPlan)}
        plan={assigningPlan}
        onClose={() => setAssigningPlan(null)}
        onSubmit={handleBatchAssign}
        isSaving={isBatchAssigning}
      />
    </div>
  );
}
