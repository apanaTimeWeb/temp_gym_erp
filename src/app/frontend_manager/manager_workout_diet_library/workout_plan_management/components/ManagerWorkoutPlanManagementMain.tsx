// RESPONSIBILITY: Composes the workout-plan-management page banner, toolbar, grid, and modal; it does not own workout-plan API transport or persistence.
'use client';
import { useTranslations } from 'next-intl';
import ManagerWorkoutPlanManagementBanner from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/components/ManagerWorkoutPlanManagementBanner';
import ManagerWorkoutPlanManagementToolbar from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/components/ManagerWorkoutPlanManagementToolbar';
import ManagerWorkoutPlanManagementGrid from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/components/ManagerWorkoutPlanManagementGrid';
import ManagerWorkoutPlanManagementModal from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/components/ManagerWorkoutPlanManagementModal';

export default function WorkoutPlanManagementMain() {
  const t = useTranslations('MANAGER_WORKOUT_PLANS');
  return (
    <section className="min-h-full space-y-5 p-6">
      <h1 className="text-2xl font-bold text-text-primary">{t('COPY_WORKOUT_MANAGEMENT')}</h1>
      <ManagerWorkoutPlanManagementBanner />
      <ManagerWorkoutPlanManagementToolbar />
      <ManagerWorkoutPlanManagementGrid />
      <ManagerWorkoutPlanManagementModal />
    </section>
  );
}
