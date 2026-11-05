// RESPONSIBILITY: Renders ManagerWorkoutPlansGrid's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useRef } from 'react';

import { Dumbbell, Edit2, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import ManagerPagination from '@/components/ui/manager_pagination/ManagerPagination';
import ManagerTableSkeleton from '@/components/ui/manager_table_skeleton/ManagerTableSkeleton';

import { MANAGER_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructurePaginationDefaults';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';
import { ManagerInfrastructureShowErrorToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowErrorToast';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';

import ManagerWorkoutPlansEmptyState from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/components/ManagerWorkoutPlansEmptyState';
import { useManagerWorkoutPlansLogic } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/hooks/useManagerWorkoutPlansLogic';
import { useDeleteWorkoutMutation } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/hooks/useManagerWorkoutPlansMutations';
import { useWorkoutPlansQuery } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/hooks/useManagerWorkoutPlansQueries';
import { ManagerWorkoutPlansGetLevelLabelKey } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/utils/ManagerWorkoutPlansFormatters';


/** @description Renders the ManagerWorkoutPlansGrid component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (10 documented module/import dependencies).. @edge-case Preserves empty state, error state. */
export default function ManagerWorkoutPlansGrid() {
  const t = useTranslations('MANAGER_WORKOUT_PLANS');

  const { search, levelFilter, currentPage, setCurrentPage, openEditWk } = useManagerWorkoutPlansLogic();
  const { confirm } = useConfirm();
  const deleteKeyByIdRef = useRef(new Map<string, string>());
  
  const { data, isPending } = useWorkoutPlansQuery({
    search,
    level: levelFilter !== 'ALL' ? levelFilter : '',
    page: currentPage.toString()
  });

  const { deleteWorkout } = useDeleteWorkoutMutation();

  const workouts = data?.workouts || [];
  const totalWorkouts = data?.total || 0;

  const totalPages = Math.ceil(totalWorkouts / MANAGER_ITEMS_PER_PAGE) || 1;

  if (isPending) {
    return <ManagerTableSkeleton rows={6} />;
  }

  return (
    <div className="flex flex-col h-full min-h-96">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 flex-1 content-start">
        {workouts.map((w, mapIndex) => (
          <div 
            key={w.id} 
            className="border border-border rounded-xl p-4 hover:border-info hover:shadow-card motion-safe:transition-all bg-card motion-safe:duration-200 ease-in-out"
          >
            <div className="flex items-start justify-between mb-3">
              <div data-testid={`manager_workout-workout-managerworkoutplansgrid-status-primary-${mapIndex}`} className="w-10 h-10 bg-info-bg rounded-xl flex items-center justify-center">
                <Dumbbell size={18} strokeWidth={2} className="text-info-text "/>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  (() => { if (w.level === 'BEGINNER') return 'bg-success text-on-success '; return (() => { if (w.level === 'INTERMEDIATE') return 'bg-warning text-on-warning '; return 'bg-danger text-on-danger '; })(); })()
                }`} data-testid="manager_workout-managerworkoutplansgrid-status-badge-1">
                  {t(ManagerWorkoutPlansGetLevelLabelKey(w.level))}
                </span>
                <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 text-info-text hover:text-info-text hover:bg-info-bg rounded-lg motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_workout-workout-managerworkoutplansgrid-button-edit-workout-plan-${w.id}`} 
                  aria-label={t("TEXT_EDIT_WORKOUT_PLAN", { value: w.name })}
                  onClick={() => openEditWk(w)} 
                  
                 type="button">
                  <Edit2 size={18} strokeWidth={2}/>
                </button>
                <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 text-danger-text hover:text-danger-text hover:bg-danger-bg rounded-lg motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_workout-workout-managerworkoutplansgrid-button-delete-workout-plan-${w.id}`} 
                  aria-label={t("TEXT_DELETE_WORKOUT_PLAN", { value: w.name })}
                  onClick={async () => {
                    const ok = await confirm({
                      title: t("COPY_DELETE_WORKOUT_PLAN"),
                      message: t("TEXT_DELETE_WORKOUT_CONFIRM_MESSAGE", { value: w.name }),
                      type: 'danger',
                      confirmText: t("COPY_DELETE_3")
                    });
                    if (ok) {
                      try {
                        const key = deleteKeyByIdRef.current.get(w.id) ?? ManagerInfrastructureIdempotency(); deleteKeyByIdRef.current.set(w.id, key); const response = await deleteWorkout({ id: w.id, idempotencyKey: key }); deleteKeyByIdRef.current.delete(w.id);
                        ManagerInfrastructureShowSuccessToast(response.message, 'manager-workout-plan-success');
                      } catch (e: unknown) {
                        ManagerInfrastructureShowErrorToast(e, 'manager-workout-plan-error');
                      }
                    }
                  }}
                  
                 type="button">
                  <Trash2 size={18} strokeWidth={2}/>
                </button>
              </div>
            </div>
            
            <h3 className="font-semibold text-text-primary mb-3">{w.name}</h3>
            
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { l: t('COPY_DAYS'), v: w.days }, 
                { l: t('COPY_EXERCISES_1'), v: w.exercises }, 
                { l: t('COPY_DURATION'), v: w.duration }
              ].map(s => (
                <div key={s.l} className="bg-input rounded-lg p-2 text-center border border-border">
                  <p className="text-sm font-bold text-text-primary">{Array.isArray(s.v) ? s.v.length : s.v}</p>
                  <p className="text-xs text-text-secondary">{s.l}</p>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {w.tags?.map((tag: string) => (
                <span key={tag} className="text-xs bg-input text-text-secondary px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <p className="text-xs text-text-secondary">{t("COPY_FOCUS_2")}<span className="font-medium text-text-primary">{w.focus}</span>
            </p>
          </div>
        ))}
        {workouts.length === 0 && <ManagerWorkoutPlansEmptyState />}
      </div>
      <div className="mt-6">
        <ManagerPagination data-testid="manager_workout-managerworkoutplansgrid-managerpagination-1" 
          currentPage={currentPage} 
          totalPages={totalPages} 
          totalItems={totalWorkouts} 
          itemsPerPage={MANAGER_ITEMS_PER_PAGE} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </div>
  );
}
