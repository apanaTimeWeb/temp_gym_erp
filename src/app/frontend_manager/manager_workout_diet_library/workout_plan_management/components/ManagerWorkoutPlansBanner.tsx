// RESPONSIBILITY: Renders ManagerWorkoutPlansBanner's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Dumbbell } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useWorkoutPlansQuery } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/hooks/useManagerWorkoutPlansQueries';


/** @description Renders the top banner/hero section with module title and CTA for the Workout Library. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerWorkoutPlansBanner() {
  const t = useTranslations('MANAGER_WORKOUT_PLANS');

 const { data: workoutData } = useWorkoutPlansQuery({ page: '1' });
 const totalWorkouts = workoutData?.total || 0;

 return (
 <div className="rounded-xl p-5 text-text-primary shadow-card bg-card border border-border motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
 <div className="flex items-center justify-between">
 <div>
 <h2 className="text-xl font-bold">{t("COPY_COMPLETE_WORKOUT_DATABASE")}</h2>
 <p className="text-text-secondary mt-1 text-sm font-medium">
 {totalWorkouts} {t("COPY_WORKOUT_PROGRAMS")}</p>
 </div>
 <Dumbbell size={18} strokeWidth={2} className="text-info-text motion-safe:-rotate-12"/>
 </div>
 </div>
 );
}
