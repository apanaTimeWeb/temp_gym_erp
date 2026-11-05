// RESPONSIBILITY: Composes the plans-only screen from feature-owned sections and dialogs; API and mutation logic stay in hooks.
'use client';
import TrainerWorkoutBanner from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansBanner';
import TrainerWorkoutToolbar from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansToolbar';
import TrainerWorkoutPlansView from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansPlansView';
import TrainerWorkoutModal from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/components/TrainerCoachingWorkoutPlansModal';
export default function TrainerCoachingWorkoutPlansMain() {
  return <section className="min-h-full space-y-5 bg-page p-4 text-primary sm:p-6"><TrainerWorkoutBanner /><div className="overflow-hidden rounded-xl border border-border bg-card shadow-card"><TrainerWorkoutToolbar/><div className="p-5"><TrainerWorkoutPlansView /></div></div><TrainerWorkoutModal/></section>;
}
